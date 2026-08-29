<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { Button, useAppLayout } from "@/components";

useAppLayout({
  title: "Dashboard",
});

definePage({
  meta: {
    requiresAuth: true,
  },
});
</script>

<template>
  <Teleport to="#app-layout-actions">
    <Button>Сохранить</Button>
  </Teleport>
  Dashboard
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  asdfasdfasd
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  sasdfasdfasdf
</template>
