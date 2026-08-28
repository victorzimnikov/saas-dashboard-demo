import { useAuthStore } from "@/auth";
import type { LoginFormValues } from "../types";
import { ref, type Ref } from "vue";

export const useLoginApi = (): {
  onLogin: (values: LoginFormValues) => Promise<void>;
  isSubmitting: Ref<boolean, boolean>;
  isError: Ref<boolean, boolean>;
} => {
  const authStore = useAuthStore();

  const isError = ref<boolean>(false);
  const isSubmitting = ref<boolean>(false);

  const handleLogin = async (values: LoginFormValues) => {
    try {
      isError.value = false;
      isSubmitting.value = true;

      await authStore.login(values);
    } catch {
      isError.value = true;
    } finally {
      isSubmitting.value = false;
    }
  };

  return {
    onLogin: handleLogin,
    isSubmitting,
    isError,
  };
};
