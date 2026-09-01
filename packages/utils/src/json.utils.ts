export const tryJsonParse = <T>(
  json: string | null | undefined,
): { ok: false } | { ok: true; value: T } => {
  try {
    if (json == null) {
      return { ok: false };
    }

    return { ok: true, value: JSON.parse(json) };
  } catch {
    return { ok: false };
  }
};

export const tryJsonStringify = <T>(
  data: T | null | undefined,
): { ok: false } | { ok: true; value: string } => {
  try {
    if (data == null) {
      return { ok: false };
    }

    return { ok: true, value: JSON.stringify(data) };
  } catch {
    return { ok: false };
  }
};
