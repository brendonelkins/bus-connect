import { test, expect } from "../fixtures";

test("Confirm vehicle filter", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Vehicles" }).click();

  await page
    .locator("dashboard-fleet-detail")
    .getByRole("textbox", { name: "Search" })
    .click();

  await page
    .locator("dashboard-fleet-detail")
    .getByRole("textbox", { name: "Search" })
    .fill("A3018");

  await expect(
    page.locator("tbody tr").filter({ hasText: "A3018" })
  ).toHaveCount(1);
});
