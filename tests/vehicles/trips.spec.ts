import { test, expect } from "@playwright/test";
import exp from "node:constants";

test("confirm trip information is present", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("i.app-trips")).toBeVisible();
  await page.locator("i.app-trips").click({ force: true });
  await expect(page.locator("form")).toContainText(
    "Daily summaries by vehicle:"
  );
  await expect(page.locator("i.om-icon-flag")).toBeVisible();
  await expect(page.locator("i.om-icon-trips")).toBeVisible();
  await expect(
    page.locator('p-dropdown[formcontrolname="fleetId"]')
  ).toBeVisible();
  await expect(
    page.locator('p-dropdown[formcontrolname="assetId"]')
  ).toBeVisible();
  await expect(
    page.locator('th div.text-nowrap:has-text("Date")')
  ).toBeVisible();
  await expect(
    page.locator('th div.text-nowrap:has-text("Start")')
  ).toBeVisible();
  await expect(
    page.locator('th div.text-nowrap:has-text("End")')
  ).toBeVisible();
  await expect(
    page.locator('th div.text-nowrap:has-text("Initial Mileage")')
  ).toBeVisible();
  await expect(
    page.locator('th div.text-nowrap:has-text("Final Mileage")')
  ).toBeVisible();
  await expect(
    page.locator('th div.text-nowrap:has-text("Distance Driven")')
  ).toBeVisible();
  await expect(
    page.locator('th div.text-nowrap:has-text("Trip Duration")')
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Choose Date" })).toBeVisible();
  await page.getByRole("button", { name: "Choose Date" }).click();
  await page.getByRole("button", { name: "Last week" }).click();
  await page.getByRole("button", { name: "Choose Date" }).click();

  const today = new Date();
  const lastSunday = new Date(today);
  lastSunday.setDate(today.getDate() - today.getDay());
  lastSunday.setDate(lastSunday.getDate() - 1);

  const lastMonday = new Date(lastSunday);
  lastMonday.setDate(lastSunday.getDate() - 6);
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const lastWeekDateRange = `${formatDate(lastMonday)} - ${formatDate(
    lastSunday
  )}`;

  const displayedDateRange = await page
    .locator(".general-data-header")
    .textContent();
  expect(displayedDateRange?.trim()).toContain(lastWeekDateRange);

  const startingMileage = Number(
    (await page.locator("tr td:nth-child(5)").first().innerText()).replace(
      /[^\d]/g,
      ""
    )
  );

  const endingMileage = Number(
    (await page.locator("tr td:nth-child(6)").first().innerText()).replace(
      /[^\d]/g,
      ""
    )
  );

  const mileageTotal = Number(
    (await page.locator("tr td:nth-child(7)").first().innerText()).replace(
      /[^\d]/g,
      ""
    )
  );

  expect(endingMileage - startingMileage).toEqual(mileageTotal);
});
