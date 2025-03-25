import { test, expect } from "../fixtures";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

test.skip("confirm language settings can be updated", async ({
  page,
  resetSetting,
}) => {
  await resetSetting("akia", "language");
  await page.getByRole("combobox", { name: "English (US)" }).click();
  await page.getByRole("option", { name: "Deutsch" }).click();
  await page.getByRole("button", { name: " Save Changes" }).click();
  // await expect(page.locator("dashboard-fleet-detail")).toContainText(
  //   "Alle Fahrzeuge"
  // );
  await page.waitForURL("**/all-assets-fleet", { timeout: 10000 });
  await page.getByText(username).hover();
  await page.getByText("Benutzereinstellungen").click();

  await expect(page.locator("div.data-wrapper").nth(2)).toContainText(
    "Nutzersprache: Deutsch"
  );
  await page.getByRole("button", { name: " Daten Bearbeiten" }).click();
  await page.getByRole("combobox", { name: "Deutsch" }).click();
  await page.getByRole("option", { name: "English (US)" }).click();
  await page.getByRole("combobox", { name: "English (US)" }).click();
  await page.getByText("Änderungen speichern").click({ force: true });
  await page.getByText(username).hover();
  await page
    .getByRole("listitem")
    .filter({ hasText: "User Settings" })
    .click({ force: true });
  await expect(page.locator("div.data-wrapper").nth(2)).toContainText(
    "User language: English (US)"
  );
});
