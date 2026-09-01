import "./styles/reset-and-normalize.css";
import "./styles/style.css";

import { createApp } from "vue";
import { createAppRouter } from "./router";
import App from "./App.vue";
import { createPinia } from "pinia";
import { enableApiMocking } from "../mocks";
import { useAuthStore } from "@/auth";
import { configureApiClient } from "@/queries";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { GaugeChart, LineChart, ScatterChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { use } from "echarts/core";
import { GridComponent, TooltipComponent } from "echarts/components";

await enableApiMocking();

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

use([CanvasRenderer, GaugeChart, LineChart, ScatterChart, GridComponent, TooltipComponent]);

app.mount("#app");
