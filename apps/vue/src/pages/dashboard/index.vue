<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { DashboardPage } from "@/modules/dashboard";

definePage({
  meta: {
    requiresAuth: true,
  },
});
</script>

<template>
  <DashboardPage />
</template>
