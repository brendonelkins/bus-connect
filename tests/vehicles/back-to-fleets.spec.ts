import { test, expect } from "@playwright/test";

test("confirm back to fleets button", async ({ page }) => {
  await page.goto("/");

  const fleetLocator = page.locator(".list-item").nth(1);
  const firstFleet = await fleetLocator.innerText();
  await fleetLocator.click();

  const fleetTitleLocator = page.locator('h3[data-om="fleet-name"]');
  await expect(fleetTitleLocator).toBeVisible();
  await expect(fleetTitleLocator).not.toContainText("All Vehicles");

  const fleetTitle = await fleetTitleLocator.innerText();
  const extractedText = fleetTitle.match(/^(.*?)(?=\s*\()/)?.[1]?.trim() || "";

  expect(firstFleet).toEqual(extractedText);

  await page.getByRole("button", { name: "Vehicles" }).click();
  await page.locator(".icon-bus-any").first().click();

  const backButton = page.getByRole("button", { name: " Go back to fleets" });
  await expect(backButton).toBeVisible();
  await backButton.click();

  await expect(fleetTitleLocator).toContainText(extractedText);
});
