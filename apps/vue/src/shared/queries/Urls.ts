import { API_HOST } from "@/constants";
import { createUrl } from "./helpers";
import type { RecentOrdersRequest } from "@/types";

export const Urls = {
  // Auth
  refreshToken: () => createUrl("auth/refresh-token", { host: API_HOST }),
  login: () => createUrl("auth/login", { host: API_HOST }),
  register: () => createUrl("auth/register", { host: API_HOST }),

  // Products
  topSellingProducts: () => createUrl("products/top-selling", { host: API_HOST }),

  // Orders
  recentOrders: (query?: RecentOrdersRequest) =>
    createUrl("orders/recent-orders", { host: API_HOST, query }),
};
