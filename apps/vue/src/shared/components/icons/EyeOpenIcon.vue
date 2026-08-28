<script setup lang="ts">
import { ColorPalette } from "@/constants";

type Props = {
  color?: string;
  size?: number;
};

const { color = ColorPalette.Text, size = 15 } = defineProps<Props>();
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.5">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.038 7.313C2.395 4.141 4.812 2.249 7.5 2.249C10.188 2.249 12.605 4.141 13.962 7.313C14.013 7.434 14.013 7.573 13.962 7.688C12.605 10.86 10.188 12.758 7.5 12.758C4.812 12.758 2.395 10.86 1.038 7.688C0.987 7.573 0.987 7.434 1.038 7.313ZM7.5 4.957C6.098 4.957 4.964 6.097 4.964 7.5C4.964 8.903 6.098 10.043 7.5 10.043C8.902 10.043 10.036 8.903 10.036 7.5C10.036 6.097 8.902 4.957 7.5 4.957Z"
        :fill="color"
      />
      <circle cx="7.5" cy="7.5" r="1.64" :fill="color" />
    </g>
  </svg>
</template>
