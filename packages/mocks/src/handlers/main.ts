import { createAuthHandlers } from "./auth.handlers";
import type { AuthMockOptions } from "./auth.handlers";
import { createOrdersHandlers } from "./orders.handlers";
import type { OrderMockOptions } from "./orders.handlers";
import { createProductHandlers } from "./products.handlers";
import type { ProductMockOptions } from "./products.handlers";

export function createHandlers(options: AuthMockOptions & ProductMockOptions & OrderMockOptions) {
  return [
    ...createAuthHandlers(options),
    ...createProductHandlers(options),
    ...createOrdersHandlers(options),
  ];
}
