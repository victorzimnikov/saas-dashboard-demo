<script setup lang="ts">
import { CircularProgress } from "@/components";
import CardHeader from "./CardHeader.vue";

type Props = {
  isLoading?: boolean;
  title: string;
};

const { isLoading = false, title } = defineProps<Props>();
</script>

<template>
  <div class="dashboard-card">
    <CardHeader :title="title" />

    <div v-if="isLoading" class="loader">
      <CircularProgress />
    </div>

    <slot v-else></slot>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-card {
  flex: 1;
  gap: 24px;
  display: flex;
  flex-direction: column;
  padding: 24px;

  & > .loader {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
