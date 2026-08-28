import { setupWorker } from "msw/browser";
import { authHandlers } from "./authHandlers";

export const enableApiMocking = async () => {
  const worker = setupWorker(...authHandlers);

  await worker.start({
    onUnhandledRequest: "bypass",
    quiet: true,
  });
};
