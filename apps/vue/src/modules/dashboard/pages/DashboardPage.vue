<script setup lang="ts">
import { useAppLayout } from "@/components";
import {
  RecentOrders,
  StatCard,
  DashboardFilters,
  DashboardReports,
  DashboardAnalytics,
  TopSellingProducts,
} from "../components";

useAppLayout({
  title: "Dashboard",
  withHorizontalScroll: true,
});
</script>

<template>
  <Teleport to="#app-layout-actions">
    <DashboardFilters />
  </Teleport>

  <div class="dashboard-page">
    <section class="card stat stat-1"><StatCard type="save-products" :count="178" /></section>
    <section class="card stat stat-2"><StatCard type="stock-products" :count="20" /></section>
    <section class="card stat stat-3"><StatCard type="sales-products" :count="190" /></section>
    <section class="card stat stat-4"><StatCard type="job-application" :count="12" /></section>

    <section class="card reports"><DashboardReports /></section>
    <section class="card analytics"><DashboardAnalytics /></section>

    <section class="card orders"><RecentOrders /></section>
    <section class="card products"><TopSellingProducts /></section>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-page {
  flex: 1;
  gap: 30px;

  display: grid;
  grid-template-columns: repeat(12, minmax(auto, 1fr));
  grid-template-areas:
    "s1 s1 s1 s2 s2 s2 s3 s3 s3 s4 s4 s4"
    "reports reports reports reports reports reports reports analytics analytics analytics analytics analytics"
    "orders orders orders orders orders orders orders products products products products products";

  grid-template-rows: 116px auto auto;

  align-content: start;

  & > .card {
    display: flex;
    flex-direction: column;
    min-width: 0;
    background: var(--color-white);
    border-radius: 16px;

    &.stat {
      &.stat-1 {
        grid-area: s1;
      }

      &.stat-2 {
        grid-area: s2;
      }

      &.stat-3 {
        grid-area: s3;
      }

      &.stat-4 {
        grid-area: s4;
      }
    }

    &.reports {
      min-height: 410px;
      min-width: 720px;
      grid-area: reports;
    }

    &.analytics {
      min-height: 410px;
      min-width: 450px;
      grid-area: analytics;
    }

    &.orders {
      min-height: 335px;
      min-width: 720px;
      grid-area: orders;
    }

    &.products {
      min-height: 335px;
      min-width: 450px;
      grid-area: products;
    }
  }
}
</style>
