import Vue from "@vitejs/plugin-vue";
import VueRouter from "vue-router/vite";
import { defineConfig } from "vite";
// import { readFileSync } from "node:fs";

// https://vite.dev/config/
export default defineConfig({
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
