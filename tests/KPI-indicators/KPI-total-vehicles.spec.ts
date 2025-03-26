import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

test("confirms the functionality of the total vehicles KPI", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.locator('h3[data-om="fleet-name"]')).toBeVisible();

  await expect(
    page
      .locator("dashboard-fleet-detail om-card")
      .filter({ hasText: "Total vehicles" })
  ).toBeVisible();

  const allVehiclesHeader = await page.$('h3[data-om="fleet-name"]');
  const totalVehiclesKpi = await page.$("div.kpi-label h4");

  const headerText = await allVehiclesHeader?.innerText();
  const kpiText = await totalVehiclesKpi?.innerText();

  const headerNumber = headerText?.match(/\d+/)?.[0];
  const kpiNumber = kpiText?.match(/\d+/)?.[0];

  await expect(headerNumber).toEqual(kpiNumber);
});
