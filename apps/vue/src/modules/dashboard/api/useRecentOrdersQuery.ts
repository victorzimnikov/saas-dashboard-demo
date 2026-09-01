import { queryKeys, Urls, useQuery } from "@/queries";
import { recentOrdersRequestSchema, recentOrdersResponseSchema } from "@saas-dashboard/contracts";
import type { RecentOrdersRequest, RecentOrdersResponse } from "@saas-dashboard/contracts";

export const useRecentOrdersQuery = (query?: RecentOrdersRequest) =>
  useQuery<RecentOrdersResponse>({
    queryKey: queryKeys.recentOrders(query ? JSON.stringify(query) : undefined),
    queryFn: (fetcher) =>
      fetcher(Urls.recentOrders(query), {
        responseSchema: recentOrdersResponseSchema,
        requestSchema: recentOrdersRequestSchema,
      }).then((r) => r.data),
  });
