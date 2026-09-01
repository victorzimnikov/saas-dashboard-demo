<script setup lang="ts">
import { provide, reactive } from "vue";
import { AppSidebar } from "./sidebar";
import { appLayoutKey } from "./useAppLayout";
import { useAuthStore } from "@/auth";

const options = reactive({
  title: "",
  withHorizontalScroll: false,
  withVerticalScroll: true,
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

        <div id="app-layout-actions" class="app-layout-actions" />
      </header>

      <main
        :class="[
          'layout-content',
          {
            'with-horizontal-scroll': options.withHorizontalScroll,
            'with-vertical-scroll': options.withVerticalScroll,
          },
        ]"
      >
        <div class="layout-content-inner">
          <slot></slot>
        </div>
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
    min-width: 0;
    min-height: 0;
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

      & > .app-layout-actions {
        display: flex;
        gap: 16px;
      }

      & > .header-title {
        font-size: 24px;
        font-weight: 700;
      }
    }

    & > .layout-content {
      flex: 1;
      display: flex;
      min-width: 0;
      min-height: 0;
      flex-direction: column;
      overflow: hidden;
      padding: 0;

      & > .layout-content-inner {
        width: max-content;
        min-width: 100%;
        padding: 0 30px 30px;

        display: flex;
        flex: 1;
        flex-direction: column;
      }

      &.with-horizontal-scroll {
        overflow-x: auto;
      }

      &.with-vertical-scroll {
        overflow-y: auto;
      }
    }
  }
}
</style>
