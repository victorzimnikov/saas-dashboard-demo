<script setup lang="ts">
import { ColorPalette } from "@/constants";

type Props = {
  color?: string;
  size?: number;
};

const { color = ColorPalette.Text, size = 20 } = defineProps<Props>();
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.5 4.5L16 12L8.5 19.5"
      :stroke="color"
      stroke-width="3.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
