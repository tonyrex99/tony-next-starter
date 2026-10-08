"use client";

import { RouterProvider } from "@heroui/react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

export interface HeroUIProviderProps {
  children: ReactNode;
}

export function HeroUIProvider({ children }: HeroUIProviderProps) {
  let router: ReturnType<typeof useRouter> | null = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    router = useRouter();
  } catch {
    router = null;
  }

  const handleNavigate = (path: string) => {
    if (router) {
      router.push(path);
    }
  };

  return <RouterProvider navigate={handleNavigate}>{children}</RouterProvider>;
}
