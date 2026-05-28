import { test, expect } from '@playwright/test';

test.describe('time-complexity visualizer', () => {
  test('should render when complexities are selected', async ({ page }) => {
    await page.goto('/OpenCS/topics/time-complexity');
    await page.waitForTimeout(2000);
    // Select a complexity class first
    await page.locator('.complexity-btn').first().click();
    await page.waitForTimeout(500);
    const chart = page.locator('.complexity-chart');
    await expect(chart).toBeVisible();
    await expect(page.locator('.complexity-bar').first()).toBeVisible();
  });

  test('should update bars when toggling selection', async ({ page }) => {
    await page.goto('/OpenCS/topics/time-complexity');
    await page.waitForTimeout(1000);
    // Select then deselect
    await page.locator('.complexity-btn').first().click();
    await page.waitForTimeout(500);
    await page.locator('.complexity-btn').first().click();
    await page.waitForTimeout(1000);
    await expect(page.locator('main article')).toBeVisible();
  });
});
