import { test, expect } from "@playwright/test";

test("confirm e-logbook table headers", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("listitem").locator("nth=1").click();
  await page.waitForURL("**/logbook/summaries");
  await expect(page.locator("thead")).toContainText("Date");
  await expect(page.locator("thead")).toContainText("Start");
  await expect(page.locator("thead")).toContainText("End");
  await expect(page.locator("thead")).toContainText("Initial Mileage");
  await expect(page.locator("thead")).toContainText("Final Mileage");
  await expect(page.locator("thead")).toContainText("Distance Driven");
  await expect(page.locator("thead")).toContainText("Trip Duration");
});
