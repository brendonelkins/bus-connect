import { test, expect } from "@playwright/test";
import { login, logout } from "./commands.page";

test.beforeEach(async ({ page }) => {
  await login({ page });
});

test.afterEach(async ({ page }) => {
  await logout({ page });
});

test("confirm live view filter options", async ({ page }) => {
  await expect(
    page
      .locator("dashboard-fleet-detail om-card")
      .filter({ hasText: "Total vehicles" })
  ).toBeVisible();
  await expect(
    page
      .locator("dashboard-fleet-detail om-card")
      .filter({ hasText: "Active vehicles" })
  ).toBeVisible();
  await expect(
    page
      .locator("dashboard-fleet-detail om-card")
      .filter({ hasText: "Inoperative vehicles" })
  ).toBeVisible();
  await expect(
    page
      .locator("dashboard-fleet-detail om-card")
      .filter({ hasText: "Critical speed" })
  ).toBeVisible();
  await expect(
    page
      .locator("dashboard-fleet-detail om-card")
      .filter({ hasText: "Critical state of charge" })
  ).toBeVisible();
  await expect(
    page
      .locator("dashboard-fleet-detail om-card")
      .filter({ hasText: "Charging vehicles" })
  ).toBeVisible();
  await expect(
    page
      .locator("dashboard-fleet-detail om-card")
      .filter({ hasText: "Vehicle errors" })
  ).toBeVisible();
  await expect(
    page
      .locator("dashboard-fleet-detail om-card")
      .filter({ hasText: "Total CO2 saved" })
  ).toBeVisible();
});
