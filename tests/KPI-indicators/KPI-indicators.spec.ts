import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

test("confirm all KPI indicators are visible", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.locator("span").filter({ hasText: "Total vehicles" })
  ).toBeVisible();
  await expect(
    page.locator("span").filter({ hasText: "Active vehicles" })
  ).toBeVisible();
  await expect(
    page.locator("span").filter({ hasText: "Inoperative vehicles" })
  ).toBeVisible();
  await expect(
    page.locator("span").filter({ hasText: "Critical speed" })
  ).toBeVisible();
  await expect(
    page.locator("span").filter({ hasText: "Critical state of charge" })
  ).toBeVisible();
  await expect(
    page.locator("span").filter({ hasText: "Charging vehicles" })
  ).toBeVisible();
  await expect(
    page.locator("span").filter({ hasText: "Vehicle errors" })
  ).toBeVisible();
  await expect(
    page.locator("span").filter({ hasText: "Total CO2 saved" })
  ).toBeVisible();
});
