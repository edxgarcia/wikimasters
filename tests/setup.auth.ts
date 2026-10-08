import path from "node:path";
import { expect, test as setup } from "@playwright/test";

const authFile = path.resolve("playwright/.auth/user.json");

setup("authenticate", async ({ page }) => {
  await page.goto("/auth/sign-in");

  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByRole("textbox", { name: "Email address" }).click();
  await page
    .getByRole("textbox", { name: "Email address" })
    .fill("test@email.com");
  await page.getByRole("textbox", { name: "Email address" }).press("Tab");
  await page.getByRole("textbox", { name: "Password" }).fill("admin1234");
  await page.getByRole("textbox", { name: "Password" }).press("Enter");

  await expect(
    page.getByRole("button", { name: "Open user menu" }),
  ).toBeVisible();

  await page.context().storageState({ path: authFile });
});
