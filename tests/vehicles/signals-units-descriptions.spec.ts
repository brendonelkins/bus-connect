import { test, expect } from "@playwright/test";

test("confirm signal units and description", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("button", { name: "Vehicles" })).toBeVisible();
  await page.getByRole("button", { name: "Vehicles" }).click();

  await expect(page.locator('h3[data-om="fleet-name"]')).toBeVisible();
  await page.locator("tr.content-row").first().click();

  await expect(page.getByRole("button", { name: "Signals" })).toBeVisible();

  await page.getByRole("button", { name: "Signals" }).click();

  await page.getByText("Ξ").click();

  const menuItems = await page
    .locator('ul[role="listbox"]')
    .last()
    .locator("li")
    .all();

  for (let item of menuItems) {
    const attributeValue = await item.getAttribute("aria-checked");

    if (attributeValue === "false") {
      await item.click();
    }
  }

  await expect(page.locator("table")).toBeVisible();

  const signalDashboard = page.locator("dashboard-asset-signals");
  const searchInput = signalDashboard.locator('input[placeholder="Search"]');
  const rows = page.locator("tr.content-row");

  await expect(searchInput).toBeVisible();

  const verifySearchResults = async (
    searchTerm: string,
    expectedText: string
  ) => {
    await searchInput.fill(searchTerm.toLocaleLowerCase());
    await expect(rows.first()).toBeVisible();

    const searchResults = await rows.allTextContents();

    for (const row of searchResults) {
      expect(row.toLowerCase()).toContain(searchTerm.toLowerCase());
    }

    const descriptionCells = page.locator("table tr td:nth-child(6)");

    const descriptions = await descriptionCells.textContent();

    expect(descriptions).toContain(expectedText);
  };

  await verifySearchResults(
    "ActlMxAvlblRetPercentTorq",
    "This is the maximum amount of torque that the retarder can immediately deliver. It is the same as the maximum torque"
  );
  await verifySearchResults(
    "ABSFullyOperational",
    "Signal which indicates whether an ABS system is fully operational or whether its functionality is reduced by a defect or by"
  );
  await verifySearchResults(
    "ExhaustSystemHighTempLampCmd",
    "Command to control the exhaust system high temperature lamp. This lamp indicates that the exhaust system"
  );
});
