import { test, expect } from '@playwright/test';

test.describe('sorting visualizer', () => {
  test('visual regression: sorting default preset', async ({ page }) => {
    await page.goto('/OpenCS/topics/sorting');
    await page.waitForTimeout(2000);
    await expect(page.locator("main article")).toBeVisible();
  });
});
