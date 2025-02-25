import { test, expect } from "@playwright/test";
import { login, logout } from "./commands.page";
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
  // await expect(page.getByText("User Settings")).toBeVisible();
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
  await expect(page.getByText("Save Changes")).toBeVisible();
  await expect(page.getByText("+").first()).toBeVisible();
  await expect(page.getByText("User language:English (US)")).toBeVisible();
});

test("confirm language settings can be updated", async ({ page }) => {
  await page.getByText(username).hover();
  await page.getByText("User Settings").click();
  await expect(page.getByText("User Settings")).toBeVisible();
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

test("confirm first day of the week settings", async ({ page }) => {
  await page.getByText(username).hover();
  await page.getByText("User Settings").click({ force: true });
  await expect(
    page.locator("om-card-header.user-settings-header")
  ).toBeVisible();
  await expect(page.locator("om-card-body")).toContainText(
    "First day of the week: Sunday"
  );

  await page.getByRole("button", { name: " Edit Data" }).click();
  await page.getByRole("combobox", { name: "Sunday" }).click();
  await page.getByRole("option", { name: "Monday" }).click({ force: true });
  await page
    .getByRole("button", { name: " Save Changes" })
    .click({ force: true });
  await expect(page.getByText("Fleets")).toBeVisible();
  await page.getByText(username).hover();
  await page.getByText("User Settings").click({ force: true });
  await expect(
    page.locator("om-card-header.user-settings-header")
  ).toBeVisible();
  await expect(page.locator("om-card-body")).toContainText(
    "First day of the week: Monday"
  );
  await page.getByRole("button", { name: " Edit Data" }).click();
  await page.getByRole("combobox", { name: "Monday" }).click({ force: true });
  await page.getByRole("option", { name: "Sunday" }).click({ force: true });
  await page
    .getByRole("button", { name: " Save Changes" })
    .click({ force: true });
});

test("confirm imperial units option", async ({ page }) => {
  await page.getByText(username).hover();
  await page.getByText("User Settings").click({ force: true });
  await expect(page.getByText("User Settings")).toBeVisible();
  await page
    .getByRole("button", { name: " Edit Data" })
    .click({ force: true });
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
  await expect(page.locator(".leaflet-control-scale-line")).toContainText(
    "50 km"
  );
});

test("date and time format settings", async ({ page }) => {
  await page.getByText(username).hover();
  await page
    .getByRole("listitem")
    .filter({ hasText: "User Settings" })
    .click({ force: true });

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
    .click({ force: true });
  await expect(
    page.getByRole("combobox", { name: "American (2024-12-31 2:00PM)" })
  ).toBeVisible();

  await page
    .getByRole("button", { name: " Save Changes" })
    .click({ force: true });
  await expect(page.getByText("Fleets")).toBeVisible();

  await page.getByText(username).hover();
  await page
    .getByRole("listitem")
    .filter({ hasText: "User Settings" })
    .click({ force: true });
  // await expect(page.getByRole("img", { name: "user-avatar" })).toBeVisible();
  await expect(page.locator("om-card-body")).toContainText(
    "Date and time format: American"
  );
  await page.getByRole("button", { name: " Edit Data" }).click();
  await page
    .getByRole("combobox", { name: "American (2024-12-31 2:00PM)" })
    .click();
  await page
    .getByRole("option", { name: "European (31.12.2024 14:00)" })
    .click({ force: true });
  await page
    .getByRole("button", { name: " Save Changes" })
    .click({ force: true });
  await expect(page.getByText("Fleets")).toBeVisible();

  await page.getByText(username).hover();
  await page
    .getByRole("listitem")
    .filter({ hasText: "User Settings" })
    .click({ force: true });
  await expect(page.locator("om-card-body")).toContainText(
    "Date and time format: European"
  );
});
