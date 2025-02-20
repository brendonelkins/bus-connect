import { test, expect } from "@playwright/test";
import { login, logout } from "./commands.page";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.TEST_USERNAME;

test.beforeEach(async ({ page }) => {
  await login({ page });
});

test.afterEach(async ({ page }) => {
  await logout({ page });
});

test("confirm user settings options", async ({ page }) => {
  await page.getByText(username).hover();
  await page.getByText("User Settings").click();
  await expect(page.getByText("User Settings")).toBeVisible();
  await expect(page.getByRole("img", { name: "user-avatar" })).toBeVisible();
  await expect(page.locator("om-card-body")).toContainText(
    "brendonchristopher.elkins@zf.com"
  );
  await expect(page.locator("om-card-body")).toContainText(
    "System of measurement: Metric"
  );
  await expect(page.locator("om-card-body")).toContainText(
    "First day of the week: Sunday"
  );
  await expect(page.locator("om-card-body")).toContainText(
    "Date and time format: European"
  );
  await expect(page.locator("om-card-body")).toContainText(
    "Default map style: Not set"
  );
  await expect(page.locator("om-card-body")).toContainText(
    "Shown on map: Names, Zones, Groups"
  );
  await expect(page.locator("om-card-body")).toContainText(
    "Custom map area:Not set"
  );
  await expect(page.locator("om-card-body")).toContainText(
    "Color theme: Custom colors"
  );
  await page.getByRole("button", { name: " Edit Data" }).click();
  await expect(page.getByRole("button", { name: "Cancel" })).toBeVisible();
  //   await expect(page.getByText('CancelSave Changes')).toBeVisible();
  await expect(page.getByText("Save Changes")).toBeVisible();
  await expect(page.getByText("+").first()).toBeVisible();
  await expect(page.getByText("User language:English (US)")).toBeVisible();
});
