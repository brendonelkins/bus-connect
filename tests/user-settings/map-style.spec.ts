import { test, expect } from "../fixtures";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

test("default map style settings", async ({ page, resetSetting }) => {
  await resetSetting("akia", "mapStyle");

  await page.getByRole("combobox", { name: "Not set" }).first().click();
  await page
    .getByRole("option", { name: "Road Map" })
    .last()
    .click({ force: true });

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
  await expect(page.locator("div.data-wrapper").nth(6)).toContainText(
    "Default map style: Road Map"
  );

  await page
    .getByRole("button", { name: " Edit Data" })
    .click({ force: true });
  await page.getByRole("combobox", { name: "Road Map" }).click();
  await page.getByRole("option", { name: "Not set" }).click({ force: true });
  await page
    .getByRole("button", { name: " Save Changes" })
    .click({ force: true });
  await page.waitForURL("**/all-assets-fleet");
  await page.getByText(username).hover();
  await page
    .getByRole("listitem")
    .filter({ hasText: "User Settings" })
    .click({ force: true });
  await expect(page.locator("div.data-wrapper").nth(6)).toContainText(
    "Default map style: Not set"
  );
});
