import "./styles/reset-and-normalize.css";
import "./styles/style.css";

import { createApp } from "vue";
import { createAppRouter } from "./router";
import App from "./App.vue";
import { createPinia } from "pinia";
import { useAuthStore } from "@/auth";
import { configureApiClient } from "@/queries";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { GaugeChart, LineChart, ScatterChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { use } from "echarts/core";
import { GridComponent, TooltipComponent } from "echarts/components";

if (import.meta.env.VITE_ENABLE_MOCKS === "true") {
  const { enableApiMocking } = await import("@saas-dashboard/mocks/browser");

  await enableApiMocking({
    baseUrl: import.meta.env.BASE_URL,
    accessTokenSecret: import.meta.env.VITE_ACCESS_TOKEN_KEY,
    refreshTokenSecret: import.meta.env.VITE_REFRESH_TOKEN_KEY,
  });
}

const app = createApp(App);
const pinia = createPinia();

const authStore = useAuthStore(pinia);

configureApiClient({
  getAccessToken: () => authStore.accessToken,
  canRefresh: () => authStore.canRefresh,
  shouldRefresh: () => authStore.shouldRefreshAccessToken,
  refreshAccessToken: () => authStore.refreshAccessToken(),
});

const router = createAppRouter(pinia);

app.use(pinia);
app.use(router);
app.use(VueQueryPlugin);

// Charts
use([CanvasRenderer, GaugeChart, LineChart, ScatterChart, GridComponent, TooltipComponent]);

app.mount("#app");
