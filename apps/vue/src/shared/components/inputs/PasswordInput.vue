<script setup lang="ts">
import { ref, useAttrs } from "vue";
import InputContainer from "./InputContainer.vue";
import { EyeCloseIcon, EyeOpenIcon } from "../icons";
import type { InputContainerProps } from "./input.types";
import BaseInput from "./BaseInput.vue";
import { ButtonBase } from "../buttons";

defineOptions({
  inheritAttrs: false,
});

const inputAttrs = useAttrs();
const { label, helperText, isError, rootClass } = defineProps<InputContainerProps>();

const model = defineModel<string>();

const isShowPassword = ref(false);
</script>

<template>
  <InputContainer
    :root-class="['password-input', rootClass]"
    :helper-text="helperText"
    :is-error="isError"
    :label="label"
  >
    <BaseInput
      v-bind="inputAttrs"
      v-model="model"
      :type="isShowPassword ? 'text' : 'password'"
      placeholder="••••••••••"
    />

    <template #end-adornment>
      <ButtonBase class="button" @click="isShowPassword = !isShowPassword">
        <EyeOpenIcon v-if="isShowPassword" />
        <EyeCloseIcon v-else />
      </ButtonBase>
    </template>
  </InputContainer>
</template>

<style scoped lang="scss">
.password-input {
  .button {
    border: none;
    background: none;
    outline: none;
    cursor: pointer;
  }
}
</style>
