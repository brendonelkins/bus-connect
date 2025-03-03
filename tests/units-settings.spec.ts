import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

test("confirm imperial units option", async ({ page }) => {
  await page.goto("/");
  await page.getByText(username).hover();
  await page.locator("i.om-icon-edit").click({ force: true });
  await page.locator("span", { hasText: "Edit Data" }).click();
  await page.getByRole("combobox", { name: "Metric" }).click({ force: true });
  await page.getByRole("option", { name: "Imperial" }).click({ force: true });
  await page
    .getByRole("button", { name: " Save Changes" })
    .click({ force: true });
  await expect(page.getByText("Fleets")).toBeVisible();
  await expect(page.locator(".leaflet-control-scale-line")).toContainText(
    "mi",
    { timeout: 10000 }
  );
  await page.getByText(username).hover();
  await page.getByText("User Settings").click({ force: true });
  await page.getByRole("button", { name: " Edit Data" }).click();
  await page.getByRole("combobox", { name: "Imperial" }).click({ force: true });
  await page.getByRole("option", { name: "Metric" }).click({ force: true });
  await page
    .getByRole("button", { name: " Save Changes" })
    .click({ force: true });
  await expect(page.getByText("Fleets")).toBeVisible();
  await expect(page.locator(".leaflet-control-scale-line")).toContainText("km");
});
