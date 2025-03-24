import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

test("confirm a client's page cannot be accessed by another client", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByText(username).hover();
  await page.getByRole("listitem").filter({ hasText: "Switch Client" }).click();
  await page.getByRole("button", { name: "dropdown trigger" }).click();
  await page.getByRole("option", { name: "VBL" }).click();
  await page.getByRole("button", { name: "Confirm" }).click();
  await page.locator('i.app-custom.ng-star-inserted').click();
  await page.locator('iframe').contentFrame().getByTestId('esri-consent-cancel-btn').click();
  await expect(
    page.locator("iframe").contentFrame().getByTestId("visual-container-repeat")
  ).toContainText("Events");
  await page.getByText(username).hover();
  await page.getByRole("listitem").filter({ hasText: "Switch Client" }).click();
  await page.getByRole("button", { name: "dropdown trigger" }).click();
  await page.getByRole("option", { name: "Bus Ostschweiz AG" }).click();
  await page.getByRole("button", { name: "Confirm" }).click();
  await page.locator('i.app-custom.ng-star-inserted').click();
  await expect(
    page.locator("iframe").contentFrame().getByTestId("visual-container-repeat")
  ).toHaveCount(0)
  await page.getByText(username).hover();
  await page.getByRole("listitem").filter({ hasText: "Switch Client" }).click();
  await page.getByRole("button", { name: "dropdown trigger" }).click();
  await page.getByRole("option", { name: "Akia (T)" }).click();
  await page.getByRole("button", { name: "Confirm" }).click();
  await page.locator('i.app-custom.ng-star-inserted').click();
  await expect(
    page.locator("iframe").contentFrame().getByTestId("visual-container-repeat")
  ).toHaveCount(0)
});
