import type { Order, RecentOrdersRequest } from "@saas-dashboard/contracts";
import { createProductsListMock } from "./products.mocks";
import { quickSort, randomInt } from "@saas-dashboard/utils";

export const createOrderMock = (baseUrl: string, data?: Partial<Order>): Order => {
  const products = createProductsListMock(baseUrl);

  const productIndex = randomInt(0, products.length - 1);
  const product = products[productIndex];

  const totalOrder = randomInt(10, 500);

  return {
    id: `${Date.now()}`,
    number: `${Date.now()}`,
    product,
    totalOrder,
    totalAmount: product.price * totalOrder,
    ...data,
  };
};

export const createOrdersMock = (baseUrl: string): Order[] => {
  const products = createProductsListMock(baseUrl);

  return [
    createOrderMock(baseUrl, {
      number: "876364",
      product: products[2],
      totalOrder: 325,
      totalAmount: products[2].price * 325,
    }),
    createOrderMock(baseUrl, {
      number: "876368",
      product: products[3],
      totalOrder: 325,
      totalAmount: products[3].price * 325,
    }),
    createOrderMock(baseUrl, {
      number: "876412",
      product: products[4],
      totalOrder: 325,
      totalAmount: products[4].price * 325,
    }),
    createOrderMock(baseUrl, {
      number: "876621",
      product: products[5],
      totalOrder: 325,
      totalAmount: products[5].price * 325,
    }),
  ];
};

export const createRecentOrdersMock = (
  baseUrl: string,
  { skip = 0, limit = 4, sortBy }: RecentOrdersRequest,
): Order[] => {
  const orders = createOrdersMock(baseUrl).slice(skip, skip + limit);

  if (sortBy) {
    return quickSort(orders, (a, b) => {
      if (sortBy === "number") {
        return a.number < b.number;
      }

      if (sortBy === "price") {
        return a.product.price < b.product.price;
      }

      if (sortBy === "product-name") {
        return a.product.name < b.product.name;
      }

      return a.totalOrder < b.totalOrder;
    });
  }

  return orders;
};
