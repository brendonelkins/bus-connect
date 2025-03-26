import { test, expect } from "./fixtures";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

test("confirms user settings can be updated", async ({
  page,
  resetSetting,
}) => {
  await page.goto("/");

  await page.getByText(username).hover();

  await page.getByRole("listitem").filter({ hasText: "User Settings" }).click();

  await page.waitForURL("**/user-settings");

  await page.getByRole("button", { name: " Edit Data" }).click();

  await page.getByRole("combobox", { name: "Metric" }).click();

  await page.getByRole("option", { name: "Imperial" }).last().click();

  await page.getByRole("combobox", { name: "Sunday" }).click();

  await page.getByRole("option", { name: "Monday" }).click();

  await page
    .getByRole("combobox", { name: "European (31.12.2024 14:00)" })
    .click();

  await page
    .getByRole("option", { name: "American (2024-12-31 2:00PM)" })
    .click();

  await page.getByRole("combobox", { name: "Not set" }).first().click();

  await page.getByRole("option", { name: "Road Map" }).last().click();

  await page.getByRole("button", { name: " Save Changes" }).click();

  await page.waitForURL("**/all-assets-fleet");

  await page.getByText(username).hover();

  await page.getByRole("listitem").filter({ hasText: "User Settings" }).click();

  await page.waitForURL("**/user-settings");

  await expect(page.locator("div.data-wrapper").nth(3)).toContainText(
    "System of measurement: Imperial"
  );

  await expect(page.locator("div.data-wrapper").nth(4)).toContainText(
    "First day of the week: Monday"
  );

  await expect(page.locator("div.data-wrapper").nth(5)).toContainText(
    "Date and time format: American"
  );

  await expect(page.locator("div.data-wrapper").nth(6)).toContainText(
    "Default map style: Road Map"
  );

  await page.getByRole("button", { name: " Edit Data" }).click();

  await page.getByRole("combobox", { name: "Imperial" }).click();

  await page.getByRole("option", { name: "Metric" }).click({ force: true });

  await page.getByRole("combobox", { name: "Monday" }).click();

  await page.getByRole("option", { name: "Sunday" }).click({ force: true });

  await page
    .getByRole("combobox", { name: "American (2024-12-31 2:00PM)" })
    .click();

  await page
    .getByRole("option", { name: "European (31.12.2024 14:00)" })
    .click();

  await page.getByRole("combobox", { name: "Road Map" }).click();

  await page.getByRole("option", { name: "Not set" }).click({ force: true });

  await page.getByRole("button", { name: " Save Changes" }).click();

  await page.waitForURL("**/all-assets-fleet");

  await page.getByText(username).hover();

  await page.getByRole("listitem").filter({ hasText: "User Settings" }).click();

  await expect(page.locator("div.data-wrapper").nth(3)).toContainText(
    "System of measurement: Metric"
  );

  await expect(page.locator("div.data-wrapper").nth(4)).toContainText(
    "First day of the week: Sunday"
  );

  await expect(page.locator("div.data-wrapper").nth(5)).toContainText(
    "Date and time format: European"
  );

  await expect(page.locator("div.data-wrapper").nth(6)).toContainText(
    "Default map style: Not set"
  );
});
