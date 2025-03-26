import { test, expect } from "../fixtures";

test("confirm all vehicles fleet contains all vehicles", async ({
  page,
  openMenu,
}) => {
  await page.goto("/");

  await expect(page.locator('h3[data-om="fleet-name"]')).toContainText(
    "All Vehicles"
  );

  await openMenu();

  await expect(
    page.locator('.item-content:has-text("All vehicles")')
  ).toBeVisible();

  await page.locator('.item-content:has-text("All vehicles")').click();

  await expect(
    page.locator(".leaflet-marker-icon.cluster-marker").first()
  ).toBeVisible();

  await expect(page.getByRole("button", { name: "Vehicles" })).toBeVisible();

  await page.getByRole("button", { name: "Vehicles" }).click();

  await page.waitForLoadState("networkidle");

  await expect(
    page.getByRole("columnheader", { name: "Vehicle" })
  ).toBeVisible();
});
