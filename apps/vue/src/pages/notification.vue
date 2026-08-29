<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useAppLayout } from "@/components";
definePage({
  meta: {
    requiresAuth: true,
  },
});

useAppLayout({
  title: "Notification",
});
</script>

<template>Notification</template>
