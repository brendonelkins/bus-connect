import { test, expect } from "@playwright/test";
import { login, logout } from "./commands.page";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

test.beforeEach(async ({ page }) => {
  await login({ page });
});

test("date and time format settings", async ({ page }) => {
  await page.getByText(username).hover();
  await page.getByRole("listitem").filter({ hasText: "User Settings" }).click();

  await expect(page.getByRole("img", { name: "user-avatar" })).toBeVisible();

  await expect(page.locator("om-card-body")).toContainText(
    "Date and time format: European"
  );
  await page.getByRole("button", { name: " Edit Data" }).click();
  await page
    .getByRole("combobox", { name: "European (31.12.2024 14:00)" })
    .click();
  await page
    .getByRole("option", { name: "American (2024-12-31 2:00PM)" })
    .click();
  await page.getByRole("button", { name: " Save Changes" }).click();
  await expect(
    page.getByRole("heading", { name: "All Vehicles" })
  ).toBeVisible();
  await page.getByText(username).hover();
  await page.getByRole("listitem").filter({ hasText: "User Settings" }).click();
  await expect(page.getByRole("img", { name: "user-avatar" })).toBeVisible();
  await expect(page.locator("om-card-body")).toContainText(
    "Date and time format: American"
  );
  await page.getByRole("button", { name: " Edit Data" }).click();
  await page
    .getByRole("combobox", { name: "American (2024-12-31 2:00PM)" })
    .click();
  await page
    .getByRole("option", { name: "European (31.12.2024 14:00)" })
    .click();
  await page.getByRole("button", { name: " Save Changes" }).click();
  await expect(
    page.getByRole("heading", { name: "All Vehicles" })
  ).toBeVisible();

  await page.getByText(username).hover();
  await page.getByRole("listitem").filter({ hasText: "User Settings" }).click();
  await expect(page.locator("om-card-body")).toContainText(
    "Date and time format: European"
  );
});
