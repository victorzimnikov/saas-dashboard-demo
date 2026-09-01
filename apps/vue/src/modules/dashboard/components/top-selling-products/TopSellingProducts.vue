<script setup lang="ts">
import { useTopSellingProductsQuery } from "../../api/index.ts";
import { computed } from "vue";
import Divider from "@/components/common/Divider.vue";
import ProductItem from "./ProductItem.vue";
import DashboardCard from "../DashboardCard.vue";

const { isFetching, data } = useTopSellingProductsQuery();

const listCount = computed(() => data.value?.data.length ?? 0);

const isShowLoader = computed(() => isFetching.value && listCount.value === 0);
</script>

<template>
  <DashboardCard
    class="top-selling-products"
    title="Top selling Products"
    :is-loading="isShowLoader"
  >
    <div v-if="listCount" class="list">
      <template v-for="(item, idx) in data?.data" :key="item.id">
        <ProductItem :item="item" />

        <Divider v-if="idx < listCount - 1" />
      </template>
    </div>
  </DashboardCard>
</template>

<style lang="scss" scoped>
.top-selling-products {
  & > .list {
    display: flex;
    flex-direction: column;
    gap: 22px;
  }
}
</style>
