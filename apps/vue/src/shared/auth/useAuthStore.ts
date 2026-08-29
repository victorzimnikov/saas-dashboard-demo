import { QueryError, authFetcher, Urls } from "../queries";
import type { SuccessResponse } from "../queries";
import { defineStore } from "pinia";
import {
  loginBodySchema,
  loginResponseSchema,
  refreshTokenBodySchema,
  refreshTokenResponseSchema,
  registerBodySchema,
} from "./auth.schema";
import type { LoginBody, LoginResponse, RefreshTokenResponse, RegisterBody } from "./auth.schema";
import { decodeJwt, isTokenExpired, tryJsonParse, tryJsonStringify } from "../utils";
import { useProfileStore } from "../profile";
import { localStorage } from "../storage";

const STORE_NAME = "AUTH";
const REFRESH_BUFFER_SECONDS = 10 * 60;

let initializationPromise: Promise<void> | null = null;

type AuthStatus = "unknown" | "loading" | "authenticated" | "unauthenticated";

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

type State = {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  status: AuthStatus;
};

type Getters = {
  isAuthenticated: (state: State) => boolean;
  canRefresh: (state: State) => boolean;
  shouldRefreshAccessToken: (state: State) => boolean;
  isAccessTokenExpired: (state: State) => boolean;
};

type Actions = {
  login: (data: LoginBody) => Promise<unknown>;
  register: (data: RegisterBody) => Promise<unknown>;
  refreshAccessToken: () => Promise<string>;
  setTokens: (accessToken: string, refreshToken: string) => void;
  resetTokens: () => void;
  initializeSession: () => Promise<void>;
  ensureSessionLoaded: () => Promise<void>;
  logout: () => void;
};

export const useAuthStore = defineStore<typeof STORE_NAME, State, Getters, Actions>(STORE_NAME, {
  state: () => {
    const tokensJson = localStorage.getItem("demo/vuejs/tokens");

    const tokens = tryJsonParse<Tokens>(tokensJson);

    if (tokens.ok) {
      const { exp: expiresAt } = decodeJwt(tokens.value.accessToken);

      return {
        accessToken: tokens.value.accessToken,
        refreshToken: tokens.value.refreshToken,
        expiresAt: expiresAt ?? null,
        status: "unknown",
      };
    }

    if (tokensJson) {
      localStorage.removeItem("demo/vuejs/tokens");
    }

    return {
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
      status: "unknown",
    };
  },
  getters: {
    isAuthenticated(state) {
      return !isTokenExpired(state.accessToken);
    },
    isAccessTokenExpired: (state): boolean => {
      if (!state.expiresAt) {
        return true;
      }

      // Небольшой запас, чтобы токен не истёк во время запроса.
      return state.expiresAt <= Date.now() + 10000;
    },
    canRefresh(state) {
      return Boolean(state.refreshToken);
    },
    shouldRefreshAccessToken(state) {
      if (!state.refreshToken) {
        return false;
      }

      if (!state.accessToken || !state.expiresAt) {
        return true;
      }

      const now = Math.floor(Date.now() / 1000);

      return state.expiresAt - REFRESH_BUFFER_SECONDS <= now;
    },
  },
  actions: {
    async register(data) {
      try {
        await authFetcher<SuccessResponse<void>, LoginBody>(Urls.register(), {
          method: "POST",
          data,
          requestSchema: registerBodySchema,
        });
      } catch (error) {
        if (error instanceof QueryError) {
          return error;
        }

        return new QueryError("Что-то пошло не так!");
      }
    },
    async login(data) {
      try {
        const response = await authFetcher<SuccessResponse<LoginResponse>, LoginBody>(
          Urls.login(),
          {
            method: "POST",
            data,
            requestSchema: loginBodySchema,
            responseSchema: loginResponseSchema,
          },
        );

        const loginResult = response.data.data;

        const userStore = useProfileStore();

        userStore.setUser(loginResult.user);
        this.setTokens(loginResult.accessToken, loginResult.refreshToken);

        if (data.rememberMe) {
          const tokensJson = tryJsonStringify({
            accessToken: loginResult.accessToken,
            refreshToken: loginResult.refreshToken,
          });

          if (tokensJson.ok) {
            localStorage.setItem("demo/vuejs/tokens", tokensJson.value);
          }
        }

        return loginResult.user;
      } catch (error) {
        if (error instanceof QueryError) {
          return error;
        }

        return new QueryError("Что-то пошло не так!");
      }
    },
    async ensureSessionLoaded(): Promise<void> {
      if (this.status === "authenticated" || this.status === "unauthenticated") {
        return;
      }

      if (initializationPromise) {
        return initializationPromise;
      }

      initializationPromise = this.initializeSession().finally(() => {
        initializationPromise = null;
      });

      return initializationPromise;
    },
    async initializeSession(): Promise<void> {
      this.status = "loading";

      try {
        if (!this.accessToken && !this.refreshToken) {
          this.resetTokens();
          return;
        }

        if (this.isAccessTokenExpired) {
          if (!this.refreshToken) {
            this.resetTokens();
            return;
          }

          await this.refreshAccessToken();
        }

        this.status = "authenticated";
      } catch (error) {
        this.resetTokens();
        throw error;
      }
    },
    async refreshAccessToken() {
      if (!this.refreshToken) {
        throw new Error("Refresh token is missing");
      }

      try {
        const response = await authFetcher<SuccessResponse<RefreshTokenResponse>>(
          Urls.refreshToken(),
          {
            data: { refreshToken: this.refreshToken },
            method: "POST",
            requestSchema: refreshTokenBodySchema,
            responseSchema: refreshTokenResponseSchema,
          },
        );

        const tokens = response.data.data;

        const userStore = useProfileStore();

        userStore.setUser(tokens.user);
        this.setTokens(tokens.accessToken, tokens.refreshToken);

        return tokens.accessToken;
      } catch (error) {
        this.resetTokens();
        throw error;
      }
    },
    setTokens(accessToken, refreshToken) {
      this.accessToken = accessToken ?? null;
      this.refreshToken = refreshToken ?? null;

      const { exp: expiresAt } = decodeJwt(accessToken);

      this.expiresAt = expiresAt ?? null;
    },
    resetTokens() {
      this.accessToken = null;
      this.refreshToken = null;

      this.expiresAt = null;

      this.status = "unauthenticated";

      localStorage.removeItem("demo/vuejs/tokens");
    },
    logout() {
      const userStore = useProfileStore();

      this.resetTokens();

      userStore.clearUser();
    },
  },
});
