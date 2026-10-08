import { client } from "./generated/client.gen";
import { clientEnv } from "@/config/environment";

// Configure client runtime defaults
client.setConfig({
  baseUrl: `${clientEnv.NEXT_PUBLIC_APP_URL}/api`,
});

export { client as apiClient };
export * from "./generated";
export * from "./generated/zod.gen";
export * from "./generated/@tanstack/react-query.gen";
