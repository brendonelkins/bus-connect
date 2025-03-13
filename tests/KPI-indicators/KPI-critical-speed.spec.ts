import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

test("confirms the functionality of the critical speed KPI", async ({
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
    .filter({ hasText: "Critical speed" })
    .click();

  const allVehiclesHeader = await page.$('h3[data-om="fleet-name"]');
  const activeVehiclesKpi = await page.$$("div.kpi-label h4");

  const headerText = await allVehiclesHeader?.innerText();
  const kpiText = await activeVehiclesKpi[3]?.innerText();

  const headerNumbers = headerText?.match(/\d+/g) ?? [];
  const kpiNumber = kpiText?.match(/\d+/)?.[0];

  const criticalSpeedHeader = Number(headerNumbers[0]);
  const kpiPercent = Number(kpiNumber);

  expect(criticalSpeedHeader).toEqual(kpiPercent);
});
