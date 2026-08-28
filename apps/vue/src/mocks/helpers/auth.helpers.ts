import type { UserWithCredentials } from "@/types";
import { tryJsonParse } from "@/utils";

export const getTemporaryUsers = (): UserWithCredentials[] => {
  const usersJson = sessionStorage.getItem("demo/vuejs/users");

  const temporaryUsers = tryJsonParse<UserWithCredentials[]>(usersJson);

  if (temporaryUsers.ok) {
    return temporaryUsers.value ?? [];
  }

  return [];
};
