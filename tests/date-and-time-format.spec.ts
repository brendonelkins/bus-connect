import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import { clients } from "./fixtures";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

test("date and time format settings", async ({ page }) => {
  await page.goto(`/${clients.akia}/user-settings/edit`);

  const dropdown = page
    .locator("label")
    .filter({ hasText: "Date and time format" })
    .locator("xpath=following-sibling::p-dropdown");

  const selectedValue = await dropdown
    .locator("span.p-dropdown-label")
    .getAttribute("aria-label");

  if (selectedValue !== "European (31.12.2024 14:00)") {
    await dropdown.locator(".p-dropdown-trigger").click();

    await page
      .getByRole("option", { name: "European (31.12.2024 14:00)" })
      .click();

    // await page
    //   .getByRole("button", { name: " Save Changes" })
    //   .click({ force: true });

    // await page.waitForURL("**/all-assets-fleet", { timeout: 10000 });

    // await page.getByText(username).hover();

    // await page
    //   .getByRole("listitem")
    //   .filter({ hasText: "User Settings" })
    //   .click({ force: true });

    // await page.waitForURL("**/user-settings", { timeout: 10000 });

    // await page.getByRole("button", { name: " Edit Data" }).click();
  }

  await page
    .getByRole("combobox", { name: "European (31.12.2024 14:00)" })
    .click();

  await page
    .getByRole("option", { name: "American (2024-12-31 2:00PM)" })
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

  await page.waitForURL("**/user-settings", { timeout: 10000 });

  await expect(page.locator("div.data-wrapper").nth(5)).toContainText(
    "Date and time format: American",
    { timeout: 10000 }
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

  await page.waitForURL("**/all-assets-fleet", { timeout: 10000 });

  await page.getByText(username).hover();

  await page
    .getByRole("listitem")
    .filter({ hasText: "User Settings" })
    .click({ force: true });

  await expect(page.locator("div.data-wrapper").nth(5)).toContainText(
    "Date and time format: European",
    { timeout: 10000 }
  );
});
