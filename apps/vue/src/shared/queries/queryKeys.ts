export const queryKeys = {
  topSellingProducts: () => ["app", "top-selling-products", "list"],
  recentOrders: (query = "") => ["app", "recent-orders", "list", query],
  dashboardStats: () => ["app", "dashboard-stats", "data"],
};
