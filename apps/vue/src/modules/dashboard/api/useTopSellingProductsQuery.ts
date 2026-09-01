import { queryKeys, Urls, useQuery } from "@/queries";
import { topSellingProductsResponseSchema } from "@saas-dashboard/contracts";
import type { TopSellingProductsResponse } from "@saas-dashboard/contracts";

export const useTopSellingProductsQuery = () =>
  useQuery<TopSellingProductsResponse>({
    queryKey: queryKeys.topSellingProducts(),
    queryFn: (fetcher) =>
      fetcher(Urls.topSellingProducts(), { responseSchema: topSellingProductsResponseSchema }).then(
        (r) => r.data,
      ),
  });
