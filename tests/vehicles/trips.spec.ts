import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("i.app-trips")).toBeVisible();
  await page.locator("i.app-trips").click();
  await expect(page.locator("form")).toContainText(
    "Daily summaries by vehicle:"
  );
  await expect(
    page.locator('p-dropdown[formcontrolname="fleetId"]')
  ).toBeVisible();
  await expect(
    page.locator('p-dropdown[formcontrolname="assetId"]')
  ).toBeVisible();
  await expect(
    page.locator('th div.text-nowrap:has-text("Date")')
  ).toBeVisible();
  await expect(
    page.locator('th div.text-nowrap:has-text("Start")')
  ).toBeVisible();
  await expect(
    page.locator('th div.text-nowrap:has-text("End")')
  ).toBeVisible();
  await expect(
    page.locator('th div.text-nowrap:has-text("Initial Mileage")')
  ).toBeVisible();
  await expect(
    page.locator('th div.text-nowrap:has-text("Final Mileage")')
  ).toBeVisible();
  await expect(
    page.locator('th div.text-nowrap:has-text("Distance Driven")')
  ).toBeVisible();
  await expect(
    page.locator('th div.text-nowrap:has-text("Trip Duration")')
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Choose Date" })).toBeVisible();
});
