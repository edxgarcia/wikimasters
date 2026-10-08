import { expect, test } from "@playwright/test";

test("Home page loads successfully", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Wikimasters" })).toBeVisible();
});

test("Navbar logo go to home page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Wikimasters" }).click();
  await expect(page).toHaveURL("/");
});

test("Sign in button navigates to signin page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page).toHaveURL("/auth/sign-in");
});

test("Sign Up button navigates to signup page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Sign Up" }).click();
  await expect(page).toHaveURL("/auth/sign-up");
});

test("Protected routes redirect unauthenticated users to sing-in", async ({
  page,
}) => {
  await page.goto("/wiki/1");
  await expect(page).toHaveURL("/auth/sign-in");
});
