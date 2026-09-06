import { test, expect, type Page } from "@playwright/test";

import { routeScaffolds } from "../src/config/routes";

/**
 * Route walk over the registry's static pages plus the dashboard group.
 *
 * Mirrors the gap that let runtime crashes ship: every route below is
 * visited end-to-end and must respond 200, render exactly one <h1>, and
 * produce zero page errors or console errors while loading.
 */

const staticRoutes = routeScaffolds
  .filter((route) => route.includeInSitemap)
  .map((route) => route.path);

const dashboardRoutes = routeScaffolds
  .filter((route) => route.section === "dashboard" && !route.path.includes("["))
  .map((route) => route.path);

const routesToWalk = [...new Set([...staticRoutes, ...dashboardRoutes])];

test.setTimeout(120_000);

function collectRuntimeErrors(page: Page) {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });
  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  return { consoleErrors, pageErrors };
}

for (const route of routesToWalk) {
  test(`route walk: ${route} renders 200, one h1, zero runtime errors`, async ({
    page,
  }) => {
    const { consoleErrors, pageErrors } = collectRuntimeErrors(page);

    const response = await page.goto(route, { timeout: 90_000 });

    expect(response, `/${route} must return a response`).not.toBeNull();
    expect(
      response!.status(),
      `${route} must respond with HTTP 200`,
    ).toBe(200);

    const headings = page.getByRole("heading", { level: 1 });
    await expect(headings.first()).toBeVisible();
    expect(
      await headings.count(),
      `${route} must render exactly one <h1>`,
    ).toBe(1);

    expect(
      pageErrors,
      `${route} must not throw client runtime errors`,
    ).toEqual([]);
    expect(
      consoleErrors,
      `${route} must not log console errors`,
    ).toEqual([]);
  });
}
