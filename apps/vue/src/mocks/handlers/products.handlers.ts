import { delay, http, HttpResponse } from "msw";
import type { ErrorResponse } from "@/queries";
import type { TopSellingProductsResponse } from "@/types";
import { createTopSellingProductsMock } from "../data";

export const productsHandlers = [
  http.get<object, object, TopSellingProductsResponse | ErrorResponse>(
    "/api/products/top-selling",
    async () => {
      try {
        await delay(550);

        return HttpResponse.json({
          data: createTopSellingProductsMock(),
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
