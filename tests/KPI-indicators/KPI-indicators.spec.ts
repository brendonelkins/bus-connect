import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

test("confirm all KPI indicators are visible", async ({ page }) => {
  await page.goto("/");

  const kpiBadges = page.locator(".kpi-content span");

  await expect(kpiBadges.filter({ hasText: "Total vehicles" })).toBeVisible();

  await expect(kpiBadges.filter({ hasText: "Active vehicles" })).toBeVisible();

  await expect(
    kpiBadges.filter({ hasText: "Inoperative vehicles" })
  ).toBeVisible();

  await expect(kpiBadges.filter({ hasText: "Critical speed" })).toBeVisible();

  await expect(
    kpiBadges.filter({ hasText: "Critical state of charge" })
  ).toBeVisible();

  await expect(
    kpiBadges.filter({ hasText: "Charging vehicles" })
  ).toBeVisible();

  await expect(kpiBadges.filter({ hasText: "Vehicle errors" })).toBeVisible();

  await expect(kpiBadges.filter({ hasText: "Total CO2 saved" })).toBeVisible();
});
