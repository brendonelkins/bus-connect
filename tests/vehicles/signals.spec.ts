import { test, expect } from "@playwright/test";

test("confirm signal functionality", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("button", { name: "Vehicles" })).toBeVisible();
  await page.getByRole("button", { name: "Vehicles" }).click();

  await expect(page.locator('h3[data-om="fleet-name"]')).toBeVisible();
  await page.locator("tr.content-row").first().click();

  await expect(page.getByRole("button", { name: "Signals" })).toBeVisible();
  await page.getByRole("button", { name: "Signals" }).click();

  const signalDashboard = page.locator("dashboard-asset-signals");
  const searchInput = signalDashboard.locator('input[placeholder="Search"]');
  const rows = page.locator("tr.content-row");

  await expect(searchInput).toBeVisible();

  const verifySearchResults = async (searchTerm: string) => {
    await searchInput.fill(searchTerm.toLocaleLowerCase());
    await expect(rows.first()).toBeVisible();

    const searchResults = await rows.allTextContents();
    for (const row of searchResults) {
      expect(row.toLowerCase()).toContain(searchTerm.toLowerCase());
    }
  };

  await verifySearchResults("abs");
  await verifySearchResults("sample");
  await verifySearchResults('door')
});
