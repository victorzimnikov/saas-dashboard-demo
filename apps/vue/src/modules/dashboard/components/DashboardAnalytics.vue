<script setup lang="ts">
import { DonutChart } from "@/components";
import DashboardCard from "./DashboardCard.vue";
</script>

<template>
  <DashboardCard class="dashboard-analytics" title="Analytics">
    <DonutChart :return-value="20" :sale-value="10" :distribute-value="30" />

    <div class="legend">
      <span class="legend-item sale">Sale</span>
      <span class="legend-item distribute">Distribute</span>
      <span class="legend-item return">Return</span>
    </div>
  </DashboardCard>
</template>

<style lang="scss" scoped>
.dashboard-analytics {
  & > .legend {
    display: flex;
    justify-content: space-around;

    & > .legend-item {
      align-items: center;
      display: inline-flex;
      gap: 10px;

      font-weight: 600;
      line-height: 22px;

      &:before {
        display: block;
        border-radius: 5px;
        width: 15px;
        height: 15px;
        content: " ";
      }

      &.sale:before {
        background-color: var(--color-blue);
      }

      &.distribute:before {
        background-color: var(--color-yellow);
      }

      &.return:before {
        background-color: var(--color-orange);
      }
    }
  }
}
</style>
