<script setup lang="ts">
type Props = {
  amount: number;
  isBold?: boolean;
};

const { amount, isBold = false } = defineProps<Props>();
</script>

<template>
  <span :class="['price', { 'is-bold': isBold }]"
    >${{ new Intl.NumberFormat("en-US").format(amount / 100) }}</span
  >
</template>

<style lang="scss" scoped>
.price {
  font-size: 15px;
  line-height: 20px;
  color: var(--color-black);

  &.is-bold {
    font-weight: 700;
  }
}
</style>
