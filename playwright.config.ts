import { resolve } from "node:path";
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  webServer: {
    command: "pnpm build && pnpm start -p 4000",
    url: "http://localhost:4000",
    reuseExistingServer: true, //!process.env.CI,
  },
  use: {
    baseURL: "http://localhost:4000",
  },
  projects: [
    {
      name: "public",
      testMatch: "tests/public/**",
    },
    {
      name: "authenticate",
      testMatch: "tests/setup.auth.ts",
    },
    {
      name: "protectedRoutes",
      testMatch: "tests/protected/**",
      use: {
        storageState: resolve("playwright/.auth/user.json"),
      },
      dependencies: ["authenticate"],
    },
  ],
  reporter: [
    ["html", { open: "on-failure", outputFolder: "playwright-report/html" }],
    ["json", { outputFile: "playwright-report/report.json" }],
    ["list"],
  ],
});
