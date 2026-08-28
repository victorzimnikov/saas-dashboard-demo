import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import { API_HOST } from "@/constants";

type AuthAdapter = {
  getAccessToken: () => string | null;
  canRefresh: () => boolean;
  shouldRefresh: () => boolean;
  refreshAccessToken: () => Promise<string>;
};

type RetryRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let authAdapter: AuthAdapter | null = null;
let refreshPromise: Promise<string> | null = null;

export const configureApiClient = (adapter: AuthAdapter): void => {
  authAdapter = adapter;
};

const apiClient: AxiosInstance = axios.create({
  baseURL: API_HOST,
  withCredentials: true,
});

const refreshTokenOnce = (): Promise<string> => {
  if (!authAdapter) {
    return Promise.reject(new Error("Auth adapter is not configured"));
  }

  if (!refreshPromise) {
    refreshPromise = authAdapter.refreshAccessToken().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (!authAdapter) {
      return config;
    }

    let accessToken = authAdapter.getAccessToken();

    if (authAdapter.canRefresh() && authAdapter.shouldRefresh()) {
      accessToken = await refreshTokenOnce();
    }

    if (accessToken) {
      config.headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryRequestConfig | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      !authAdapter?.canRefresh()
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const accessToken = await refreshTokenOnce();

      originalRequest.headers.set("Authorization", `Bearer ${accessToken}`);

      return apiClient(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  },
);

export { apiClient };
