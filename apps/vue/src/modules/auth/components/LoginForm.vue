<script setup lang="ts">
import { Button, Checkbox, Input, Link, PasswordInput } from "@/components";
import { toTypedSchema } from "@vee-validate/zod";
import { Field, Form } from "vee-validate";
import { loginFormSchema } from "../types";

type Props = {
  isLoading: boolean;
};

type Emits = {
  register: [];
};

defineEmits<Emits>();

const { isLoading } = defineProps<Props>();
</script>

<template>
  <Form
    :validation-schema="toTypedSchema(loginFormSchema)"
    class="login-form"
    :initial-values="{ email: '', password: '', rememberMe: false }"
  >
    <Field v-slot="{ componentField, errorMessage }" name="email">
      <Input
        v-bind="componentField"
        label="Email Address"
        placeholder="example@gmail.com"
        type="email"
        autocomplete="email"
        :helper-text="errorMessage"
        :is-error="!!errorMessage"
      />
    </Field>

    <Field v-slot="{ componentField, errorMessage }" name="password">
      <PasswordInput
        v-bind="componentField"
        label="Password"
        autocomplete="password"
        :helper-text="errorMessage"
        :is-error="!!errorMessage"
      />
    </Field>

    <div class="remember-row">
      <Field v-slot="{ componentField }" name="rememberMe">
        <Checkbox v-bind="componentField" label="Remember me" />
      </Field>

      <Link href="/reset-password">Reset Password?</Link>
    </div>

    <Button type="submit" :is-loading="isLoading">Log in</Button>

    <div class="bottom-row">
      <span>Don’t have account yet?</span>
      <Link @click="$emit('register')">New Account</Link>
    </div>
  </Form>
</template>

<style lang="scss" scoped>
.login-form {
  display: flex;
  gap: 20px;
  flex-direction: column;

  & > .remember-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  & > .bottom-row {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;

    & > .link {
      font-size: 16px;
    }
  }
}
</style>
