<script setup lang="ts">
import { noop } from "@saas-dashboard/utils";
import { useLoginApi, useRegisterApi } from "../api";
import { AuthLayout, LoginForm, RegisterForm } from "../components";
import type { LoginFormValues, RegisterFormValues } from "../types";
import { useRouter } from "vue-router";
import { useLoginPageQuery } from "../composables";
import { ref } from "vue";

const router = useRouter();
const query = useLoginPageQuery();

const formType = ref<"login" | "register">("login");

const loginApi = useLoginApi();
const registerApi = useRegisterApi();

const handleLoginSubmit = (values: LoginFormValues) => {
  loginApi
    .onLogin(values)
    .then(() => {
      if (query.value.redirect) {
        router.replace(query.value.redirect);
      } else {
        router.replace("/dashboard");
      }
    })
    .catch(noop);
};

const handleRegisterSubmit = (values: RegisterFormValues) => {
  registerApi
    .onRegister(values)
    .then(() => {
      formType.value = "register";
    })
    .catch(noop);
};
</script>

<template>
  <AuthLayout :type="formType">
    <Transition name="fade" mode="out-in" :duration="0.5">
      <LoginForm
        v-if="formType === 'login'"
        :is-loading="loginApi.isSubmitting.value"
        @submit="handleLoginSubmit"
        @register="formType = 'register'"
      />
      <RegisterForm
        v-else
        :is-loading="registerApi.isSubmitting.value"
        @submit="handleRegisterSubmit"
        @login="formType = 'login'"
      />
    </Transition>
  </AuthLayout>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
