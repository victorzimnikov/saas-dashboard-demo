<script setup lang="ts">
import { LineChart } from "@/components";
import DashboardCard from "./DashboardCard.vue";

const sales = [
  { time: "10am", value: 54, sales: 2340 },
  { time: "11am", value: 31, sales: 1890 },
  { time: "12am", value: 57, sales: 3120, marker: true },
  { time: "01am", value: 35, sales: 2154, marker: true },
  { time: "02am", value: 22, sales: 1430 },
  { time: "03am", value: 49, sales: 2678, marker: true },
  { time: "04am", value: 13, sales: 980 },
  { time: "05am", value: 34, sales: 2210, marker: true },
  { time: "06am", value: 67, sales: 3890, marker: true },
  { time: "07am", value: 55, sales: 3180 },

  // Пустая подпись создаёт продолжение линии после 07am,
  // как на референсе.
  { time: "", value: 73, sales: 4210 },
];
</script>

<template>
  <DashboardCard class="dashboard-reports" title="Reports"
    ><LineChart :data="sales"
  /></DashboardCard>
</template>

<style lang="scss" scoped>
.dashboard-reports {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px 0 24px 24px;
}
</style>
