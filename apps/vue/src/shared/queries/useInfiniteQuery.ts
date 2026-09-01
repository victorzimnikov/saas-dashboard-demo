import type {
  InfiniteData,
  QueryClient,
  QueryKey,
  UseInfiniteQueryOptions,
  UseInfiniteQueryReturnType,
} from "@tanstack/vue-query";
import { useInfiniteQuery as useInfiniteQueryT } from "@tanstack/vue-query";
import type { QueryError } from "./Errors";

type ObjectInfiniteOptions<DATA, PAGE_PARAM, KEYS extends QueryKey> = Extract<
  UseInfiniteQueryOptions<DATA, QueryError, InfiniteData<DATA, PAGE_PARAM>, KEYS, PAGE_PARAM>,
  { queryKey: unknown }
>;

export const useInfiniteQuery = <
  DATA extends Record<string, unknown>,
  KEYS extends string[] = string[],
>(
  options: Omit<ObjectInfiniteOptions<DATA, number, KEYS>, "initialPageParam"> & {
    initialPageParam?: number;
  },
  queryClient?: QueryClient,
): UseInfiniteQueryReturnType<InfiniteData<DATA>, QueryError> =>
  useInfiniteQueryT<DATA, QueryError, InfiniteData<DATA, number>, KEYS, number>(
    {
      initialPageParam: 0,
      ...options,
    },
    queryClient,
  );
