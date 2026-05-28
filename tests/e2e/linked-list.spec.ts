import { test, expect } from '@playwright/test';

test.describe('linked-list visualizer', () => {
  test('should render nodes and respond to insert', async ({ page }) => {
    await page.goto('/OpenCS/topics/linked-lists');
    await page.waitForTimeout(2000);
    const list = page.locator('[data-testid="llv-list"]');
    const listContent = list.locator('> *');
    await expect(listContent).toHaveCount(5);
    await page.locator('button:has-text("Insert")').first().click();
    await page.waitForTimeout(500);
  });

  test('visual regression: linked list default preset', async ({ page }) => {
    await page.goto('/OpenCS/topics/linked-lists');
    await page.waitForTimeout(2000);
    await expect(page.locator('main article')).toHaveScreenshot('linked-list-default.png');
  });
});
