import { test, expect } from "@playwright/test";
import { login, logout } from "./commands.page";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

test.beforeEach(async ({ page }) => {
  await login({ page });
});

test("default map style settings", async ({ page }) => {
  await page.getByText(username).hover();
  await page.getByRole("listitem").filter({ hasText: "User Settings" }).click();
  await expect(page.getByRole("img", { name: "user-avatar" })).toBeVisible();
  await expect(page.locator("om-card-body")).toContainText(
    "Default map style: Not set"
  );
  await page.getByRole("button", { name: " Edit Data" }).click();
  await page
    .locator("label:has-text('Default map style:')")
    .locator("xpath=following-sibling::*[1]")
    .click();
  await page.getByRole("option", { name: "Road Map" }).click();
  await page.getByRole("button", { name: " Save Changes" }).click();
  await expect(
    page.getByRole("heading", { name: "All Vehicles" })
  ).toBeVisible();
  await page.getByText(username).hover();
  await page.getByRole("listitem").filter({ hasText: "User Settings" }).click();
  await expect(page.getByRole("img", { name: "user-avatar" })).toBeVisible();
  await expect(page.locator("om-card-body")).toContainText(
    "Default map style: Road Map"
  );
  await page.getByRole("button", { name: " Edit Data" }).click();
  await page.getByRole("combobox", { name: "Road Map" }).click();
  await page.getByRole("option", { name: "Not set" }).click();
  await page.getByRole("button", { name: " Save Changes" }).click();
  await expect(
    page.getByRole("heading", { name: "All Vehicles" })
  ).toBeVisible();
  await page.getByText(username).hover();
  await page.getByRole("listitem").filter({ hasText: "User Settings" }).click();
  await expect(page.locator("om-card-body")).toContainText(
    "Default map style: Not set"
  );
});
