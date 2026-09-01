<script setup lang="ts">
import { DatePicker } from "@/components";
import { useDashboardStore } from "../store";

const dashboardStore = useDashboardStore();
</script>

<template>
  <DatePicker v-model="dashboardStore.filters.from" />
  <DatePicker v-model="dashboardStore.filters.to" />
</template>

<style lang="scss" scoped></style>
