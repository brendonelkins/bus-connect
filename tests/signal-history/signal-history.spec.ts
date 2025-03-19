import { test, expect } from "../fixtures";

test("confirm the basics of the signal history functionality", async ({
  page,
}) => {
  //   await page.goto("/f5d0ef48-98af-475e-abd7-53a611de7477/signal-history");

  await page.goto("/");

  await expect(page.locator("i.app-signal-history")).toBeVisible();

  await page.locator("i.app-signal-history").click();

  await page.waitForURL("**/signal-history");

  await expect(page.locator(".header-group > h3")).toContainText(
    "Signal history"
  );

  await expect(page.locator(".header-group i.app-dashboard")).toBeVisible();

  await expect(
    page.getByRole("combobox", { name: "All Vehicles" })
  ).toBeVisible();

  await expect(
    page.getByRole("combobox", { name: "All Vehicles" })
  ).toBeVisible();

  await expect(
    page.getByRole("combobox", { name: "Select a Vehicle" })
  ).toBeVisible();

  await expect(
    page.getByRole("combobox", { name: "Select date" })
  ).toBeVisible();

  await expect(page.locator("calendaricon")).toBeVisible();

  await expect(page.getByRole("button", { name: "Load…" })).toBeVisible();
});

test("confirm the dropdowns contains the correct options", async ({ page }) => {
  await page.goto("/f5d0ef48-98af-475e-abd7-53a611de7477/signal-history");

  await page.getByRole("combobox", { name: "All Vehicles" }).click();

const dropDownValues = page.locator('ul[aria-label="Option List"] > p-dropdownitem > li')

for(const element of await dropDownValues.innerText())
    console.log(element)
});
