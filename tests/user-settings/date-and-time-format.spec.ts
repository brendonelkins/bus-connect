import { test, expect } from "../fixtures";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

test("date and time format settings", async ({ page, resetSetting }) => {
  await resetSetting("akia", "dateFormat");

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

  await page.waitForURL("**/all-assets-fleet");

  await page.getByText(username).hover();

  await page
    .getByRole("listitem")
    .filter({ hasText: "User Settings" })
    .click({ force: true });

  await page.waitForURL("**/user-settings");

  await expect(page.locator("div.data-wrapper").nth(5)).toContainText(
    "Date and time format: American"
  );

  await page.getByRole("button", { name: " Edit Data" }).click();

  await page
    .getByRole("combobox", { name: "American (2024-12-31 2:00PM)" })
    .click();

  await page
    .getByRole("option", { name: "European (31.12.2024 14:00)" })
    .click({ force: true });

  await expect(
    page.getByRole("combobox", { name: "European (31.12.2024 14:00)" })
  ).toBeVisible();

  await page
    .getByRole("button", { name: " Save Changes" })
    .click({ force: true });

  await page.waitForURL("**/all-assets-fleet");

  await page.getByText(username).hover();

  await page
    .getByRole("listitem")
    .filter({ hasText: "User Settings" })
    .click({ force: true });

  await expect(page.locator("div.data-wrapper").nth(5)).toContainText(
    "Date and time format: European"
  );
});
