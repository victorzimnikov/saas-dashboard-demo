export type JwtPayload = Record<string, unknown> & {
  exp?: number;
  nbf?: number;
  iat?: number;
};

function base64url(value: string | ArrayBuffer): string {
  const bytes = typeof value === "string" ? new TextEncoder().encode(value) : new Uint8Array(value);

  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");

  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

const base64urlToBytes = (value: string): Uint8Array<ArrayBuffer> => {
  const base64 = value
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(value.length / 4) * 4, "=");

  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
};

const decodeBase64urlJson = <T>(value: string): T => {
  const bytes = base64urlToBytes(value);
  const json = new TextDecoder().decode(bytes);

  return JSON.parse(json) as T;
};

export const createJwt = async (
  payload: Record<string, unknown>,
  time: number,
  secret: string,
): Promise<string> => {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(
    JSON.stringify({
      ...payload,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + time,
    }),
  );
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(unsignedToken));

  return `${unsignedToken}.${base64url(signature)}`;
};

/**
 * Декодирует JWT без проверки подписи.
 * Выбрасывает ошибку, если JWT имеет неверный формат.
 */
export const decodeJwt = <T extends JwtPayload = JwtPayload>(token: string): T => {
  const parts = token.split(".");

  if (parts.length !== 3) {
    throw new Error("Invalid JWT format");
  }

  return decodeBase64urlJson<T>(parts[1]);
};

/**
 * Проверяет:
 * - структуру JWT;
 * - алгоритм HS256;
 * - подпись;
 * - срок действия exp;
 * - ограничение nbf.
 */
export const checkJwt = async (token: string, secret: string): Promise<boolean> => {
  try {
    const parts = token.split(".");

    if (parts.length !== 3) {
      return false;
    }

    const [encodedHeader, encodedPayload, encodedSignature] = parts;

    const header = decodeBase64urlJson<{
      alg?: string;
      typ?: string;
    }>(encodedHeader);

    if (header.alg !== "HS256") {
      return false;
    }

    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      {
        name: "HMAC",
        hash: "SHA-256",
      },
      false,
      ["verify"],
    );

    const unsignedToken = `${encodedHeader}.${encodedPayload}`;

    const validSignature = await crypto.subtle.verify(
      "HMAC",
      key,
      base64urlToBytes(encodedSignature),
      new TextEncoder().encode(unsignedToken),
    );

    if (!validSignature) {
      return false;
    }

    const payload = decodeBase64urlJson<JwtPayload>(encodedPayload);
    const now = Math.floor(Date.now() / 1000);

    if (typeof payload.exp === "number" && now >= payload.exp) {
      return false;
    }

    if (typeof payload.nbf === "number" && now < payload.nbf) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
};
