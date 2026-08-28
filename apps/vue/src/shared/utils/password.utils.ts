const PASSWORD_HASH_ITERATIONS = 600_000;
const SALT_LENGTH = 16; // 128 бит
const HASH_LENGTH = 32; // 256 бит

const bytesToBase64 = (bytes: Uint8Array): string => {
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary);
};

const base64ToBytes = (value: string): Uint8Array<ArrayBuffer> => {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index++) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
};

const derivePasswordHash = async (
  password: string,
  salt: Uint8Array<ArrayBuffer>,
  iterations: number,
): Promise<Uint8Array<ArrayBuffer>> => {
  const passwordBytes = new TextEncoder().encode(password);

  const passwordKey = await crypto.subtle.importKey("raw", passwordBytes, "PBKDF2", false, [
    "deriveBits",
  ]);

  const hashBuffer = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt,
      iterations,
    },
    passwordKey,
    HASH_LENGTH * 8,
  );

  return new Uint8Array(hashBuffer);
};

/**
 * Создаёт строку с алгоритмом, числом итераций, солью и хешем.
 * Результат можно сохранить в базе данных.
 */
export const hashPassword = async (password: string): Promise<string> => {
  if (password.length === 0) {
    throw new TypeError("Пароль не должен быть пустым");
  }

  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));

  const hash = await derivePasswordHash(password, salt, PASSWORD_HASH_ITERATIONS);

  return [
    "pbkdf2-sha256",
    PASSWORD_HASH_ITERATIONS.toString(),
    bytesToBase64(salt),
    bytesToBase64(hash),
  ].join("$");
};

/**
 * Сравнивает пароль с ранее сохранённым хешем.
 */
export const verifyPassword = async (password: string, storedValue: string): Promise<boolean> => {
  try {
    const parts = storedValue.split("$");

    if (parts.length !== 4) {
      return false;
    }

    const [algorithm, iterationsText, saltBase64, expectedHashBase64] = parts;

    if (algorithm !== "pbkdf2-sha256" || !iterationsText || !saltBase64 || !expectedHashBase64) {
      return false;
    }

    const iterations = Number(iterationsText);

    if (!Number.isSafeInteger(iterations) || iterations < 1 || iterations > 10_000_000) {
      return false;
    }

    const salt = base64ToBytes(saltBase64);
    const expectedHash = base64ToBytes(expectedHashBase64);

    if (salt.length !== SALT_LENGTH || expectedHash.length !== HASH_LENGTH) {
      return false;
    }

    const actualHash = await derivePasswordHash(password, salt, iterations);

    // Сравнение без досрочного выхода.
    let difference = 0;

    for (let index = 0; index < expectedHash.length; index++) {
      difference |= actualHash[index] ^ expectedHash[index];
    }

    return difference === 0;
  } catch {
    return false;
  }
};
