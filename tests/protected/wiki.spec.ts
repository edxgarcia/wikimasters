import { expect, test } from "@playwright/test";

test("wiki page loads", async ({ page }) => {
  await page.goto("/wiki/1");
  await expect(
    page.getByRole("heading", { name: "Welcome to WikiFlow" }),
  ).toBeVisible();
});
