import type { QueryKey, UseQueryOptions, SkipToken } from "@tanstack/vue-query";
import { useQuery as useQueryT } from "@tanstack/vue-query";
import type { AxiosResponse } from "axios";
import type { QueryError } from "./Errors";
import type { UseFetcherProps } from "./fetcher";
import { queryFetcher } from "./fetcher";
import type { UnwrapRef } from "vue";

type ObjectQueryOptions<DATA, KEYS extends QueryKey> = Extract<
  UseQueryOptions<DATA, QueryError, DATA, DATA, KEYS>,
  { queryKey: unknown }
>;

type QueryContext<DATA, KEYS extends QueryKey> = Parameters<
  Exclude<NonNullable<UnwrapRef<ObjectQueryOptions<DATA, KEYS>["queryFn"]>>, SkipToken>
>[0];

export const useQuery = <DATA, KEYS extends QueryKey = QueryKey>({
  queryFn,
  ...options
}: Omit<ObjectQueryOptions<DATA, KEYS>, "queryFn"> & {
  queryFn: (
    fetcher: (
      url: string,
      options?: UseFetcherProps<void>,
    ) => Promise<DATA extends AxiosResponse ? DATA : AxiosResponse<DATA>>,
    context: QueryContext<DATA, KEYS>,
  ) => Promise<DATA>;
}) =>
  useQueryT({
    ...options,
    queryFn: (ctx) =>
      queryFn(
        (url: string, options: UseFetcherProps<void> = {}) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          queryFetcher<any>(url, options) as any,
        ctx,
      ),
  });
