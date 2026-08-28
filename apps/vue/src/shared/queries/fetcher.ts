import { IS_DEV } from "@/constants";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import PQueue from "p-queue";
import { z } from "zod";
import { BaseError, QueryError } from "./Errors";
import { validate } from "./helpers";
import { apiClient } from "./axiosClient";
import { rawClient } from "./utils";

const queue = new PQueue({ concurrency: 3 });

export const createFetcher = (client: AxiosInstance) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <T = Record<string, unknown>, DATA = any>(
    url: string,
    options: AxiosRequestConfig<DATA>,
  ): Promise<AxiosResponse<T, DATA>> => {
    const method = (options?.method ?? "GET").toLowerCase();

    return queue.add<AxiosResponse<T, DATA>>(() =>
      client.request<T, AxiosResponse<T, DATA>, DATA>({
        method,
        url,
        ...options,
      }),
    );
  };
};

export type UseFetcherProps<DATA> = AxiosRequestConfig<DATA> & {
  /**
   * @description
   * Схема для валидации ответа запроса
   */
  responseSchema?: z.ZodObject | z.ZodArray;
  /**
   * @description
   * Схема для валидации body запроса
   */
  requestSchema?: z.ZodObject | z.ZodArray;
};

export const createQueryFetcher = (client: AxiosInstance) => {
  const fetcher = createFetcher(client);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async <T = Record<string, unknown>, DATA = any>(
    urlKey: string,
    { responseSchema, requestSchema, ...requestOptions }: UseFetcherProps<DATA> = {},
  ): Promise<AxiosResponse<T, DATA>> => {
    try {
      if (requestSchema && requestOptions.data) {
        const validationResponse = await validate(
          requestSchema,
          requestOptions.data,
          "Request Validation Error",
        );

        if (validationResponse instanceof BaseError) {
          if (IS_DEV) {
            /* eslint-disable no-console */
            console.groupCollapsed("Request Validation");
            console.log(urlKey);
            console.log(validationResponse.data);
            console.groupEnd();
            /* eslint-enable no-console */
          }
        }
      }

      const response = await fetcher<T, DATA>(urlKey, requestOptions);

      if (responseSchema) {
        const validationResponse = await validate(
          responseSchema,
          response.data,
          "Response Validation Error",
        );

        if (validationResponse instanceof BaseError) {
          if (IS_DEV) {
            /* eslint-disable no-console */
            console.groupCollapsed("Query Response Validation");
            console.log(urlKey);
            console.log(validationResponse.data);
            console.groupEnd();
            /* eslint-enable no-console */
          }
        }
      }

      return response;
    } catch (e) {
      let error: QueryError | undefined;

      if (e instanceof QueryError) {
        error = e;
      }

      if (e instanceof Error) {
        error = new QueryError(e.message);
      }

      const newError =
        error ??
        new QueryError(
          (e as { error?: { message: string } })?.error?.message ?? "Что-то пошло не так!",
        );

      throw newError;
    }
  };
};

export const queryFetcher = createQueryFetcher(apiClient);
export const authFetcher = createQueryFetcher(rawClient);
