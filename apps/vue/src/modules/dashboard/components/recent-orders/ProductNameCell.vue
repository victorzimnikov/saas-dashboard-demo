<script setup lang="ts">
type Props = {
  image?: string;
  name: string;
};

const { name, image } = defineProps<Props>();
</script>

<template>
  <div class="product-name-cell">
    <img class="image" :src="image" />

    <span class="name">{{ name }}</span>
  </div>
</template>

<style lang="scss" scoped>
.product-name-cell {
  display: flex;
  align-items: center;
  gap: 10px;

  & > .image {
    width: 30px;
    height: 30px;
    border-radius: 5px;
  }

  & > .name {
    font-size: 12px;
    line-height: 16px;
  }
}
</style>
