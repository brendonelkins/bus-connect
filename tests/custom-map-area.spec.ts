import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

test.skip("confirm custom map area can be set", async ({ page }) => {
  await page.goto("/");
  await page.getByText(username).hover();
  await page.getByText("User Settings").click({ force: true });
  await expect(page.getByRole("img", { name: "user-avatar" })).toBeVisible();

  await expect(page.locator("om-card-body")).toContainText(
    "Custom map area:Not set"
  );
  await page
    .getByRole("button", { name: " Edit Data" })
    .click({ force: true });
  await page.locator('span:has-text("Not set")').last().click({ force: true });
  await page.getByRole("option", { name: "Specified" }).click();
  await page.locator("leaflet-control-zoom-in").click({ force: true });
  await page.locator("leaflet-control-zoom-in").click();
  await page.locator("leaflet-control-zoom-in").click();
  // await page.getByRole("button", { name: "Zoom in" }).click();
  // await page.getByRole("button", { name: "Zoom in" }).click();
  // await page.getByRole("button", { name: "Zoom in" }).click();
  // await page.getByRole("button", { name: "Zoom in" }).click();
  // await expect(page.locator("om-card-body")).toContainText(
  //   "Latitude: 49.747266, Longitude: 13.385395, Zoom level: 3"
  // );
  // await page.getByRole("button", { name: " Save Changes" }).click();
  // await expect(page.getByText("Fleets")).toBeVisible();
  // await page.getByText(username).hover();
  // await page.getByText("User Settings").click({ force: true });
  // await expect(page.locator("om-card-body")).toContainText(
  //   "Custom map area:Specified"
  // );
  // await page.getByRole("button", { name: " Edit Data" }).click();
  // await page
  //   .locator('span:has-text("Specified")')
  //   .last()
  //   .click({ force: true });
  // await page.getByRole("option", { name: "Not set" }).click();
  // await page.getByRole("button", { name: " Save Changes" }).click();
});
