import { test, expect } from "@playwright/test";

test.skip("confirm trip summary for combustion vehicle", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("i.app-trips")).toBeVisible();
  await page.locator("i.app-trips").click();
  await expect(page.locator("form")).toContainText(
    "Daily summaries by vehicle:"
  );
  await page.locator('p-dropdown[formcontrolname="assetId"]').click();
  await page.getByRole("searchbox").fill("A3001_VCU_5055");
  await expect(page.locator('li[aria-label="A3001_VCU_5055"]')).toBeVisible();
  await page.locator('li[aria-label="A3001_VCU_5055"]').click();
  await page.getByRole("button", { name: "Choose Date" }).click();
  await page.getByRole("button", { name: "Last week" }).click();
  await expect(page.getByText("Date")).toBeVisible();
  await expect(page.getByText("Start", { exact: true })).toBeVisible();
  await expect(page.getByText("End", { exact: true })).toBeVisible();
  await expect(page.getByText("Initial Mileage")).toBeVisible();
  await expect(page.getByText("Final Mileage")).toBeVisible();
  await expect(page.getByText("Distance Driven")).toBeVisible();
  await expect(page.getByText("Trip Duration")).toBeVisible();
});
