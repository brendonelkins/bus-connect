import { test, expect } from "@playwright/test";
import { login } from "../commands.page.ts";

import dotenv from "dotenv";

dotenv.config();

test.describe.configure({ mode: "serial" });

const username = process.env.TEST_USERNAME || "";

test.beforeEach(async ({ page }) => {
  await login({ page });
});

test("confirm user settings options", async ({ page }) => {
  await page.getByText(username).hover();
  await page.getByText("User Settings").click();
  await expect(
    page.locator("om-card-header.user-settings-header")
  ).toBeVisible();
  await expect(page.locator("om-card-body")).toContainText(username);
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
  await expect(page.getByText("Save Changes")).toBeVisible();
  await expect(page.getByText("+").first()).toBeVisible();
  await expect(page.getByText("User language:English (US)")).toBeVisible();
});

test("confirm language settings can be updated", async ({ page }) => {
  await page.getByText(username).hover();
  await page.getByText("User Settings").click();
  await page.getByRole("button", { name: " Edit Data" }).click();
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

test("confirm imperial units option", async ({ page }) => {
  await page.getByText(username).hover();
  await page.getByText("User Settings").click({ force: true });
  await page.locator("span", { hasText: "Edit Data" }).click();
  await page.getByRole("combobox", { name: "Metric" }).click({ force: true });
  await page.getByRole("option", { name: "Imperial" }).click({ force: true });
  await page
    .getByRole("button", { name: " Save Changes" })
    .click({ force: true });
  await expect(page.getByText("Fleets")).toBeVisible();
  await expect(page.locator(".leaflet-control-scale-line")).toContainText("mi");
  await page.getByText(username).hover();
  await page.getByText("User Settings").click({ force: true });
  await page.getByRole("button", { name: " Edit Data" }).click();
  await page.getByRole("combobox", { name: "Imperial" }).click({ force: true });
  await page.getByRole("option", { name: "Metric" }).click({ force: true });
  await page
    .getByRole("button", { name: " Save Changes" })
    .click({ force: true });
  await expect(page.getByText("Fleets")).toBeVisible();
  await expect(page.locator(".leaflet-control-scale-line")).toContainText("km");
});

test("confirm client can be switched", async ({ page }) => {
  await page.getByText(username).hover();
  await page
    .getByRole("listitem")
    .filter({ hasText: "Switch Client" })
    .click({ force: true });
  await page
    .getByRole("button", { name: "dropdown trigger" })
    .click({ force: true });
  await page.getByRole("option", { name: "VBL" }).click({ force: true });
  await page.getByRole("button", { name: "Confirm" }).click();
  await expect(page.locator("#main-header")).toContainText("VBL");
  await page.getByText(username).hover();
  await page
    .getByRole("listitem")
    .filter({ hasText: "Switch Client" })
    .click({ force: true });
  await page
    .getByRole("button", { name: "dropdown trigger" })
    .click({ force: true });
  await page.getByRole("option", { name: "Karsan OEM" }).click({ force: true });
  await page.getByRole("button", { name: "Confirm" }).click();
  await expect(page.locator("#main-header")).toContainText("Karsan OEM");
});
