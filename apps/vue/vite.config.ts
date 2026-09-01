import Vue from "@vitejs/plugin-vue";
import VueRouter from "vue-router/vite";
import { defineConfig } from "vite";
// import { readFileSync } from "node:fs";

const IS_DEV = process.env.NODE_ENV !== "production";

// https://vite.dev/config/
export default defineConfig({
  base: IS_DEV ? undefined : "/saas-dashboard-demo/vue/",

  resolve: {
    tsconfigPaths: true,
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    // strictPort: true,

    // https: {
    //   key: readFileSync(new URL("./.cert/dev-key.pem", import.meta.url)),
    //   cert: readFileSync(new URL("./.cert/dev-cert.pem", import.meta.url)),
    // },
  },
  plugins: [VueRouter(), Vue()],
});
