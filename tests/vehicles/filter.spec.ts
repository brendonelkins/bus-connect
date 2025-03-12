import { test, expect } from "../fixtures";

test("Confirm vehicle filter", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Vehicles" }).click();

  const searchBox = page
    .locator("dashboard-fleet-detail")
    .getByRole("textbox", { name: "Search" });
  await searchBox.click();
  await searchBox.fill("asc");

  const matchingRows = page.locator("tbody tr").filter({ hasText: "ASC" });
  await expect(matchingRows).toHaveCount(1);
});
