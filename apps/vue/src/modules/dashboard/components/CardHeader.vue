<script setup lang="ts">
import { MenuButton } from "@/components";

type Props = {
  title: string;
};

const { title } = defineProps<Props>();
</script>

<template>
  <div class="card-header">
    <span class="title">{{ title }}</span>

    <MenuButton />
  </div>
</template>

<style lang="scss" scoped>
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > .title {
    font-size: 18px;
    line-height: 24px;
    font-weight: 700;
  }
}
</style>
