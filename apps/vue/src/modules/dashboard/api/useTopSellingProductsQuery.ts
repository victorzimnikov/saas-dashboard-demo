import { queryKeys, Urls, useQuery } from "@/queries";
import { topSellingProductsResponseSchema, type TopSellingProductsResponse } from "@/types";

export const useTopSellingProductsQuery = () =>
  useQuery<TopSellingProductsResponse>({
    queryKey: queryKeys.topSellingProducts(),
    queryFn: (fetcher) =>
      fetcher(Urls.topSellingProducts(), { responseSchema: topSellingProductsResponseSchema }).then(
        (r) => r.data,
      ),
  });
