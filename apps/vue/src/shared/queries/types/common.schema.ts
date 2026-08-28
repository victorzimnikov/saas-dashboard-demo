import { z } from "zod";

export const paginationSchema = z.object({
  limit: z.number(),
  size: z.number(),
  skip: z.number(),
  total: z.number(),
});

export type Pagination = z.output<typeof paginationSchema>;
