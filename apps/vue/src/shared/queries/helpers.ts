import { BaseError } from "./Errors";
import pathParams from "path-params";
import qs from "qs";
import { z } from "zod";

export type CreateUrlOptionsProps<Q = object, P = object> = {
  readonly query?: Q;
  readonly params?: P;
  readonly host?: string;
};

export function createUrl<Q, P, R = string>(path: R, options: CreateUrlOptionsProps<Q, P> = {}): R {
  const query = typeof options.query === "string" ? options.query : qs.stringify(options.query);
  const url = [path, query].filter(Boolean).join("?");

  if (options?.params != null) {
    const pathWithParams = pathParams<P>(url, options.params);

    return [options.host, pathWithParams].filter(Boolean).join("/") as R;
  }

  return [options.host, url].filter(Boolean).join("/") as R;
}

export function combineHeaders(base: HeadersInit | undefined, adding?: HeadersInit): Headers {
  if (adding == null) {
    return new Headers(base);
  }

  const headers = new Headers(base);

  if (adding instanceof Headers) {
    adding.forEach((value: string | undefined, key: string) => {
      if (value != null && key != null) {
        headers.set(key, value);
      }
    });
  } else if (Array.isArray(adding)) {
    adding.forEach((header) => {
      const [key, value] = header;

      if (value != null && key != null) {
        headers.set(key, value);
      }
    });
  } else {
    const keys = Object.keys(adding);
    const values = Object.values(adding);

    keys.forEach((key, idx) => {
      const value = values[idx];

      if (value != null && key != null) {
        headers.set(key, value);
      }
    });
  }

  return headers;
}

export const validate = async <DATA = Record<string, unknown>>(
  schema: z.ZodObject | z.ZodArray | z.ZodUnion,
  data: DATA,
  message = "Validation Error",
): Promise<BaseError | boolean> => {
  try {
    schema.parse(data);

    return true;
  } catch (e) {
    if (e instanceof z.ZodError) {
      const error = new BaseError(message);

      error.errorType = "ValidationError";

      error.data = e.issues.reduce<Record<string, (typeof e.issues)[number]>>((acc, item) => {
        const key: string = item.path.join(".");

        acc[key] = item;

        return acc;
      }, {});

      return error;
    }

    return false;
  }
};
