import { test, expect } from "@playwright/test";

const username = process.env.TEST_USERNAME || "";
const password = process.env.TEST_PASSWORD || "";

export const login = async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("textbox", { name: "Enter your email, phone, or" })
    .fill(username);
  await page.getByRole("button", { name: "Next" }).click();
  await page.locator("#i0118").fill(password);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.getByRole("button", { name: "Yes" }).click();
  await expect(page).toHaveTitle("ZF Bus Connect");
};

export const logout = async ({ page }) => {
  await page.getByText(username).click();
  await page.getByText("Log out").click();
  await expect(page.getByRole("heading")).toContainText("Pick an account");
};
