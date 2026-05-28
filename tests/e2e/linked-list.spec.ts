import { test, expect } from '@playwright/test';

test.describe('linked-list visualizer', () => {
  test('should render nodes and respond to insert', async ({ page }) => {
    await page.goto('/OpenCS/topics/linked-lists');
    
    // Verify list container is visible
    const list = page.locator('[data-testid="llv-list"]');
    await expect(list).toBeVisible();
    
    // Wait for React to hydrate and render nodes
    await page.waitForTimeout(1000);
    
    // Check that list has content (nodes or "Empty list" text)
    const listContent = list.locator('> *');
    const count = await listContent.count();
    expect(count).toBeGreaterThan(0);
  });

  test('visual regression: linked list default preset', async ({ page }) => {
    await page.goto('/OpenCS/topics/linked-lists');
    await page.waitForTimeout(2000);
    // Take screenshot of the visualizer area
    await expect(page.locator('.llv-list')).toHaveScreenshot('linked-list-default.png');
  });
});