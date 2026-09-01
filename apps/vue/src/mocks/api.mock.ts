import { setupWorker } from "msw/browser";
import { authHandlers, ordersHandlers, productsHandlers } from "./handlers";

export const enableApiMocking = async () => {
  const worker = setupWorker(...authHandlers, ...productsHandlers, ...ordersHandlers);

  await worker.start({
    onUnhandledRequest: "bypass",
    quiet: true,
  });
};
