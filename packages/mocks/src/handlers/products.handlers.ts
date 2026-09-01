import { delay, http, HttpResponse } from "msw";
import type { TopSellingProductsResponse, ErrorResponse } from "@saas-dashboard/contracts";
import { createTopSellingProductsMock } from "../data";

export type ProductMockOptions = {
  baseUrl: string;
};

export const createProductHandlers = ({ baseUrl }: ProductMockOptions) => [
  http.get<object, object, TopSellingProductsResponse | ErrorResponse>(
    "/api/products/top-selling",
    async () => {
      try {
        await delay(550);

        return HttpResponse.json({
          data: createTopSellingProductsMock(baseUrl),
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
