import { z } from "zod";

const serverEnvSchema = z.object({
  API_URL: z.string().url().default("http://localhost:3000/api"),
  OPENAPI_SPEC_PATH: z.string().default("./openapi/spec.json"),
  AUTH_SECRET: z.string().min(16).default("super-secret-development-key-min-32-chars"),
});

const clientEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_APP_NAME: z.string().default("Tony Next Starter"),
});

export const serverEnv = serverEnvSchema.parse({
  API_URL: process.env.API_URL,
  OPENAPI_SPEC_PATH: process.env.OPENAPI_SPEC_PATH,
  AUTH_SECRET: process.env.AUTH_SECRET,
});

export const clientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
});
