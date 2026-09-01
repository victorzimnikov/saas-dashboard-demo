<script setup lang="ts">
import { ButtonBase, Price, Rating } from "@/components";
import type { Product } from "@/types";

type Props = {
  item: Product;
};

const { item } = defineProps<Props>();
</script>

<template>
  <ButtonBase class="product-item">
    <img :src="item.image" class="item-image" />

    <div class="item-content">
      <span>{{ item.name }}</span>
      <Rating :rating="item.rating" />
      <Price :amount="item.price" is-bold />
    </div>
  </ButtonBase>
</template>

<style lang="scss" scoped>
.product-item {
  display: flex;
  gap: 20px;

  & > .item-image {
    width: 96px;
    height: 96px;
    border-radius: 10px;
    overflow: hidden;
  }

  & > .item-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;

    & > .title {
      font-size: 15px;
      line-height: 20px;
      color: var(--color-black);
    }
  }
}
</style>
