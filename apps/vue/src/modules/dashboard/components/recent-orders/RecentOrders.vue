<script setup lang="ts">
import { computed, h } from "vue";
import { useRecentOrdersQuery } from "../../api/index.ts";
import DashboardCard from "../DashboardCard.vue";
import { Price, Table } from "@/components";
import type { Order } from "@/types";
import ProductNameCell from "./ProductNameCell.vue";
import TotalOrderCell from "./TotalOrderCell.vue";

const { data, isFetching } = useRecentOrdersQuery();

const listCount = computed(() => data.value?.data.length ?? 0);

const isShowLoader = computed(() => isFetching.value && listCount.value === 0);
</script>

<template>
  <DashboardCard class="recent-orders" title="Recent Orders" :is-loading="isShowLoader">
    <Table
      variant="flat"
      :data="data?.data ?? []"
      :columns="[
        {
          accessorKey: 'number',
          header: 'Tracking no',
          cell: (info) => `#${info.getValue()}`,
        },
        {
          accessorKey: 'product',
          header: 'Product Name',
          cell: (info) =>
            h(ProductNameCell, {
              name: info.getValue<Order['product']>()?.name,
              image: info.getValue<Order['product']>()?.image,
            }),
        },
        {
          accessorFn: (row) => row.product?.price,
          header: 'Price',
          meta: { align: 'center' },
          cell: (info) => h(Price, { amount: info.getValue<number>() }),
        },
        {
          accessorKey: 'totalOrder',
          header: 'Total Order',
          meta: { align: 'center' },
          cell: (info) => h(TotalOrderCell, { amount: info.getValue<number>() }),
        },
        {
          accessorKey: 'totalAmount',
          header: 'Total Amount',
          meta: { align: 'center' },
          cell: (info) => h(Price, { amount: info.getValue<number>() }),
        },
      ]"
      table-key="recent-orders"
    />
  </DashboardCard>
</template>

<style lang="scss" scoped>
.top-selling-products {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 24px;
}
</style>
