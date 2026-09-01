<script setup lang="ts">
import { StarIcon } from "../icons";

const STARS_COUNT = 5;

type Props = {
  rating?: number;
};

const { rating = 0 } = defineProps<Props>();
</script>

<template>
  <div class="rating">
    <StarIcon
      v-for="item in STARS_COUNT"
      :key="item"
      :class="['rating-star', { 'is-active': item <= rating }]"
      color="currentColor"
    />
  </div>
</template>

<style lang="scss" scoped>
.rating {
  display: flex;
  gap: 2px;

  & > .rating-star {
    color: rgba(from var(--color-yellow) r g b / 40%);

    &.is-active {
      color: var(--color-yellow);
    }
  }
}
</style>
