import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

test("confirm profile menu options", async ({ page }) => {
  await page.goto("/");
  await page.getByText(username).hover();
  await expect(page.getByText("User settings")).toBeVisible();
  await expect(page.getByText("Switch client")).toBeVisible();
  await expect(page.getByText("Log out")).toBeVisible();
});
