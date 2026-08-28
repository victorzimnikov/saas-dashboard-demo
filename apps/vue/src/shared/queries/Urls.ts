import { API_HOST } from "@/constants";
import { createUrl } from "./helpers";

export const Urls = {
  // Auth
  refreshToken: () => createUrl("auth/refresh-token", { host: API_HOST }),
  login: () => createUrl("auth/login", { host: API_HOST }),
  register: () => createUrl("auth/register", { host: API_HOST }),
};
