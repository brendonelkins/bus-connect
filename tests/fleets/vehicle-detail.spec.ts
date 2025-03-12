import { test, expect } from "../fixtures";

test("confirm vehicle detail", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Vehicles" }).click();
  await page.locator(".icon-bus-any").nth(0).click({ force: true });
  await expect(
    page.getByRole("button", { name: " Go back to fleets" })
  ).toBeVisible();

  await expect(page.locator(".map-marker-title")).toBeVisible();

  await expect(page.locator(".header-container h3")).toBeVisible();

  const vehicleMapMarker = await page.locator(".map-marker-title").innerText();

  const vehicleIdDetail = await page
    .locator(".header-container h3")
    .innerText();

  expect(vehicleMapMarker).toEqual(vehicleIdDetail);
});
