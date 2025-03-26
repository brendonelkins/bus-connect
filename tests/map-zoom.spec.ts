import { test, expect } from "@playwright/test";

test("confirm map zoom", async ({ page }) => {
  await page.goto("/");

  await page.locator("i.app-trips").click();

  await page.locator("tr").last().click();

  await page.getByRole("button", { name: "Zoom in" }).click();

  await page.getByRole("button", { name: "Zoom in" }).click();

  await page.getByRole("button", { name: "Zoom out" }).click();

  await page.getByRole("button", { name: "Zoom out" }).click();

  await page.getByText("StartFinish+−Hide groups Road").dblclick();

  await page.locator(".map-container ").hover();

  await page.mouse.wheel(500, 0);
});
