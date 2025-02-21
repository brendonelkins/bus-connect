import { test, expect } from "@playwright/test";
import { login, logout } from "./commands.page";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

test.beforeEach(async ({ page }) => {
  await login({ page });
});

test("confirm imperial units option", async ({ page }) => {
  await page.getByText(username).hover();
  await page.getByText("User Settings").click();
  await expect(page.getByText("User Settings")).toBeVisible();
  await page.getByRole("button", { name: " Edit Data" }).click();
  await page.getByRole("combobox", { name: "Metric" }).click();
  await page.getByRole("option", { name: "Imperial" }).click();
  await page.getByRole("button", { name: " Save Changes" }).click();
  await expect(page.locator(".leaflet-control-scale-line")).toContainText(
    "30 mi"
  );
  await page.getByText(username).hover();
  await page.getByText("User Settings").click();
  await page.getByRole("button", { name: " Edit Data" }).click();
  await page
    .locator("#pn_id_20")
    .getByRole("button", { name: "dropdown trigger" })
    .click();
  await page.getByRole("option", { name: "Metric" }).click();
  await page.getByRole("button", { name: " Save Changes" }).click();
  await expect(page.locator(".leaflet-control-scale-line")).toContainText(
    "50 km"
  );
});
