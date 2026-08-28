import "vue-router";
import type { UserRole } from "@/modules/auth/auth.types";

export {};

declare module "vue-router" {
  interface RouteMeta {
    public?: boolean;
    requiresAuth?: boolean;
    roles?: readonly UserRole[];
  }
}
