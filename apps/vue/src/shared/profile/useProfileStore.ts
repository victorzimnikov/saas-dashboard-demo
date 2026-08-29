import { defineStore } from "pinia";
import type { User, UserRole } from "./common.schema";

const STORE_NAME = "PROFILE";

type State = {
  user: User | null;
};

type Getters = {
  getUserRole: () => UserRole | null;
  userFullName: () => string;
};

type Actions = {
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useProfileStore = defineStore<typeof STORE_NAME, State, Getters, Actions>(STORE_NAME, {
  state: () => ({
    user: null,
  }),
  getters: {
    getUserRole() {
      return this.user?.role ?? null;
    },
    userFullName() {
      return this.user?.fullName ?? "";
    },
  },
  actions: {
    setUser(user) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
    },
  },
});
