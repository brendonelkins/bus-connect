import { test, expect } from "@playwright/test";

test("confirm sidebar items", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("li:nth-child(1) > a")).toBeVisible();
  await expect(page.locator("li:nth-child(2) > a")).toBeVisible();
  await expect(page.locator("li:nth-child(3) > a")).toBeVisible();
  await expect(page.locator("li:nth-child(4) > a")).toBeVisible();
  await expect(page.locator("li:nth-child(5) > a")).toBeVisible();
  await expect(page.locator("li:nth-child(6) > a")).toBeVisible();
  await expect(page.locator("li:nth-child(7) > a")).toBeVisible();
  await expect(page.locator("li:nth-child(8) > a")).toBeVisible();
  await expect(page.locator("li:nth-child(9) > a")).toBeVisible();
  await expect(page.locator("li:nth-child(10) > a")).toBeVisible();
});
