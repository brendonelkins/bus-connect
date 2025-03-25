import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

test("confirms the functionality of the inoperative vehicles KPI", async ({
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
    .filter({ hasText: "Inoperative vehicles" })
    .click();

  const allVehiclesHeader = await page.$('h3[data-om="fleet-name"]');
  const activeVehiclesKpi = await page.$$("div.kpi-label h4");

  const headerText = await allVehiclesHeader?.innerText();
  const kpiText = await activeVehiclesKpi[2]?.innerText();

  const headerNumbers = headerText?.match(/\d+/g) ?? [];
  const kpiNumber = kpiText?.match(/\d+/)?.[0];

  const activeVehicleCount = Number(headerNumbers[0]);
  const totalVehicleCount = Number(headerNumbers[1]);
  const kpiPercent = Number(kpiNumber);

  const headerPercent = Math.floor(
    (activeVehicleCount / totalVehicleCount) * 100
  );

  expect(headerPercent).toEqual(kpiPercent);
});
