import { test, expect } from "../fixtures";

test("confirm back to fleets button", async ({ page, openMenu }) => {
  await page.goto("/");

  await openMenu();

  await page.locator(".list-item").nth(1).click();

  await expect(page.locator('h3[data-om="fleet-name"]')).toBeVisible();

  await expect(page.locator('h3[data-om="fleet-name"]')).not.toContainText(
    "All Vehicles"
  );

  expect(page.locator('h3[data-om="fleet-name"]')).toContainText(
    await page.locator(".list-item").nth(1).innerText()
  );

  await page.getByRole("button", { name: "Vehicles" }).click();

  await page.locator(".icon-bus-any").first().click();

  await expect(
    page.getByRole("button", { name: " Go back to fleets" })
  ).toBeVisible();

  await page.getByRole("button", { name: " Go back to fleets" }).click();

  expect(page.locator('h3[data-om="fleet-name"]')).toContainText(
    await page.locator(".list-item").nth(1).innerText()
  );
});
