import { test, expect } from "@playwright/test";

test("confirm overall vehicle health status", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("i.app-vehicle-health")).toBeVisible();

  await page.locator("i.app-vehicle-health").click();

  await expect(
    page.getByRole("heading", { name: "Vehicle Health" }).first()
  ).toBeVisible();

  await expect(
    page.locator(".vehicle-health-card-type-icon").first()
  ).toBeVisible();

  const vehicleHealth = (healthColor: string) =>
    page.locator(`.color-dot-${healthColor}`).first();

  const vehicleName = async (healthColor: string) =>
    await vehicleHealth(healthColor)
      .locator("..")
      .locator("..")
      .locator("..")
      .locator(".vehicle-health-card-name span")
      .first()
      .innerText();

  await vehicleHealth("green").scrollIntoViewIfNeeded();

  await expect(vehicleHealth("green")).toBeVisible();

  await page.locator("input").fill(await vehicleName("green"));

  await expect(page.locator(".vehicle-health-card")).toHaveCount(1);

  await expect(page.locator(".vehicle-health-card")).toContainText(
    await vehicleName("green")
  );

  await vehicleHealth("green").click();

  const checkHealthIcons = async (healthColor: string) => {
    const healthIcons = await page.locator(".health-icon").all();

    for (let icon of healthIcons) {
      const iconClasses = await icon.getAttribute("class");

      const healthStatus = icon.locator("..").locator(".health-status-label");

      if (iconClasses?.includes("health-icon-green")) {
        await expect(healthStatus).toHaveText("OK");
      } else if (iconClasses?.includes("health-icon-yellow")) {
        await expect(healthStatus).toHaveText("Need to check");
      } else if (iconClasses?.includes("health-icon-red")) {
        await expect(healthStatus).toHaveText("Errors");
      } else {
        expect(
          icon
            .locator("..")
            .locator("..")
            .locator("..")
            .locator("..")
            .locator(".health-status-message")
        ).toHaveText("No data found.");
      }
    }
  };

  await checkHealthIcons("green");

  await page.locator("input").fill("");

  await vehicleHealth("yellow").scrollIntoViewIfNeeded();

  await expect(vehicleHealth("yellow")).toBeVisible();

  await page.locator("input").fill(await vehicleName("yellow"));

  await expect(page.locator(".vehicle-health-card")).toHaveCount(1);

  await expect(page.locator(".vehicle-health-card")).toContainText(
    await vehicleName("yellow")
  );

  await vehicleHealth("yellow").click();

  await checkHealthIcons("yellow");

  await page.locator("input").fill("");

  await vehicleHealth("red").scrollIntoViewIfNeeded();

  await expect(vehicleHealth("red")).toBeVisible();

  await page.locator("input").fill(await vehicleName("red"));

  await expect(page.locator(".vehicle-health-card")).toHaveCount(1);

  await expect(page.locator(".vehicle-health-card")).toContainText(
    await vehicleName("red")
  );

  await vehicleHealth("red").click();

  await checkHealthIcons("red");
});
