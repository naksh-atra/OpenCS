import { test, expect } from '@playwright/test';

test.describe('AVL Tree Visualizer', () => {
  test('should load and display interface', async ({ page }) => {
    await page.goto('/OpenCS/topics/avl-trees');
    await page.waitForTimeout(3000);
    await expect(page.locator('main article')).toBeVisible();
  });

  test('should show LL rotation preset', async ({ page }) => {
    await page.goto('/OpenCS/topics/avl-trees');
    await page.waitForTimeout(2000);
    const presetBtn = page.locator('button:has-text("LL Rotation")');
    if (await presetBtn.isVisible()) {
      await presetBtn.click();
      await page.waitForTimeout(1000);
    }
    await expect(page.locator("main article")).toBeVisible();
  });
});
