import type { UseMutationOptions, UseMutationReturnType } from "@tanstack/vue-query";
import { QueryClient, useMutation as useMutationT } from "@tanstack/vue-query";
import { QueryError } from "./Errors";

export const useMutation = <DATA, VARIABLES, CONTEXT = DATA>(
  options: UseMutationOptions<DATA, QueryError, VARIABLES, CONTEXT>,
  queryClient?: QueryClient,
): UseMutationReturnType<DATA, QueryError, VARIABLES, CONTEXT> =>
  useMutationT(
    {
      retry: false,
      ...options,
    },
    queryClient,
  );
