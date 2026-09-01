<script setup lang="ts">
type Props = {
  amount: number;
};

const { amount } = defineProps<Props>();
</script>

<template>
  <div class="total-order-cell">
    <span class="amount">{{ amount }}</span>
  </div>
</template>

<style lang="scss" scoped>
.total-order-cell {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 30px;
  border-radius: 8px;
  background-color: rgba(from var(--color-cyan-blue) r g b / 10%);

  & > .amount {
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
    color: var(--color-cyan-blue);
  }
}
</style>
