export { paginationSchema } from "./common.schema";
export type { Pagination } from "./common.schema";
export { recentOrdersRequestSchema, recentOrdersResponseSchema } from "./order.schema";
export type { Order, RecentOrdersRequest, RecentOrdersResponse } from "./order.schema";
export { productSchema, topSellingProductsResponseSchema } from "./product.schema";
export type { Product, TopSellingProductsResponse } from "./product.schema";
export type { ErrorResponse, SuccessResponse } from "./common.types";
export { userRoleSchema, userSchema, userWithCredentialsSchema } from "./user.schema";
export type { User, UserRole, UserWithCredentials } from "./user.schema";
export { dashboardStatsResponseSchema, dashboardStatsSchema } from "./dashboard.schema";
export type { DashboardStats, DashboardStatsResponse } from "./dashboard.schema";
export {
  loginBodySchema,
  loginResponseSchema,
  refreshTokenBodySchema,
  refreshTokenResponseSchema,
  registerBodySchema,
} from "./auth.schema";
export type {
  LoginBody,
  LoginResponse,
  RefreshTokenBody,
  RefreshTokenResponse,
  RegisterBody,
} from "./auth.schema";
