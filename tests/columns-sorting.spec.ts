import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

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
  await page.waitForTimeout(5000);
  await page.goto("/");
  await page.getByRole("button", { name: "Vehicles" }).click();
  await expect(page.locator("i.icon-bus-any").first()).toBeVisible();

  const columnValues = await page
    .locator("table tbody tr td:nth-child(2)")
    .allTextContents();

  console.log("Raw column values:", columnValues);

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

  const dateValues = columnValues.map(parseDate);

  console.log("Parsed Dates:", dateValues);

  const isSortedAsc = dateValues.every(
    (val, i, arr) => i === 0 || val >= arr[i - 1]
  );
  const isSortedDesc = dateValues.every(
    (val, i, arr) => i === 0 || val <= arr[i - 1]
  );
  console.log(
    isSortedAsc
      ? "Column is sorted in ascending order ⬆️"
      : "Column is sorted in descending order ⬇️"
  );
});
