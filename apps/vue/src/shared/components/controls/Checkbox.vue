<script setup lang="ts">
import { ButtonBase } from "../buttons";
import { CheckIcon } from "../icons";

type Props = {
  label?: string;
  isError?: boolean;
};

const { label, isError = false } = defineProps<Props>();

const model = defineModel<boolean>();
</script>

<template>
  <ButtonBase class="root-checkbox" @click="model = !model">
    <div class="checkbox">
      <div :class="['element', { 'is-active': model, 'is-error': isError }]">
        <CheckIcon v-if="model" />
      </div>

      <span v-if="label" class="label">{{ label }}</span>
      <slot></slot>
    </div>
  </ButtonBase>
</template>

<style lang="scss" scoped>
.root-checkbox {
  & > .checkbox {
    display: flex;
    align-items: center;
    gap: 10px;
    user-select: none;

    & > .label {
      font-size: 14px;
      line-height: 16px;
    }
    & > .element {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 16px;
      max-width: 16px;
      min-height: 16px;
      max-height: 16px;
      border-radius: 2px;
      border-width: 1px;
      border-style: solid;
      border-color: var(--color-text);

      &:not(.is-active) {
        opacity: 0.5;
      }

      &.is-active {
        border-color: var(--color-primary);
        background-color: var(--color-primary);
      }

      &.is-error {
        border-color: var(--color-error);
        background-color: var(--color-error);
      }
    }
  }
}
</style>
