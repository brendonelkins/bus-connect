import { test, expect } from "@playwright/test";

test("confirm about section", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("i.app-help.ng-star-inserted")).toBeVisible();

  await page.locator("i.app-help.ng-star-inserted").click({ force: true });

  await expect(
    page.getByRole("button", { name: "Getting started" })
  ).toBeVisible({ timeout: 10000 });

  await expect(page.getByRole("button", { name: "Live View" })).toBeVisible();

  await expect(page.getByRole("button", { name: "E-Logbook" })).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Consumption Monitor" })
  ).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Profi Driver" })
  ).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Digitacho Download" })
  ).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Vehicle Inspector" })
  ).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Signal history" })
  ).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Custom Analytics" })
  ).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Configuration Services" })
  ).toBeVisible();

  await expect(page.getByRole("button", { name: "About" })).toBeVisible();

  await expect(page.locator("h2#help\\/about")).toContainText("About");

  await expect(page.locator("help-about")).toContainText(
    "Intelligent Connectivity ZF's vision is to build the next generation of mobility that is clean, safe, comfortable, and affordable for everyone, everywhere. Open for a New World ZF's mission for clean and safe mobility - automated, convenient, and affordable, for everyone and everywhere. Our vehicle connectivity platforms are leveraging latest-stage technologies to provide valuable insights for vehicle manufacturers, fleet operators and maintenance service providers. We combine ZF's unique vehicle knowledge with modern means of IT to raise efficiency, safety and sustainability for our clients."
  );
});
