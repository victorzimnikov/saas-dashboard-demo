import { inject, onMounted, type InjectionKey } from "vue";

type AppLayoutOptions = {
  title?: string;
};

type AppLayoutContext = {
  setOptions(options: AppLayoutOptions): void;
};

export const appLayoutKey: InjectionKey<AppLayoutContext> = Symbol("app-layout");

export function useAppLayout(options: AppLayoutOptions) {
  const layout = inject(appLayoutKey);

  if (!layout) {
    throw new Error("useAppLayout() должен вызываться внутри AppLayout");
  }

  onMounted(() => {
    layout.setOptions(options);
  });
}
