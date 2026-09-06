import { expect, test } from '@playwright/test';

import { routeScaffolds } from '../src/config/routes';

const smokeRoutes = routeScaffolds.filter(
  (route) => (route.includeInSitemap || route.section === 'dashboard') && !route.path.includes('['),
);

test.describe('Route smoke tests', () => {
  for (const route of smokeRoutes) {
    test(`${route.path} loads without runtime errors`, async ({ page }) => {
      const runtimeErrors: string[] = [];

      page.on('pageerror', (error) => runtimeErrors.push(`pageerror: ${error.message}`));
      page.on('console', (message) => {
        if (message.type() === 'error') {
          runtimeErrors.push(`console: ${message.text()}`);
        }
      });

      const response = await page.goto(route.path);

      expect(response?.status(), `${route.path} should respond with 200`).toBe(200);
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      expect(runtimeErrors, `${route.path} emitted runtime errors`).toEqual([]);
    });
  }
});
