import { queryKeys, Urls, useQuery } from "@/queries";
import { dashboardStatsResponseSchema } from "@saas-dashboard/contracts";
import type { DashboardStatsResponse } from "@saas-dashboard/contracts";

export const useDashboardStatsQuery = () =>
  useQuery<DashboardStatsResponse>({
    queryKey: queryKeys.dashboardStats(),
    queryFn: (fetcher) =>
      fetcher(Urls.dashboardStats(), {
        responseSchema: dashboardStatsResponseSchema,
      }).then((r) => r.data),
  });
