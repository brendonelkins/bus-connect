import { test, expect } from "@playwright/test";

test("confirm vehicle health search sorting", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("i.app-vehicle-health")).toBeVisible();

  await page.locator("i.app-vehicle-health").click();

  await expect(
    page.getByRole("heading", { name: "Vehicle Health" }).first()
  ).toBeVisible();

  await expect(
    page.locator(".vehicle-health-card-type-icon").first()
  ).toBeVisible();

  const tableValues = page.locator("table span.color-dot");

  const colorClasses = await tableValues.evaluateAll((elements) =>
    elements.map((el) =>
      [...el.classList].find((cls) => cls.startsWith("color-dot-"))
    )
  );

  const expectedOrder = [
    "color-dot-red",
    "color-dot-yellow",
    "color-dot-green",
  ];

  const numericOrder = colorClasses.map((color) =>
    expectedOrder.indexOf(color ?? "")
  );

  const isSorted = numericOrder.every(
    (val, i, arr) => i === 0 || arr[i - 1] <= val
  );

  expect(isSorted).toBe(true);

  await page.locator("input").fill("A5023_VCU_503B");

  await expect(page.locator(".vehicle-health-card ")).toHaveCount(1);

  await expect(page.locator(".vehicle-health-card ")).toContainText(
    "A5023_VCU_503B"
  );
});
