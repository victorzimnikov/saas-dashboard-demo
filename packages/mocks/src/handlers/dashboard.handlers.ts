import { delay, http, HttpResponse } from "msw";
import type { DashboardStatsResponse, ErrorResponse } from "@saas-dashboard/contracts";

export const createDashboardHandlers = () => [
  http.get<object, object, DashboardStatsResponse | ErrorResponse>(
    "/api/dashboard/stats",
    async () => {
      try {
        await delay(550);

        return HttpResponse.json({
          data: {
            saveProducts: 178,
            stockProducts: 20,
            salesProducts: 190,
            jobApplication: 12,
          },
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
