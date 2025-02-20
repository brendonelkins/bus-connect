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
  await page.getByRole("button", { name: " Edit Data" }).click();
  await page.getByRole("combobox", { name: "English (US)" }).click();
  await page.getByRole("option", { name: "Deutsch" }).click();
  await expect(
    page.getByRole("button", { name: " Save Changes" })
  ).toBeVisible();
  await page.getByRole("button", { name: " Save Changes" }).click();
  await expect(page.locator("dashboard-fleet-detail")).toContainText(
    "Alle Fahrzeuge"
  );
  await page.getByText("Benutzereinstellungen").click();
  await page.getByRole("button", { name: " Daten Bearbeiten" }).click();
  await page
    .locator("#pn_id_18")
    .getByRole("button", { name: "dropdown trigger" })
    .click();
  await page.getByRole("option", { name: "English (US)" }).click();
  await page.getByRole("button", { name: " Änderungen speichern" }).click();
});
