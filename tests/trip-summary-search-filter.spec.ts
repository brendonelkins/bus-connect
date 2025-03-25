import { test, expect } from "@playwright/test";

test("confirm trip summary search filter", async ({ page }) => {
  await page.goto("/");

  await page.locator("i.app-trips").click();

  await expect(
    page.locator('p-dropdown[formcontrolname="fleetId"]')
  ).toBeVisible();

  await expect(page.locator(".p-dropdown-panel")).not.toBeVisible();

  await page.locator('p-dropdown[formcontrolname="fleetId"]').click();

  await expect(page.locator(".p-dropdown-panel")).toBeVisible();

  await page.locator('p-dropdown[formcontrolname="fleetId"]').click();

  await expect(
    page.locator('p-dropdown[formcontrolname="assetId"]')
  ).toBeVisible();

  await expect(page.locator(".p-dropdown-panel")).not.toBeVisible();

  await page.locator('p-dropdown[formcontrolname="assetId"]').click();

  await expect(page.locator(".p-dropdown-panel")).toBeVisible();

  await page.locator('p-dropdown[formcontrolname="assetId"]').click();

  await page
    .locator(".p-dropdown-panel")
    .locator("input")
    .fill("A3001_VCU_5055");

  await expect(page.locator(".general-data-header")).toContainText(
    "A3001_VCU_5055"
  );
});
