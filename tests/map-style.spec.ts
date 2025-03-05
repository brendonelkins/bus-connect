import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

test("default map style settings", async ({ page }) => {
  await page.goto("/");
  await page.getByText(username).hover();
  await page
    .getByRole("listitem")
    .filter({ hasText: "User Settings" })
    .click({ force: true });
  await page.waitForURL("**/user-settings", { timeout: 10000 });
  await expect(page.locator("div.data-wrapper").nth(6)).toContainText(
    "Default map style: Not set"
  );
  await page.getByRole("button", { name: " Edit Data" }).click();
  await page
    .locator("label:has-text('Default map style:')")
    .locator("xpath=following-sibling::*[1]")
    .click();
  await page.getByRole("option", { name: "Road Map" }).click({ force: true });
  await page
    .getByRole("button", { name: " Save Changes" })
    .click({ force: true });
  await page.waitForURL("**/all-assets-fleet", { timeout: 10000 });
  await page.getByText(username).hover();
  await page
    .getByRole("listitem")
    .filter({ hasText: "User Settings" })
    .click({ force: true });
  await page.waitForURL("**/user-settings");
  await expect(page.locator("div.data-wrapper").nth(6)).toContainText(
    "Default map style: Road Map"
  );

  await page.getByRole("button", { name: " Edit Data" }).click();
  await page.getByRole("combobox", { name: "Road Map" }).click();
  await page.getByRole("option", { name: "Not set" }).click({ force: true });
  await page
    .getByRole("button", { name: " Save Changes" })
    .click({ force: true });
  await page.waitForURL("**/all-assets-fleet", { timeout: 10000 });
  await page.getByText(username).hover();
  await page
    .getByRole("listitem")
    .filter({ hasText: "User Settings" })
    .click({ force: true });
  await expect(page.locator("div.data-wrapper").nth(6)).toContainText(
    "Default map style: Not set"
  );
});
