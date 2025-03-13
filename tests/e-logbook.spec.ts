import { test, expect } from "@playwright/test";

test("confirm e-logbook table headers", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("listitem").locator("nth=1").click();
  await page.waitForURL("**/logbook/summaries");

  const tableHeader = page.locator("thead");
  await expect(tableHeader).toContainText("Date");
  await expect(tableHeader).toContainText("Start");
  await expect(tableHeader).toContainText("End");
  await expect(tableHeader).toContainText("Initial Mileage");
  await expect(tableHeader).toContainText("Final Mileage");
  await expect(tableHeader).toContainText("Distance Driven");
  await expect(tableHeader).toContainText("Trip Duration");
});
