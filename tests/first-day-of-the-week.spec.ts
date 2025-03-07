import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import { clients } from "./fixtures";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

test("confirm first day of the week settings", async ({ page }) => {
  await page.goto(`/${clients.akia}/user-settings/edit`);

  const dropdown = page
    .locator("label")
    .filter({ hasText: "First day of the week" })
    .locator("xpath=following-sibling::p-dropdown");

  const selectedValue = await dropdown
    .locator("span.p-dropdown-label")
    .getAttribute("aria-label");

  if (selectedValue !== "Sunday") {
    await dropdown.locator(".p-dropdown-trigger").click();

    await page.getByRole("option", { name: "Sunday" }).click();
  }

  await dropdown.locator(".p-dropdown-trigger").click();
  await page.getByRole("option", { name: "Monday" }).click({ force: true });

  await page
    .getByRole("button", { name: " Save Changes" })
    .click({ force: true });

  await page.waitForURL("**/all-assets-fleet", { timeout: 10000 });

  await page.getByText(username).hover();

  await page.getByText("User Settings").click({ force: true });

  await page.waitForURL("**/user-settings");

  await expect(page.locator("div.data-wrapper").nth(4)).toContainText(
    "First day of the week: Monday",
    { timeout: 10000 }
  );
  await page.getByRole("button", { name: " Edit Data" }).click();
  await page.getByRole("combobox", { name: "Monday" }).click({ force: true });
  await page.getByRole("option", { name: "Sunday" }).click({ force: true });
  await page
    .getByRole("button", { name: " Save Changes" })
    .click({ force: true });
  await page.waitForURL("**/all-assets-fleet", { timeout: 10000 });
  await page.getByText(username).hover();

  await page
    .getByRole("listitem")
    .filter({ hasText: "User Settings" })
    .click({ force: true });

  await expect(page.locator("div.data-wrapper").nth(4)).toContainText(
    "First day of the week: Sunday",
    { timeout: 10000 }
  );
});
