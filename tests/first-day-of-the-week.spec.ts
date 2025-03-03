import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

test("confirm first day of the week settings", async ({ page }) => {
  await page.goto("/");
  await page.getByText(username).hover();
  await page.getByText("User Settings").click({ force: true });
  await page.waitForURL("**/user-settings", { timeout: 10000 });
  await expect(page.locator("div.data-wrapper").nth(4)).toContainText(
    "First day of the week: Sunday",
    { timeout: 10000 }
  );

  await page.getByRole("button", { name: " Edit Data" }).click();
  await page.getByRole("combobox", { name: "Sunday" }).click();
  await page.getByRole("option", { name: "Monday" }).click({ force: true });
  await page
    .getByRole("button", { name: " Save Changes" })
    .click({ force: true });
  await expect(page.getByText("Fleets")).toBeVisible();
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
});
