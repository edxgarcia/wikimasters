import { defineConfig, devices } from "@playwright/test";

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
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  reporter: [
    ["html", { open: "on-failure", outputFolder: "playwright-report/html" }],
    ["json", { outputFile: "playwright-report/report.json" }],
    ["list"],
  ],
});
