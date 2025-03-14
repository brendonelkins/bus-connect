import exp from "constants";
import { test, expect } from "../fixtures";

test("confirm about section", async ({ page, openMenu }) => {
  await page.goto("/");

  await openMenu();

  await page.getByRole("button", { name: "Vehicles" }).click();

  await expect(page.locator("i.icon-bus-any.SMALL").first()).toBeVisible();

  await page.locator("i.icon-bus-any.SMALL").first().click();

  await expect(
    page.locator(".large-marker.active.large-marker-undefined")
  ).toBeVisible();

  await openMenu();

  await expect(
    page.locator("om-circled-icon.medium.inactive").first()
  ).toBeVisible();

  await page.locator("om-circled-icon.medium.inactive").first().click();

  await expect(
    page.locator(".large-marker.inactive.large-marker-undefined")
  ).toBeVisible();
});
