"use client";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { ReactNode } from "react";
import { HeroUIProvider } from "./heroui-provider";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";

export interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      <NuqsAdapter>
        <ThemeProvider>
          <HeroUIProvider>{children}</HeroUIProvider>
        </ThemeProvider>
      </NuqsAdapter>
    </QueryProvider>
  );
}

export { HeroUIProvider, QueryProvider, ThemeProvider };
