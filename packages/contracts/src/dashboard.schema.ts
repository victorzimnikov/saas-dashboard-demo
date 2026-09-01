import z from "zod";

export const dashboardStatsSchema = z.object({
  saveProducts: z.number(),
  stockProducts: z.number(),
  salesProducts: z.number(),
  jobApplication: z.number(),
});

export const dashboardStatsResponseSchema = z.object({
  data: dashboardStatsSchema,
});

export type DashboardStats = z.infer<typeof dashboardStatsSchema>;
export type DashboardStatsResponse = z.infer<typeof dashboardStatsResponseSchema>;
