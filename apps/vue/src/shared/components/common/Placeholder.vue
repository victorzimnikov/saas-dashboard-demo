<script setup lang="ts">
type Props = {
  width?: number;
  height?: number;
  radius?: number;
};

const { width = 100, height = 22, radius = 4 } = defineProps<Props>();
</script>

<template>
  <div
    class="animated-placeholder"
    :style="{ width: `${width}px`, height: `${height}px`, borderRadius: `${radius}px` }"
    aria-hidden="true"
  />
</template>

<style scoped>
.animated-placeholder {
  flex-shrink: 0;
  background-color: rgba(from var(--color-text) r g b / 5%);
  animation: placeholder-pulse 1.5s ease-in-out infinite;
}

@keyframes placeholder-pulse {
  0%,
  100% {
    opacity: 0.35;
  }

  50% {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .animated-placeholder {
    animation: none;
  }
}
</style>
