import z from "zod";

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string().optional(),
  price: z.number(), // В копейках
  rating: z.number(),
});

export const topSellingProductsResponseSchema = z.object({
  data: productSchema.array(),
});

export type Product = z.infer<typeof productSchema>;
export type TopSellingProductsResponse = z.infer<typeof topSellingProductsResponseSchema>;
