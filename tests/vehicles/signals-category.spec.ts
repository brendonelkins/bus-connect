import { test, expect } from "@playwright/test";

test("confirm signal categories", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("button", { name: "Vehicles" })).toBeVisible();
  await page.getByRole("button", { name: "Vehicles" }).click();

  await expect(page.locator('h3[data-om="fleet-name"]')).toBeVisible();
  await page.locator("tr.content-row").first().click();

  await expect(page.getByRole("button", { name: "Signals" })).toBeVisible();
  await page.getByRole("button", { name: "Signals" }).click();

  await expect(page.locator('table')).toBeVisible()

  await page.locator('.p-checkbox-box').first().click()

  await expect(page.locator('span.group-label:has-text("No Group")')).toBeVisible()
});

