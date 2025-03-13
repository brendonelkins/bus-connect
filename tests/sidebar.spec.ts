import { test, expect } from "@playwright/test";

test("confirm sidebar items", async ({ page }) => {
  await page.goto("/", { waitUntil: "commit" });

  const sidebarMenu = page.locator("#main-menu");

  await expect(sidebarMenu.locator("i.app-dashboard")).toBeVisible();
  await expect(sidebarMenu.locator("i.app-trips")).toBeVisible();
  await expect(sidebarMenu.locator("i.app-consumption")).toBeVisible();
  await expect(sidebarMenu.locator("i.app-driver")).toBeVisible();
  await expect(sidebarMenu.locator("i.app-digitacho")).toBeVisible();
  await expect(sidebarMenu.locator("i.app-inspector")).toBeVisible();
  await expect(sidebarMenu.locator("i.app-signal-history")).toBeVisible();
  await expect(sidebarMenu.locator("i.app-vehicle-health")).toBeVisible();
  await expect(sidebarMenu.locator("i.app-custom")).toBeVisible();
  await expect(sidebarMenu.locator("i.app-admin")).toBeVisible();
  await expect(sidebarMenu.locator("i.app-help")).toBeVisible();
});
