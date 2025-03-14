import { test as base, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

const clients = {
  akia: "f5d0ef48-98af-475e-abd7-53a611de7477",
  busOstschweiz: "bcfb607b-7485-4234-9e3a-9ec2d39cee86",
  karsan: "8d470a83-baa1-4866-9e87-fab59ab2c8f5",
  sti: "3488b051-c0d3-451d-8856-bd2c2a5af6e6",
  zug: "aa7cad56-a659-4834-9d33-0e326b66df5f",
  vbl: "983fa5fe-eb56-4e76-928c-5267f24c5fd7",
};

const dropdownSettings = {
  language: {
    position: 0,
    labelText: "User language",
    expectedOption: "English (US)",
  },
  measurement: {
    position: 1,
    labelText: "System of measurement",
    expectedOption: "Metric",
  },
  weekStart: {
    position: 2,
    labelText: "First day of the week",
    expectedOption: "Sunday",
  },
  dateFormat: {
    position: 3,
    labelText: "Date and time format",
    expectedOption: "European (31.12.2024 14:00)",
  },
  mapStyle: {
    position: 4,
    labelText: "Default map style",
    expectedOption: "Not set",
  },
  mapArea: {
    position: 5,
    labelText: "Custom map area",
    expectedOption: "Not set",
  },
};

export const test = base.extend<{
  resetSetting: (clientName: string, settingType: string) => Promise<void>;
  visitSettings: () => Promise<void>;
  openMenu: () => Promise<void>;
}>({
  resetSetting: async ({ page }, use) => {
    await use(async (clientName: string, settingType: string) => {
      await page.goto(`/${clients[clientName]}/user-settings/edit`);

      const dropdown = page
        .locator("label")
        .nth(dropdownSettings[settingType].position)
        .locator("xpath=following-sibling::p-dropdown");

      const selectedValue = await dropdown
        .locator("span.p-dropdown-label")
        .getAttribute("aria-label");

      if (selectedValue !== dropdownSettings[settingType].expectedOption) {
        await dropdown.locator(".p-dropdown-trigger").click();
        await page
          .getByRole("option", {
            name: dropdownSettings[settingType].expectedOption,
          })
          .click();
        await page
          .locator('p-button[icon="pi pi-save"]')
          .locator("button")
          .click();
        await page.waitForURL("**/all-assets-fleet");
      }
    });
  },
  visitSettings: async ({ page }, use) => {},

  openMenu: async ({ page }, use) => {
    await use(async () => {
      const fleetsPanel = page.locator(".left-collapsible-panel");

      await expect(fleetsPanel).toBeAttached();

      const fleetPanelStyle = await fleetsPanel.getAttribute("style");

      if (fleetPanelStyle !== "visibility: visible;") {
        await page.locator(".om-icon-arrowhead-forward").click();
      }
    });
  },
});

export { expect };
