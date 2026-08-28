import "./styles/reset-and-normalize.css";
import "./styles/style.css";

import { createApp } from "vue";
import { createAppRouter } from "./router";
import App from "./App.vue";
import { createPinia } from "pinia";
import { enableApiMocking } from "../mocks";
import { useAuthStore } from "@/auth";
import { configureApiClient } from "@/queries";

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

app.mount("#app");
