<script setup lang="ts">
import { ColorPalette } from "@/constants";

type Props = {
  color?: string;
  size?: number;
};

const { color = ColorPalette.Primary, size = 20 } = defineProps<Props>();

const style = {
  width: `${size}px`,
  height: `${size}px`,
  borderRadius: `${size / 2}px`,
  borderTop: `2px solid ${color}`,
  borderLeft: `2px solid ${color}`,
};
</script>

<template>
  <div class="circular-progress" :style="style" />
</template>

<style lang="scss" scoped>
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.circular-progress {
  animation-name: rotate;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
</style>
