import { test, expect } from "@playwright/test";
import exp from "constants";

test("confirm basic filter functionality", async ({ page }) => {
  await page.goto("/");
  await page.locator("i.app-trips").click();

  await expect(
    page.locator('p-dropdown[formcontrolname="fleetId"]')
  ).toBeVisible();

  await expect(
    page.locator('p-dropdown[formcontrolname="assetId"]')
  ).toBeVisible();

  await expect(page.getByRole("button", { name: "Choose Date" })).toBeVisible();
  await page.getByText("Ξ").click();
  await expect(page.getByLabel("Option List").getByText("Date")).toBeVisible();
  await expect(page.getByLabel("Option List").getByText("Start")).toBeVisible();
  await expect(page.getByLabel("Option List").getByText("End")).toBeVisible();
  await expect(
    page.getByLabel("Option List").getByText("Initial Mileage")
  ).toBeVisible();
  await expect(
    page.getByLabel("Option List").getByText("Final Mileage")
  ).toBeVisible();
  await expect(
    page.getByLabel("Option List").getByText("Distance Driven")
  ).toBeVisible();
  await expect(
    page.getByLabel("Option List").getByText("Trip Duration")
  ).toBeVisible();
  await page.getByText("Ξ").click();
  await expect(page.getByText("Date").first()).toBeVisible();
  await expect(page.getByText("Start").first()).toBeVisible();
  await expect(page.getByText("End").first()).toBeVisible();
  await expect(page.getByText("Initial Mileage").first()).toBeVisible();
  await expect(page.getByText("Final Mileage").first()).toBeVisible();
  await expect(page.getByText("Distance Driven").first()).toBeVisible();
  await expect(page.getByText("Trip Duration").first()).toBeVisible();
  await expect(page.locator(".om-icon-flag").first()).toBeVisible();
  await expect(page.locator(".om-icon-trips").first()).toBeVisible();

  await page.locator('p-dropdown[data-om="fld-fleet-id"]').click();

  await expect(page.locator(".p-dropdown-panel")).toBeVisible();

  await page.locator('p-dropdown[data-om="fld-fleet-id"]').click();

  await page.locator('p-dropdown[data-om="fld-asset-id"]').click();

  await expect(page.locator(".p-dropdown-panel")).toHaveCount(1);

  await expect(page.locator(".p-dropdown-panel")).toBeVisible();

  await page.locator('p-dropdown[data-om="fld-asset-id"]').click();
});
