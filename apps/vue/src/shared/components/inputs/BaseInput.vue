<script setup lang="ts">
const model = defineModel<string>();
</script>

<template>
  <input v-model="model" class="base-input" />
</template>

<style lang="scss" scoped>
.base-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 0.9rem;
  background-color: var(--color-secondary);
}
</style>
