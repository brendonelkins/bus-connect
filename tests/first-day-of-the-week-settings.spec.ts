import { test, expect } from "@playwright/test";
import { login, logout } from "./commands.page";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

test.beforeEach(async ({ page }) => {
  await login({ page });
});

test("confirm first day of the week settings", async ({ page }) => {
  await page.getByText(username).hover();
  await page.getByText("User Settings").click();
  await expect(
    page.locator("om-card-header.user-settings-header")
  ).toBeVisible();
  await page.getByRole("button", { name: " Edit Data" }).click();
  await page.getByRole("combobox", { name: "Sunday" }).click();
  await page.getByRole("option", { name: "Monday" }).click();
  await page.getByRole("button", { name: " Save Changes" }).click();
  await expect(page.getByText("Fleets")).toBeVisible();
  await page.locator("i.app-signal-history.ng-star-inserted").click();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Signal history$/ })
      .nth(2)
  ).toBeVisible();
  await page.getByRole("button", { name: "Choose Date" }).click();

  await expect(
    page.getByRole("columnheader", { name: "Mo" }).first()
  ).toBeVisible();
  await page.getByText(username).hover();
  await page.getByText("User Settings").click();
  await expect(
    page.locator("om-card-header.user-settings-header")
  ).toBeVisible();
  await page.getByRole("button", { name: " Edit Data" }).click();
  await page.getByRole("combobox", { name: "Monday" }).click();
  await page.getByRole("option", { name: "Sunday" }).click();
  await page.getByRole("button", { name: " Save Changes" }).click();
});
