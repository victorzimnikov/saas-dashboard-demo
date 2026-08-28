import { useAuthStore } from "@/auth";
import type { RegisterFormValues } from "../types";
import { ref, type Ref } from "vue";

export const useRegisterApi = (): {
  onRegister: (values: RegisterFormValues) => Promise<void>;
  isSubmitting: Ref<boolean, boolean>;
  isError: Ref<boolean, boolean>;
} => {
  const authStore = useAuthStore();

  const isError = ref<boolean>(false);
  const isSubmitting = ref<boolean>(false);

  const handleRegister = async (values: RegisterFormValues) => {
    try {
      isError.value = false;
      isSubmitting.value = true;

      await authStore.register(values);
    } catch {
      isError.value = true;
    } finally {
      isSubmitting.value = false;
    }
  };

  return {
    onRegister: handleRegister,
    isSubmitting,
    isError,
  };
};
