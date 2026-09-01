<script setup lang="ts">
import { alpha } from "@saas-dashboard/utils";
import { MoreIcon } from "../icons";
import ButtonBase from "./ButtonBase.vue";
import { ColorPalette } from "@/constants";
</script>

<template>
  <ButtonBase class="more-button">
    <MoreIcon :color="alpha(ColorPalette.Text, 0.3)" />
  </ButtonBase>
</template>

<style lang="scss" scoped>
.more-button {
  width: 24px;
  height: 24px;
  border-radius: 50%;

  transition: background-color 300ms ease;

  &:hover {
    background-color: rgba(from var(--color-text) r g b / 5%);
  }
}
</style>
