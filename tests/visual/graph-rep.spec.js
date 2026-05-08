import { test, expect } from '@playwright/test';

test.describe('Graph Representations Visualizer', () => {
  test('should load and display interface', async ({ page }) => {
    await page.goto('/OpenCS/topics/graph-representations');
    await page.waitForTimeout(3000);
    await expect(page.locator('main article')).toBeVisible();
  });

  test('should display undirected graph preset', async ({ page }) => {
    await page.goto('/OpenCS/topics/graph-representations');
    await page.waitForTimeout(2000);
    const presetBtn = page.locator('button:has-text("Undirected")').first();
    if (await presetBtn.isVisible()) {
      await presetBtn.click();
      await page.waitForTimeout(1000);
    }
    await expect(page.locator('main article')).toHaveScreenshot('graph-rep-undirected.png');
  });
});
