import { test, expect } from "@playwright/test";

test("confirm time selection", async ({ page }) => {
  await page.goto("/");

  await page.locator("i.app-trips").click();

  await page.getByRole("button", { name: "Choose Date" }).click();

  await page.getByText("1", { exact: true }).first().click();

  await page.getByText("4", { exact: true }).first().click();

  const calandarDate = await page.locator("p-calendar input").inputValue();

  const tripDate = await page.locator(".general-data-header ").innerText();

  expect(tripDate).toContain(calandarDate);
});
