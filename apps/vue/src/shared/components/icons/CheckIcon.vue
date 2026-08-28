<script setup lang="ts">
import { ColorPalette } from "@/constants";

type Props = {
  color?: string;
  size?: number;
};

const { color = ColorPalette.White, size = 12 } = defineProps<Props>();
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.4534 2.00003L4.71881 8.74948L1.41708 6.44619"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
