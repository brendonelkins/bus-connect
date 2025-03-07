import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import { clients } from "./fixtures";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

test("default map style settings", async ({ page }) => {
  await page.goto(`/${clients.akia}/user-settings/edit`);

  const dropdown = page
    .locator("label")
    .filter({ hasText: "Default map style" })
    .locator("xpath=following-sibling::p-dropdown");

  const selectedValue = await dropdown
    .locator("span.p-dropdown-label")
    .getAttribute("aria-label");

  if (selectedValue !== "Not set") {
    await dropdown.locator(".p-dropdown-trigger").click();
    await page.getByRole("option", { name: "Not set" }).click();
  }

  await dropdown.locator(".p-dropdown-trigger").click();
  await page
    .getByRole("option", { name: "Road Map" })
    .last()
    .click({ force: true });

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

  await page
    .getByRole("button", { name: " Edit Data" })
    .click({ force: true });
  await dropdown.locator(".p-dropdown-trigger").click();
  await page
    .getByRole("option", { name: "Not set" })
    .last()
    .click({ force: true });
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
