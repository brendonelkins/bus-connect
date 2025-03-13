import { test, expect } from "@playwright/test";

test("confirm vehicle trips are shown correctly", async ({ page }) => {
  await page.goto("/");

  const vehicleButton = page.getByRole("button", { name: "Vehicles" });

  const firstVehicle = page.locator("i.icon-bus-any").first();

  const vehicleType = page.locator("om-chip", { hasText: "Bus" });

  const propulsionType = page.locator("om-chip", { hasText: "Electric" });

  await vehicleButton.click();

  await firstVehicle.click();

  await expect(vehicleType).toBeVisible();

  await expect(propulsionType).toBeVisible();
});
