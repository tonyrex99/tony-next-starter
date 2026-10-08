"use client";

import { RouterProvider } from "@heroui/react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

export interface HeroUIProviderProps {
  children: ReactNode;
}

export function HeroUIProvider({ children }: HeroUIProviderProps) {
  let navigate: ((to: string) => void) | undefined;
  try {
    // Safe fallback when executed outside Next.js App Router (e.g. Storybook / Vitest)
    const router = useRouter();
    navigate = router?.push;
  } catch {
    navigate = undefined;
  }

  return <RouterProvider navigate={navigate}>{children}</RouterProvider>;
}
