import { test, expect } from "@playwright/test";
import { login, logout } from "./commands.page";

test.beforeEach(async ({ page }) => {
  await login({ page });
});

test("confirm e-logbook table headers", async ({ page }) => {
  await page.locator(".app-trips").click();
  await expect(page.locator("thead")).toContainText("Date");
  await expect(page.locator("thead")).toContainText("Start");
  await expect(page.locator("thead")).toContainText("End");
  await expect(page.locator("thead")).toContainText("Initial Mileage");
  await expect(page.locator("thead")).toContainText("Final Mileage");
  await expect(page.locator("thead")).toContainText("Distance Driven");
  await expect(page.locator("thead")).toContainText("Trip Duration");
});
