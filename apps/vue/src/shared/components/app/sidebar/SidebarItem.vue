<script setup lang="ts">
import { ref } from "vue";
import { ButtonBase } from "../../buttons";

type Props = {
  isActive: boolean;
  isOpen: boolean;
  label: string;
};

const { isActive, isOpen, label } = defineProps<Props>();

const isHover = ref(false);
</script>

<template>
  <ButtonBase class="sidebar-item" @mouseenter="isHover = true" @mouseleave="isHover = false">
    <div :class="['item-icon-container', { 'is-active': isActive || isHover }]">
      <slot icon-class="item-icon" color="currentColor"></slot>
    </div>

    <span :class="['item-label', { 'is-active': isActive || isHover, 'is-open': isOpen }]">{{
      label
    }}</span>
  </ButtonBase>
</template>

<style lang="scss" scoped>
.sidebar-item {
  display: flex;
  align-items: center;
  overflow: hidden;

  & > .item-icon-container {
    padding: 14px 16px 14px 30px;
    position: relative;
    isolation: isolate;

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: -1;

      background: var(--gradient-nav-item);
      opacity: 0;

      transition: opacity 300ms ease;
    }

    &:is(.is-active)::before {
      opacity: 1;
    }

    :deep(.item-icon) {
      opacity: 0.4;
      color: var(--color-text);

      transition:
        opacity 300ms ease,
        color 300ms ease;
    }

    &.is-active :deep(.item-icon) {
      opacity: 1;
      color: var(--color-primary);
    }
  }

  & > .item-label {
    font-weight: 600;
    opacity: 0.5;

    transition:
      opacity 300ms ease,
      color 300ms ease;

    &.is-active {
      opacity: 1;
      color: var(--color-primary);
    }

    &:not(.is-open) {
      opacity: 0;
    }
  }
}
</style>
