import { test as reset } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

reset("reset user settings", async ({ page }) => {
  const dropdownSettings = [
    { labelText: "User language", expectedOption: "English (US)" },
    { labelText: "System of measurement", expectedOption: "Metric" },
    { labelText: "First day of the week", expectedOption: "Sunday" },
    {
      labelText: "Date and time format",
      expectedOption: "European (31.12.2024 14:00)",
    },
    { labelText: "Default map style", expectedOption: "Not set" },
    { labelText: "Custom map area", expectedOption: "Not set" },
  ];

  await page.goto("/");
  await page.getByText(username).click();
  await page.getByText("User Settings").click();
  await page.getByRole("button", { name: " Edit Data" }).click();

  for (const setting of dropdownSettings) {
    const dropdown = page
      .locator("label")
      .filter({ hasText: setting.labelText })
      .locator("xpath=following-sibling::p-dropdown");

    const selectedValue = await dropdown
      .locator("span.p-dropdown-label")
      .getAttribute("aria-label");

    if (selectedValue !== setting.expectedOption) {
      await dropdown.locator(".p-dropdown-trigger").click();
      await page.getByRole("option", { name: setting.expectedOption }).click();
    }
  }

  await page
    .getByRole("button", { name: " Save Changes" })
    .click({ force: true });
});
