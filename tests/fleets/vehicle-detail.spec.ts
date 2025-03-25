import { test, expect } from "../fixtures";

test("confirm vehicle detail", async ({ page, openMenu }) => {
  await page.goto("/");

  await openMenu();

  await page.getByRole("button", { name: "Vehicles" }).click();

  await expect(page.locator(".icon-bus-any").first()).toBeVisible();
  await page.locator(".icon-bus-any").first().click();

  await expect(
    page.getByRole("button", { name: " Go back to fleets" })
  ).toBeVisible();
  await expect(page.locator(".map-marker-title")).toBeVisible();
  await expect(page.locator(".header-container h3")).toBeVisible();

  await expect(page.locator(".map-marker-title")).toHaveText(
    await page.locator(".header-container h3").innerText()
  );
});
