import { test, expect } from "@playwright/test";

test.describe("Tony Next Starter E2E Flows", () => {
  test("loads login page and navigates to dashboard", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("heading", { name: "Welcome Back" })).toBeVisible();

    await page.getByRole("button", { name: "Sign In" }).click();
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.getByRole("heading", { name: "Application Overview" })).toBeVisible();
  });

  test("navigates to example feature and displays table", async ({ page }) => {
    await page.goto("/example");
    await expect(page.getByRole("heading", { name: "Items Management" })).toBeVisible();
    await expect(page.getByPlaceholder("Search items by name or category...")).toBeVisible();
  });
});
