import { test, expect } from "@playwright/test";
import { login } from "./commands.page";

test.beforeEach(async ({ page }) => {
  await login({ page });
});

test("confirm the app version is shown", async ({ page }) => {
  await expect(page.locator("#main-footer")).toContainText(
    "Application version:"
  );
});
