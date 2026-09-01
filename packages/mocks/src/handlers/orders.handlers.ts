import { delay, http, HttpResponse } from "msw";
import type {
  RecentOrdersRequest,
  RecentOrdersResponse,
  ErrorResponse,
} from "@saas-dashboard/contracts";
import { createRecentOrdersMock } from "../data";
import { toNotNaNNumberOr } from "@saas-dashboard/utils";

export type OrderMockOptions = {
  baseUrl: string;
};

export const createOrdersHandlers = ({ baseUrl }: OrderMockOptions) => [
  http.get<object, object, RecentOrdersResponse | ErrorResponse>(
    "/api/orders/recent-orders",
    async ({ request }) => {
      try {
        await delay(550);

        const url = new URL(request.url);

        const skip = toNotNaNNumberOr(url.searchParams.get("skip") ?? 0, undefined) ?? 0;
        const limit = toNotNaNNumberOr(url.searchParams.get("limit") ?? 4, undefined) ?? 4;
        const sortBy = (url.searchParams.get("sortBy") ??
          undefined) as RecentOrdersRequest["sortBy"];

        const data = createRecentOrdersMock(baseUrl, { skip, limit, sortBy });
        const pagination = {
          skip,
          limit,
          size: data.length,
          total: 4,
        };

        return HttpResponse.json({
          data,
          pagination,
        });
      } catch (e) {
        if (e instanceof HttpResponse) {
          return e;
        }

        if (e instanceof Error) {
          return HttpResponse.json({ error: e.message }, { status: 500 });
        }

        return HttpResponse.json({ error: "Что-то пошло не так" }, { status: 500 });
      }
    },
  ),
];
