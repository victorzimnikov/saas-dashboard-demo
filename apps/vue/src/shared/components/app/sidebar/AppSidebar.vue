<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import SidebarItem from "./SidebarItem.vue";
import {
  CalendarIcon,
  CategoryIcon,
  ChartIcon,
  ChevronIcon,
  GearIcon,
  NotificationIcon,
  ScheduleIcon,
  TicketIcon,
  MessagesIcon,
} from "../../icons";
import type { RouteNamedMap } from "vue-router/auto-routes";
import { ref } from "vue";
import SidebarAvatar from "./SidebarAvatar.vue";
import SidebarHeader from "./SidebarHeader.vue";

const route = useRoute();
const router = useRouter();

const isOpen = ref(true);

const handleItemClick = (name: keyof RouteNamedMap) => {
  router.push(name);
};
</script>

<template>
  <div :class="['app-sidebar', { 'is-open': isOpen }]">
    <div :class="['sidebar-container', { 'is-open': isOpen }]">
      <SidebarHeader :is-open="isOpen" />

      <nav class="sidebar-nav">
        <SidebarItem
          v-slot="{ iconClass, color }"
          :is-active="!!route.name?.startsWith('/dashboard')"
          :is-open="isOpen"
          label="Dashboard"
          :title="isOpen ? undefined : 'Dashboard'"
          @click="handleItemClick('/dashboard/')"
        >
          <CategoryIcon :class="iconClass" :color="color" />
        </SidebarItem>
        <SidebarItem
          v-slot="{ iconClass, color }"
          :is-active="!!route.name?.startsWith('/analytics')"
          :is-open="isOpen"
          label="Analytics"
          :title="isOpen ? undefined : 'Analytics'"
          @click="handleItemClick('/analytics')"
        >
          <ChartIcon :class="iconClass" :color="color" />
        </SidebarItem>
        <SidebarItem
          v-slot="{ iconClass, color }"
          :is-active="!!route.name?.startsWith('/invoice')"
          :is-open="isOpen"
          label="Invoice"
          :title="isOpen ? undefined : 'Invoice'"
          @click="handleItemClick('/invoice')"
        >
          <TicketIcon :class="iconClass" :color="color" />
        </SidebarItem>
        <SidebarItem
          v-slot="{ iconClass, color }"
          :is-active="!!route.name?.startsWith('/schedule')"
          :is-open="isOpen"
          label="Schedule"
          :title="isOpen ? undefined : 'Schedule'"
          @click="handleItemClick('/schedule')"
        >
          <ScheduleIcon :class="iconClass" :color="color" />
        </SidebarItem>
        <SidebarItem
          v-slot="{ iconClass, color }"
          :is-active="!!route.name?.startsWith('/calendar')"
          :is-open="isOpen"
          label="Calendar"
          :title="isOpen ? undefined : 'Calendar'"
          @click="handleItemClick('/calendar')"
        >
          <CalendarIcon :class="iconClass" :color="color" />
        </SidebarItem>
        <SidebarItem
          v-slot="{ iconClass, color }"
          :is-active="!!route.name?.startsWith('/messages')"
          :is-open="isOpen"
          label="Messages"
          :title="isOpen ? undefined : 'Messages'"
          @click="handleItemClick('/messages')"
        >
          <MessagesIcon :class="iconClass" :color="color" />
        </SidebarItem>
        <SidebarItem
          v-slot="{ iconClass, color }"
          :is-active="!!route.name?.startsWith('/notification')"
          :is-open="isOpen"
          label="Notification"
          :title="isOpen ? undefined : 'Notification'"
          @click="handleItemClick('/notification')"
        >
          <NotificationIcon :class="iconClass" :color="color" />
        </SidebarItem>
        <SidebarItem
          v-slot="{ iconClass, color }"
          :is-active="!!route.name?.startsWith('/settings')"
          :is-open="isOpen"
          label="Settings"
          :title="isOpen ? undefined : 'Settings'"
          @click="handleItemClick('/settings')"
        >
          <GearIcon :class="iconClass" :color="color" />
        </SidebarItem>

        <div class="divider" />

        <SidebarItem
          v-slot="{ iconClass, color }"
          :is-active="false"
          :is-open="isOpen"
          label="Hide"
          :title="isOpen ? undefined : 'Show'"
          @click="isOpen = !isOpen"
        >
          <ChevronIcon :class="[iconClass, 'chevron-icon', { 'is-open': isOpen }]" :color="color" />
        </SidebarItem>
      </nav>

      <SidebarAvatar :is-open="isOpen" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-sidebar {
  display: flex;
  flex-direction: column;
  width: 218px;
  padding: 0px;

  transition:
    padding 300ms ease,
    width 300ms ease;

  &:not(.is-open) {
    width: 110px;
    padding: 30px 0 30px 30px;
  }

  & > .sidebar-container {
    flex: 1;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    background-color: var(--color-white);
    border-radius: 0px;

    transition: border-radius 300ms ease;

    &:not(.is-open) {
      border-radius: 10px;
    }

    & > .sidebar-nav {
      flex: 1;
      display: flex;
      flex-direction: column;

      & > .divider {
        width: calc(100% - 60px);
        height: 2px;
        background-color: var(--color-secondary);
        align-self: center;
      }

      .chevron-icon {
        transform: rotate(360deg);

        transition: transform 300ms ease;

        &.is-open {
          transform: rotate(180deg);
        }
      }
    }
  }
}
</style>
