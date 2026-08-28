<script setup lang="ts">
import { Button, Checkbox, Input, Link, PasswordInput } from "@/components";
import { toTypedSchema } from "@vee-validate/zod";
import { Field, Form } from "vee-validate";
import { registerFormSchema } from "../types";

type Props = {
  isLoading: boolean;
};

type Emits = {
  login: [];
};

defineEmits<Emits>();
const { isLoading } = defineProps<Props>();
</script>

<template>
  <Form
    :validation-schema="toTypedSchema(registerFormSchema)"
    class="register-form"
    :initial-values="{
      email: '',
      password: '',
      fullName: '',
      username: '',
      privacyAccept: false,
    }"
  >
    <Field v-slot="{ componentField, errorMessage }" name="fullName">
      <Input
        v-bind="componentField"
        label="Full Name"
        placeholder="User Userov"
        autocapitalize="on"
        :helper-text="errorMessage"
        :is-error="!!errorMessage"
      />
    </Field>

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

    <Field v-slot="{ componentField, errorMessage }" name="username">
      <Input
        v-bind="componentField"
        label="Username"
        placeholder="userov123"
        autocapitalize="off"
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

    <Field v-slot="{ componentField, errorMessage }" name="privacyAccept">
      <Checkbox v-bind="componentField" class="privacy-accept" :is-error="!!errorMessage">
        <span class="privacy-accept-text">
          By creating an account you agree to the <Link>terms of use</Link> and our
          <Link>privacy policy</Link>.
        </span>
      </Checkbox>
    </Field>

    <Button type="submit" :is-loading="isLoading">Create account</Button>

    <div class="bottom-row">
      <span>Already have an account?</span>
      <Link @click="$emit('login')">Log in</Link>
    </div>
  </Form>
</template>

<style lang="scss" scoped>
.register-form {
  display: flex;
  gap: 20px;
  flex-direction: column;

  & > .privacy-accept {
    & > :deep(.checkbox) {
      align-items: flex-start;
    }

    .privacy-accept-text {
      text-align: left;

      & > .link {
        text-decoration: underline;
      }
    }
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
