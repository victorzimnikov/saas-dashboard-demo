import { defineStore } from "pinia";
import type { DashboardFilters } from "../types";
import { add } from "date-fns";

const STORE_NAME = "dashboard";

type State = {
  filters: DashboardFilters;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Getters = {};

type Actions = {
  setFilter<NAME extends keyof DashboardFilters>(name: NAME, value: DashboardFilters[NAME]): void;
};

export const useDashboardStore = defineStore<typeof STORE_NAME, State, Getters, Actions>(
  STORE_NAME,
  {
    state: () => ({
      filters: {
        from: new Date(),
        to: add(new Date(), { days: 7 }),
      },
    }),
    getters: {},
    actions: {
      setFilter(name, value) {
        this.filters[name] = value;
      },
    },
  },
);
