import { test, expect } from "../fixtures";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

test("confirm first day of the week settings", async ({
  page,
  resetSetting,
}) => {
  await resetSetting("akia", "weekStart");

  const dropdown = page
    .locator("label")
    .filter({ hasText: "First day of the week" })
    .locator("xpath=following-sibling::p-dropdown");

  await page.getByRole("combobox", { name: "Sunday" }).click({ force: true });

  await page.getByRole("option", { name: "Monday" }).click({ force: true });

  await expect(page.getByRole("combobox", { name: "Monday" })).toBeVisible();

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

  await expect(page.locator("div.data-wrapper").nth(4)).toContainText(
    "First day of the week: Monday"
  );
  await page.getByRole("button", { name: " Edit Data" }).click();
  await page.getByRole("combobox", { name: "Monday" }).click({ force: true });
  await page.getByRole("option", { name: "Sunday" }).click({ force: true });
  await expect(page.getByRole("combobox", { name: "Sunday" })).toBeVisible();
  await page
    .getByRole("button", { name: " Save Changes" })
    .click({ force: true });
  await page.waitForURL("**/all-assets-fleet");
  await page.getByText(username).hover();

  await page
    .getByRole("listitem")
    .filter({ hasText: "User Settings" })
    .click({ force: true });

  await expect(page.locator("div.data-wrapper").nth(4)).toContainText(
    "First day of the week: Sunday"
  );
});
