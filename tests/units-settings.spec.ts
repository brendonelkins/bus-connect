import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import { clients } from "./fixtures";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

test("confirm imperial units option", async ({ page }) => {
  await page.goto(`/${clients.akia}/user-settings/edit`);

  const dropdown = page
    .locator("label")
    .filter({ hasText: "System of measurement" })
    .locator("xpath=following-sibling::p-dropdown");

  const selectedValue = await dropdown
    .locator("span.p-dropdown-label")
    .getAttribute("aria-label");

  if (selectedValue !== "Metric") {
    await dropdown.locator(".p-dropdown-trigger").click();
    await page.getByRole("option", { name: "Metric" }).click();
  }

  await dropdown.locator(".p-dropdown-trigger").click();

  await page
    .getByRole("option", { name: "Imperial" })
    .last()
    .click({ force: true });
  await page
    .getByRole("button", { name: " Save Changes" })
    .click({ force: true });
  await page.waitForURL("**/all-assets-fleet", { timeout: 10000 });
  await expect(page.locator(".leaflet-control-scale-line")).toContainText(
    "mi",
    { timeout: 10000 }
  );
  await page.getByText(username).hover();
  await page.getByText("User Settings").click({ force: true });
  await page
    .getByRole("button", { name: " Edit Data" })
    .click({ force: true });
  await page.getByRole("combobox", { name: "Imperial" }).click({ force: true });
  await page.getByRole("option", { name: "Metric" }).click({ force: true });
  await page
    .getByRole("button", { name: " Save Changes" })
    .click({ force: true });
  await page.waitForURL("**/all-assets-fleet", { timeout: 10000 });
  await expect(page.locator(".leaflet-control-scale-line")).toContainText("km");
});
