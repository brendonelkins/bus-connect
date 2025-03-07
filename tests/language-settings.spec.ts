import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import { clients } from "./fixtures";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

test.skip("confirm language settings can be updated", async ({ page }) => {
  await page.goto(`/${clients.akia}/user-settings/edit`);

  const dropdown = page
    .locator("label")
    .filter({ hasText: "User language" })
    .locator("xpath=following-sibling::p-dropdown");

  const selectedValue = await dropdown
    .locator("span.p-dropdown-label")
    .getAttribute("aria-label");

  if (selectedValue !== "English (US)") {
    await dropdown.locator(".p-dropdown-trigger").click();
    await page.getByRole("option", { name: "English (US)" }).click();
  }
  await page.getByRole("combobox", { name: "English (US)" }).click();
  await page.getByRole("option", { name: "Deutsch" }).click();
  await page.getByRole("button", { name: " Save Changes" }).click();
  // await expect(page.locator("dashboard-fleet-detail")).toContainText(
  //   "Alle Fahrzeuge"
  // );
  await page.waitForURL("**/all-assets-fleet", { timeout: 10000 });
  await page.getByText(username).hover();
  await page.getByText("Benutzereinstellungen").click();

  await expect(page.locator("div.data-wrapper").nth(6)).toContainText(
    "Nutzersprache: Deutsch"
  );
  await page.getByRole("button", { name: " Daten Bearbeiten" }).click();
  await page.getByRole("combobox", { name: "Deutsch" }).click();
  await page.getByRole("option", { name: "English (US)" }).click();
  await page.getByText("Änderungen speichern").click({ force: true });
  await page.getByText(username).hover();
  await page
    .getByRole("listitem")
    .filter({ hasText: "User Settings" })
    .click({ force: true });
  await expect(page.locator("div.data-wrapper").nth(0)).toContainText(
    "User language: English (US)"
  );
});
