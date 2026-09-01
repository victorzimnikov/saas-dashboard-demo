<script setup lang="ts">
import { HeartIcon, GameIcon, BagIcon, WorkIcon, Placeholder } from "@/components";

type Props = {
  type: "save-products" | "stock-products" | "sales-products" | "job-application";
  count: number;
  isLoading?: boolean;
};

const { type, count, isLoading = false } = defineProps<Props>();

const getName = (t: Props["type"]): string => {
  switch (t) {
    case "save-products":
      return "Save Products";
    case "stock-products":
      return "Stock Products";
    case "sales-products":
      return "Sales Products";
    case "job-application":
      return "Job Application";

    default:
      return "Unknown";
  }
};
</script>

<template>
  <div class="stat-card">
    <div :class="['icon-container', { [`${type}-type`]: true }]">
      <HeartIcon v-if="type === 'save-products'" color="currentColor" />
      <GameIcon v-if="type === 'stock-products'" color="currentColor" />
      <BagIcon v-if="type === 'sales-products'" color="currentColor" />
      <WorkIcon v-if="type === 'job-application'" color="currentColor" />
    </div>

    <div class="content">
      <Placeholder v-if="isLoading" :height="30" :width="50" />
      <span v-else class="count">{{ count }}+</span>
      <span class="name">{{ getName(type) }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stat-card {
  display: flex;
  gap: 22px;
  align-items: center;
  padding: 28px 34px;

  & > .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;

    &.save-products-type {
      color: var(--color-blue);
      background-color: rgba(from var(--color-blue) r g b / 10%);
    }

    &.stock-products-type {
      color: var(--color-yellow);
      background-color: rgba(from var(--color-yellow) r g b / 10%);
    }

    &.sales-products-type {
      color: var(--color-orange);
      background-color: rgba(from var(--color-orange) r g b / 10%);
    }

    &.job-application-type {
      color: var(--color-primary);
      background-color: rgba(from var(--color-primary) r g b / 10%);
    }
  }

  & > .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1px;

    & > .count {
      font-size: 22px;
      line-height: 30px;
      font-weight: 800;
      color: var(--color-black);
    }

    & > .name {
      font-size: 14px;
      line-height: 19px;
    }
  }
}
</style>
