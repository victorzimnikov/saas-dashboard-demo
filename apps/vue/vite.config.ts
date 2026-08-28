import Vue from "@vitejs/plugin-vue";
import VueRouter from "vue-router/vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [VueRouter(), Vue()],
});
