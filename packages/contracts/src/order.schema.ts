import z from "zod";
import { productSchema } from "./product.schema";
import { paginationSchema } from "./common.schema";

const orderSchema = z.object({
  id: z.string(),
  number: z.string(),
  product: productSchema,
  totalOrder: z.number(),
  totalAmount: z.number(),
});

export const recentOrdersRequestSchema = z.object({
  skip: z.number().optional(),
  limit: z.number().optional(),
  sortBy: z.enum(["number", "product-name", "price", "total-order"]).optional(),
});

export const recentOrdersResponseSchema = z.object({
  data: orderSchema.array(),
  pagination: paginationSchema,
});

export type Order = z.infer<typeof orderSchema>;
export type RecentOrdersRequest = z.infer<typeof recentOrdersRequestSchema>;
export type RecentOrdersResponse = z.infer<typeof recentOrdersResponseSchema>;
