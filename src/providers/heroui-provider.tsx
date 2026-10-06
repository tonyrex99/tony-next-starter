"use client";

import { RouterProvider } from "@heroui/react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

export interface HeroUIProviderProps {
  children: ReactNode;
}

export function HeroUIProvider({ children }: HeroUIProviderProps) {
  const router = useRouter();

  return <RouterProvider navigate={router.push}>{children}</RouterProvider>;
}
