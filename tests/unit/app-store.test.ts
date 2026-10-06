import { describe, expect, it } from "vitest";
import { useAppStore } from "@/stores/app.store";

describe("useAppStore", () => {
  it("initializes with sidebarCollapsed false", () => {
    expect(useAppStore.getState().sidebarCollapsed).toBe(false);
  });

  it("toggles sidebarCollapsed correctly", () => {
    useAppStore.getState().toggleSidebar();
    expect(useAppStore.getState().sidebarCollapsed).toBe(true);

    useAppStore.getState().toggleSidebar();
    expect(useAppStore.getState().sidebarCollapsed).toBe(false);
  });

  it("sets sidebarCollapsed explicitly", () => {
    useAppStore.getState().setSidebarCollapsed(true);
    expect(useAppStore.getState().sidebarCollapsed).toBe(true);
  });
});
