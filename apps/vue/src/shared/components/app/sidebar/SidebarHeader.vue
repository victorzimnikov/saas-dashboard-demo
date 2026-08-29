<script setup lang="ts">
import { AppIcon } from "../../icons";

type Props = {
  isOpen: boolean;
};

const { isOpen } = defineProps<Props>();
</script>

<template>
  <div :class="['sidebar-header', { 'is-open': isOpen }]">
    <AppIcon :size="42" class="header-icon" />

    <span class="header-title">Base</span>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-header {
  padding: 30px;
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 102px;

  transition:
    height 300ms ease,
    padding 300ms ease;

  & > .header-icon {
    position: absolute;
    top: 50px;
    left: 52px;

    transform: translate(0, 0);

    transition: transform 300ms ease;
  }

  & > .header-title {
    font-size: 24px;
    font-weight: 600;
    position: absolute;
    top: 60px;
    left: 110px;

    transform: translate(0, 0);

    transition: transform 300ms ease;
  }

  &:not(.is-open) {
    height: 137px;
    padding: 30px 0;
    flex-direction: column;

    & > .header-icon {
      position: absolute;
      transform: translate(-34px, -15px);
    }

    & > .header-title {
      position: absolute;
      transform: translate(-98px, 30px);
    }
  }
}
</style>
