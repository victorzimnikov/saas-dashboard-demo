import { defineStore } from "pinia";
import type { User, UserRole } from "./common.schema";

const STORE_NAME = "PROFILE";

type State = {
  user: User | null;
};

type Getters = {
  getUserRole: () => UserRole | null;
};

type Actions = {
  setUser: (user: User) => void;
};

export const useProfileStore = defineStore<typeof STORE_NAME, State, Getters, Actions>(STORE_NAME, {
  state: () => ({
    user: null,
  }),
  getters: {
    getUserRole() {
      return this.user?.role ?? null;
    },
  },
  actions: {
    setUser(user) {
      this.user = user;
    },
  },
});
