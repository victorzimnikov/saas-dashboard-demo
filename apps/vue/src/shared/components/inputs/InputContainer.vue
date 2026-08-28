<script setup lang="ts">
import type { InputContainerProps } from "./input.types";

const { label, helperText, isError, rootClass } = defineProps<InputContainerProps>();
</script>

<template>
  <div :class="['input-container', rootClass]">
    <span v-if="label" class="label">{{ label }}</span>

    <div class="content">
      <slot name="start-adornment"></slot>

      <div class="input-content">
        <slot></slot>
      </div>

      <slot name="end-adornment"></slot>
    </div>

    <span v-if="helperText" :class="['helper-text', { 'is-error': isError }]">{{
      helperText
    }}</span>
  </div>
</template>

<style lang="scss" scoped>
.input-container {
  display: flex;
  flex-direction: column;

  .content {
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 1rem;
    border-radius: 0.8rem;
    background-color: var(--color-secondary);
  }

  .input-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .label {
    margin-bottom: 0.5rem;
  }

  .helper-text {
    margin-top: 0.25rem;
    font-size: 0.8rem;

    &.is-error {
      color: var(--color-error);
    }
  }
}
</style>
