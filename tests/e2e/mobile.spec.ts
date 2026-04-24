import { test, expect } from '@playwright/test';

test.describe('mobile viewport', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('should not have dominating sticky filter', async ({ page }) => {
    await page.goto('/topics');
    
    // Get filter bar position
    const filter = page.locator('.topics-filters');
    await expect(filter).toBeVisible();
    
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 300));
    await page.waitForTimeout(300);
    
    // Filter should be sticky but not cover too much
    const filterBox = await filter.boundingBox();
    expect(filterBox!.height).toBeLessThan(200);
  });
});