import { setupWorker } from "msw/browser";
import { createHandlers } from "./handlers";

export type EnableApiMockingOptions = {
  baseUrl?: string;
  accessTokenSecret: string;
  refreshTokenSecret: string;
};

export async function enableApiMocking({
  baseUrl = "/",
  accessTokenSecret,
  refreshTokenSecret,
}: EnableApiMockingOptions): Promise<void> {
  const handlers = createHandlers({
    baseUrl,
    accessTokenSecret,
    refreshTokenSecret,
  });

  const worker = setupWorker(...handlers);

  await worker.start({
    serviceWorker: {
      url: `${baseUrl}mockServiceWorker.js`,
    },
    onUnhandledRequest: "bypass",
    quiet: true,
  });
}
