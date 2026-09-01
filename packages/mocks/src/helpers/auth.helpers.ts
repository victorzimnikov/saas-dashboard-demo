import type { UserWithCredentials } from "@saas-dashboard/contracts";
import { tryJsonParse } from "@saas-dashboard/utils";

export const getTemporaryUsers = (): UserWithCredentials[] => {
  const usersJson = sessionStorage.getItem("demo/vuejs/users");

  const temporaryUsers = tryJsonParse<UserWithCredentials[]>(usersJson);

  if (temporaryUsers.ok) {
    return temporaryUsers.value ?? [];
  }

  return [];
};
