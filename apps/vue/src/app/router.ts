import { useAuthStore } from "@/auth";
import { useProfileStore } from "@/profile";
import type { Pinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "vue-router/auto-routes";

export const createAppRouter = (pinia: Pinia) => {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  });

  router.beforeEach(async (to) => {
    const auth = useAuthStore(pinia);

    await auth.ensureSessionLoaded();

    const isLoginPage = to.name === "/";
    const isForbiddenPage = to.name.startsWith("/forbidden");
    const isResetPasswordPage = to.name.startsWith("/reset-password");

    if (auth.isAuthenticated && (isLoginPage || isResetPasswordPage)) {
      return { path: "/dashboard" };
    }

    if (to.meta.requiresAuth && !auth.isAuthenticated) {
      return {
        path: "/",
        query: !isForbiddenPage ? { redirect: to.fullPath } : {},
      };
    }

    const userStore = useProfileStore(pinia);

    const userRole = userStore.getUserRole;

    if (to.meta.roles?.length && !to.meta.roles.some((role) => userRole === role)) {
      return { path: "/forbidden" };
    }
  });

  return router;
};
