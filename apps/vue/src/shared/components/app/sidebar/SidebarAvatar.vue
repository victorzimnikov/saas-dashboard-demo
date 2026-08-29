<script setup lang="ts">
import { LogoutIcon } from "../../icons";
import { ButtonBase } from "../../buttons";
import avatarSrc from "../assets/avatar.png";
import { useAuthStore } from "@/auth";
import { useProfileStore } from "@/profile";
import { useRouter } from "vue-router";

type Props = {
  isOpen: boolean;
};

const { isOpen } = defineProps<Props>();

const router = useRouter();

const authStore = useAuthStore();
const profileStore = useProfileStore();

const handleLogout = async () => {
  authStore.logout();

  await router.replace("/");
};
</script>

<template>
  <div :class="['sidebar-avatar', { 'is-open': isOpen }]">
    <div class="avatar-container">
      <img class="avatar" :src="avatarSrc" />
    </div>

    <div class="name-container">
      <span class="name">{{ profileStore.userFullName }}</span>
      <span class="subscription">Free Account</span>
    </div>

    <ButtonBase class="logout-icon" @click="handleLogout">
      <LogoutIcon />
    </ButtonBase>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-avatar {
  position: relative;
  display: flex;
  gap: 10px;
  margin: 30px 25px;
  height: 43px;

  transition:
    margin 300ms ease,
    height 300ms ease;

  & > .logout-icon {
    position: absolute;
    opacity: 0.4;

    left: 149px;
    top: 10px;

    transform: translate(0, 0);

    transition: transform 300ms ease;
  }

  & > .avatar-container {
    border-radius: 12px;
    height: 43px;
    min-width: 45px;
    max-width: 45px;
    overflow: hidden;
    background-color: var(--color-pink-light);

    & > .avatar {
      height: 43px;
      width: 45px;
    }
  }

  & > .name-container {
    display: flex;
    flex-direction: column;
    gap: 1px;
    opacity: 1;
    flex: 1;
    align-self: flex-start;
    min-width: 84px;
    max-width: 84px;
    height: 43px;
    justify-content: center;

    transition: opacity 300ms ease;

    & > .name {
      font-size: 12px;
      line-height: 16px;
    }

    & > .subscription {
      opacity: 0.5;
      font-size: 10px;
      line-height: 14px;
    }
  }

  &:not(.is-open) {
    height: 80px;
    margin: 30px 18px;

    & > .name-container {
      opacity: 0;
    }

    & > .logout-icon {
      transform: translate(-137px, 53px);
    }
  }
}
</style>
