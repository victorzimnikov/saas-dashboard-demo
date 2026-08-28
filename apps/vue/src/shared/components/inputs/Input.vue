<script setup lang="ts">
import { useAttrs } from "vue";
import InputContainer from "./InputContainer.vue";
import type { InputContainerProps } from "./input.types";
import BaseInput from "./BaseInput.vue";

defineOptions({
  inheritAttrs: false,
});

const inputAttrs = useAttrs();
const { label, helperText, isError, rootClass } = defineProps<InputContainerProps>();

const model = defineModel<string>();
</script>

<template>
  <InputContainer
    :helper-text="helperText"
    :is-error="isError"
    :label="label"
    :root-class="rootClass"
  >
    <BaseInput v-bind="inputAttrs" v-model="model" />
  </InputContainer>
</template>
