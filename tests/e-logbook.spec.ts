import { test, expect } from "@playwright/test";

test("confirm e-logbook table headers", async ({ page }) => {
  await page.goto("/");
  await page.locator("i.app-trips").click();
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

test("confirm trip summary for combustion vehicle", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("i.app-trips")).toBeVisible();
  await page.locator("i.app-trips").click();

  await expect(page.locator("form")).toBeVisible();

  await expect(page.locator("form")).toContainText(
    "Daily summaries by vehicle:"
  );
  await page.locator('p-dropdown[formcontrolname="assetId"]').click();
  await page.getByRole("searchbox").fill("A3001_VCU_5055");
  await expect(page.locator('li[aria-label="A3001_VCU_5055"]')).toBeVisible();
  await page.locator('li[aria-label="A3001_VCU_5055"]').click();
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

test("confirm trip summary for electric vehicle", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("i.app-trips")).toBeVisible();
  await page.locator("i.app-trips").click();

  await expect(page.locator("form")).toBeVisible();

  await expect(page.locator("form")).toContainText(
    "Daily summaries by vehicle:"
  );
  await page.locator('p-dropdown[formcontrolname="assetId"]').click();
  await page.getByRole("searchbox").fill("NR9LF12E5S0251003_VCU_59A9");
  await expect(
    page.locator('li[aria-label="NR9LF12E5S0251003_VCU_59A9"]')
  ).toBeVisible();
  await page.locator('li[aria-label="NR9LF12E5S0251003_VCU_59A9"]').click();
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
