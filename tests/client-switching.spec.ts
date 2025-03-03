import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

test("confirm client can be switched", async ({ page }) => {
  await page.goto("/");
  await page.getByText(username).hover();
  await page
    .getByRole("listitem")
    .filter({ hasText: "Switch Client" })
    .click({ force: true });
  await page
    .getByRole("button", { name: "dropdown trigger" })
    .click({ force: true });
  await page.getByRole("option", { name: "VBL" }).click({ force: true });
  await page.getByRole("button", { name: "Confirm" }).click();
  await expect(page.locator("#main-header")).toContainText("VBL");
  await page.getByText(username).hover();
  await page
    .getByRole("listitem")
    .filter({ hasText: "Switch Client" })
    .click({ force: true });
  await page
    .getByRole("button", { name: "dropdown trigger" })
    .click({ force: true });
  await page.getByRole("option", { name: "Karsan OEM" }).click({ force: true });
  await page.getByRole("button", { name: "Confirm" }).click();
  await expect(page.locator("#main-header")).toContainText("Karsan OEM");
});
