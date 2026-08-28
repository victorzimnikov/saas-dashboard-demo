export type TokenPayload = {
  exp: number; // время истечения в секундах
  [key: string]: unknown;
};

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) {
    return true;
  }

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload: TokenPayload = JSON.parse(atob(base64));
    const now = Math.floor(Date.now() / 1000);

    return payload.exp < now;
  } catch {
    return true; // при ошибке парсинга считаем истекшим
  }
};

// За сколько до истечения токена его следует обновить
export const TOKEN_REFRESH_BUFFER_MS = 10 * 60 * 1000;

export const isTokenExpiringSoon = (
  expiresAt: string | null,
  bufferMs: number = TOKEN_REFRESH_BUFFER_MS,
): boolean => {
  if (!expiresAt) {
    return true;
  }

  const expiresAtMs = new Date(expiresAt).getTime();

  if (Number.isNaN(expiresAtMs)) {
    return true; // при ошибке парсинга считаем истекшим
  }

  return expiresAtMs - bufferMs <= Date.now();
};
