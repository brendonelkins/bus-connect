import { test as logout, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

logout("logout of the current session", async ({ page }) => {
  await page.goto("/");
  await page.getByText(username).click();
  await page.getByText("Log out").click({ force: true });
  await expect(page.getByRole("heading")).toContainText("Pick an account");
});
