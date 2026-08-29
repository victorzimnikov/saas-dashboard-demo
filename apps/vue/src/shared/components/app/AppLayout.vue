<script setup lang="ts">
import { provide, reactive } from "vue";
import { AppSidebar } from "./sidebar";
import { appLayoutKey } from "./useAppLayout";
import { useAuthStore } from "@/auth";

const options = reactive({
  title: "",
});

provide(appLayoutKey, {
  setOptions(newOptions) {
    Object.assign(options, newOptions);
  },
});

const authStore = useAuthStore();
</script>

<template>
  <div v-if="authStore.isAuthenticated" class="app-layout">
    <AppSidebar />

    <div class="container">
      <header class="layout-header">
        <span class="header-title">{{ options.title }}</span>

        <div id="app-layout-actions" />
      </header>

      <main class="layout-content">
        <slot></slot>
      </main>
    </div>
  </div>
  <slot v-else></slot>
</template>

<style lang="scss" scoped>
.app-layout {
  flex: 1;
  display: flex;
  overflow: hidden;

  & > .container {
    flex: 1;
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
      padding: 15px;
    }

    & > .layout-header {
      display: flex;
      justify-content: space-between;
      height: 98px;
      align-items: center;
      padding: 0 30px;

      & > .header-title {
        font-size: 24px;
        font-weight: 700;
      }
    }

    & > .layout-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
      overflow-y: auto;
      padding: 0 30px 30px;
    }
  }
}
</style>
