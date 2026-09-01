<script setup lang="ts">
import { ColorPalette } from "@/constants";
import { CircularProgress } from "../common";
import ButtonBase from "./ButtonBase.vue";

type Props = {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
};

const { variant = "primary", isLoading = false } = defineProps<Props>();

const progressColor = variant === "primary" ? ColorPalette.White : ColorPalette.Text;
</script>

<template>
  <ButtonBase
    :disabled="isLoading"
    :class="[
      'button',
      {
        'is-primary': variant === 'primary',
        'is-secondary': variant === 'secondary',
      },
    ]"
  >
    <CircularProgress v-if="isLoading" :color="progressColor" />
    <slot v-else></slot>
  </ButtonBase>
</template>

<style lang="scss" scoped>
.button {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 14px;
  min-height: 50px;
  border-radius: 10px;

  & > .circular-progress {
    align-self: center;
  }

  &.is-primary {
    color: var(--color-white);
    background-color: var(--color-primary);
  }

  &.is-secondary {
    color: var(--color-text);
    background-color: var(--color-secondary);
  }
}
</style>
