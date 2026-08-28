<script setup lang="ts">
import { AppIcon } from "@/components";
import singUpUrl from "../assets/sign-up.png";
import singInUrl from "../assets/sign-in.png";
import { computed } from "vue";

type Props = {
  type?: "login" | "register";
};

const { type = "login" } = defineProps<Props>();

const title = computed(() => (type === "login" ? "Sing In" : "Sign Up"));
</script>

<template>
  <div class="auth-layout">
    <div class="sidebar">
      <div class="header">
        <AppIcon />

        <span class="title">{{ title }}</span>
      </div>

      <slot></slot>
    </div>

    <div class="content">
      <Transition name="fade" mode="out-in" :duration="0.5">
        <img v-if="type == 'login'" class="image" :src="singInUrl" />
        <img v-else class="image" :src="singUpUrl" />
      </Transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth-layout {
  display: flex;
  flex: 1;

  & > .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
      display: none;
    }

    & > .image {
      height: auto;
      width: 50%;
    }

    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
      opacity: 0;
    }
  }

  & > .sidebar {
    display: flex;
    padding: 50px;
    flex-direction: column;
    justify-content: center;
    max-width: 448px;
    flex: 1;
    gap: 40px;
    background-color: var(--color-white);

    @media (max-width: 768px) {
      max-width: unset;
    }

    @media (max-width: 480px) {
      padding: 25px;
    }

    & > .header {
      display: flex;
      align-items: center;
      gap: 40px;
      flex-direction: column;

      & > .title {
        font-size: 25px;
        font-weight: 600;
        text-align: center;
      }

      @media (max-width: 480px) {
        gap: 20px;
      }
    }
  }
}
</style>
