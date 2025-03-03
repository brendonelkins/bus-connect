import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

test.skip("confirm language settings can be updated", async ({ page }) => {
  await page.goto("/");
  await page.getByText(username).hover();
  await page.getByText("User Settings").click();
  await page
    .getByRole("button", { name: " Edit Data" })
    .click({ force: true });
  await page.getByRole("combobox", { name: "English (US)" }).click();
  await page.getByRole("option", { name: "Deutsch" }).click();
  await page.getByRole("button", { name: " Save Changes" }).click();
  await expect(page.locator("dashboard-fleet-detail")).toContainText(
    "Alle Fahrzeuge"
  );
  await page.getByText(username).hover();
  await page.getByText("Benutzereinstellungen").click();
  await page.getByRole("button", { name: " Daten Bearbeiten" }).click();
  await page.getByRole("combobox", { name: "Deutsch" }).click();
  await page.getByRole("option", { name: "English (US)" }).click();
  await page.getByText("Änderungen speichern").click({ force: true });
});
