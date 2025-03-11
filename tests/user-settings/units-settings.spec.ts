import { test, expect } from "../fixtures";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.TEST_USERNAME || "";

test("confirm imperial units option", async ({ page, resetSetting }) => {
  await resetSetting("akia", "measurement");

  await page.getByRole("combobox", { name: "Metric" }).click({ force: true });

  await page
    .getByRole("option", { name: "Imperial" })
    .last()
    .click({ force: true });
  await page
    .getByRole("button", { name: " Save Changes" })
    .click({ force: true });
  await page.waitForURL("**/all-assets-fleet");
  await expect(page.locator(".leaflet-control-scale-line")).toContainText("mi");
  await page.getByText(username).hover();
  await page.getByText("User Settings").click({ force: true });
  await page
    .getByRole("button", { name: " Edit Data" })
    .click({ force: true });
  await page.getByRole("combobox", { name: "Imperial" }).click({ force: true });
  await page.getByRole("option", { name: "Metric" }).click({ force: true });
  await page
    .getByRole("button", { name: " Save Changes" })
    .click({ force: true });
  await page.waitForURL("**/all-assets-fleet");
  await expect(page.locator(".leaflet-control-scale-line")).toContainText("km");
});
