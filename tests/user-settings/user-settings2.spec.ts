import { test, expect } from "@playwright/test";

import dotenv from "dotenv";

dotenv.config();

test.describe.configure({ mode: "serial" });

const username = process.env.TEST_USERNAME || "";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.skip("confirm user settings options", async ({ page }) => {
  await page.goto("/");
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

test.skip("confirm a client's page cannot be accessed by another client", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByText(username).hover();
  await page.getByRole("listitem").filter({ hasText: "Switch Client" }).click();
  await page.getByRole("button", { name: "dropdown trigger" }).click();
  await page.getByRole("option", { name: "VBL" }).click();
  await page.getByRole("button", { name: "Confirm" }).click();
  await page.locator("i.app-custom.ng-star-inserted").click();
  await page
    .locator("iframe")
    .contentFrame()
    .getByTestId("esri-consent-cancel-btn")
    .click();
  await expect(
    page.locator("iframe").contentFrame().getByTestId("visual-container-repeat")
  ).toContainText("Events");
  await page.getByText(username).hover();
  await page.getByRole("listitem").filter({ hasText: "Switch Client" }).click();
  await page.getByRole("button", { name: "dropdown trigger" }).click();
  await page.getByRole("option", { name: "Bus Ostschweiz AG" }).click();
  await page.getByRole("button", { name: "Confirm" }).click();
  await page.locator("i.app-custom.ng-star-inserted").click();
  await expect(
    page.locator("iframe").contentFrame().getByTestId("visual-container-repeat")
  ).toHaveCount(0);
  await page.getByText(username).hover();
  await page.getByRole("listitem").filter({ hasText: "Switch Client" }).click();
  await page.getByRole("button", { name: "dropdown trigger" }).click();
  await page.getByRole("option", { name: "Akia (T)" }).click();
  await page.getByRole("button", { name: "Confirm" }).click();
  await page.locator("i.app-custom.ng-star-inserted").click();
  await expect(
    page.locator("iframe").contentFrame().getByTestId("visual-container-repeat")
  ).toHaveCount(0);
});
