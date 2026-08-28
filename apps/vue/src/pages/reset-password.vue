<script setup lang="ts">
import { CircularProgress } from "@/components";

definePage({
  meta: {
    requiresAuth: true,
  },
});
</script>

<template>
  <span>Reset password</span>

  <CircularProgress />
</template>
