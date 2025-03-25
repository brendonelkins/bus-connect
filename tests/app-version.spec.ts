import { test, expect } from "@playwright/test";

test("confirm the app version is shown", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#main-footer")).toContainText(
    "Application version:"
  );
});
