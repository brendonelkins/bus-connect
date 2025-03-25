import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.TEST_USERNAME || "";
const password = process.env.TEST_PASSWORD || "";

test("create login session", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("textbox", { name: "Enter your email, phone, or" })
    .fill(username);
  await page.getByRole("button", { name: "Next" }).click();
  await page.locator("#i0118").fill(password);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.getByRole("button", { name: "Yes" }).click();
  await expect(page).toHaveTitle("ZF Bus Connect");
  await page.context().storageState({ path: ".auth/login.json" });
});
