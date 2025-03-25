import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

test("confirms the functionality of the vehicle errors KPI", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.locator('h3[data-om="fleet-name"]')).toBeVisible();

  await expect(
    page
      .locator("dashboard-fleet-detail om-card")
      .filter({ hasText: "Active vehicles" })
  ).toBeVisible();

  await page
    .locator("dashboard-fleet-detail om-card")
    .filter({ hasText: "Vehicle errors" })
    .click();

  const allVehiclesHeader = await page.$('h3[data-om="fleet-name"]');
  const activeVehiclesKpi = await page.$$("div.kpi-label h4");

  const headerText = await allVehiclesHeader?.innerText();
  const kpiText = await activeVehiclesKpi[6]?.innerText();

  const headerNumbers = headerText?.match(/\d+/g) ?? [];
  const kpiNumber = Number(kpiText?.match(/\d+/)?.[0]);

  const chargingVehiclesHeader = Number(headerNumbers[0]);

  await expect(chargingVehiclesHeader).toEqual(kpiNumber);
});
