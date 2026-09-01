import { setupWorker } from "msw/browser";
import { authHandlers, ordersHandlers, productsHandlers } from "./handlers";

export const enableApiMocking = async () => {
  const worker = setupWorker(...authHandlers, ...productsHandlers, ...ordersHandlers);

  await worker.start({
    serviceWorker: {
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
    },
    onUnhandledRequest: "bypass",
    quiet: true,
  });
};
