import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("/");

  await page.locator("i.app-trips").click();

  await page.locator("tr").last().click();

  await page.locator(".om-icon-menu-down").click();

  await expect(page.locator(".statistics")).toBeVisible();

  await expect(page.locator(".detail-map.expanded")).toBeVisible();

  await page.locator(".om-icon-menu-down").click();

  await expect(page.locator(".statistics")).not.toBeVisible();

  await expect(page.locator(".detail-map.collapsed")).toBeVisible();
});
