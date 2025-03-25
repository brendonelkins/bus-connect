import { test, expect } from "@playwright/test";

test("confirm trip summary for electric vehicle", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("i.app-trips")).toBeVisible();
  await page.locator("i.app-trips").click();
  await expect(page.locator("form")).toContainText(
    "Daily summaries by vehicle:"
  );
  await page.locator('p-dropdown[formcontrolname="assetId"]').click();
  await page.getByRole("searchbox").fill("NR9LF12E5S0251003_VCU_59A9");
  await page
    .getByRole("option", { name: "NR9LF12E5S0251003_VCU_59A9" })
    .click();
  await page.getByRole("button", { name: "Choose Date" }).click();
  await page.getByRole("button", { name: "Last week" }).click();
  await expect(page.getByText("Date")).toBeVisible();
  await expect(page.getByText("Start", { exact: true })).toBeVisible();
  await expect(page.getByText("End", { exact: true })).toBeVisible();
  await expect(page.getByText("Initial Mileage")).toBeVisible();
  await expect(page.getByText("Final Mileage")).toBeVisible();
  await expect(page.getByText("Distance Driven")).toBeVisible();
  await expect(page.getByText("Trip Duration")).toBeVisible();
});
