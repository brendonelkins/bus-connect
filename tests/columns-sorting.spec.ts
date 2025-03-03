import { test, expect } from "@playwright/test";

test("check columns and sorting in user settings", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Vehicles" }).click();
  await expect(
    page.getByRole("button", { name: " Scan QR code" })
  ).toBeVisible();

  await page.getByText("Ξ").click();
  await expect(
    page.getByText("Vehicle", { exact: true }).first()
  ).toBeVisible();
  await page.getByText("Ξ").click();
  await page.getByText("Ξ").click();
  await expect(
    page.getByRole("columnheader", { name: "Vehicle" })
  ).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Last active" })
  ).toBeVisible();
  await expect(page.getByRole("columnheader", { name: "Name" })).toBeVisible();
  await expect(page.getByRole("columnheader", { name: "Speed" })).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Mileage" })
  ).toBeVisible();

  await page
    .getByRole("columnheader", { name: "Last active" })
    .getByRole("img")
    .click();
  await page.waitForTimeout(2000);

  let columnValues = await page
    .locator("table tbody tr td:nth-child(2)")
    .allTextContents();

  const parseDate = (dateStr) => {
    return new Date(
      dateStr
        .trim()
        .replace(
          /(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2}):(\d{2})/,
          "$3-$2-$1T$4:$5:$6"
        )
    );
  };

  let dateValues = columnValues.map(parseDate);

  let isSortedAsc = dateValues.every(
    (val, i, arr) => i === 0 || val >= arr[i - 1]
  );
  expect(isSortedAsc).toBeTruthy();

  await page
    .getByRole("columnheader", { name: "Last active" })
    .getByRole("img")
    .click();
  await page.waitForTimeout(2000);

  columnValues = await page
    .locator("table tbody tr td:nth-child(2)")
    .allTextContents();

  dateValues = columnValues.map(parseDate);

  let isSortedDesc = dateValues.every(
    (val, i, arr) => i === 0 || val <= arr[i - 1]
  );
  expect(isSortedDesc).toBeTruthy();
});
