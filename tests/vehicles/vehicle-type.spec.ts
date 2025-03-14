import { test, expect } from "@playwright/test";

test("confirm vehicle type is shown correctly", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Vehicles" }).click();

  await page.locator("i.icon-bus-any").first().click();

  await expect(page.locator("om-chip", { hasText: "Bus" })).toBeVisible();

  await expect(page.locator("om-chip", { hasText: "Diesel" })).toBeVisible();
});
