import { test, expect } from '@playwright/test';

test.describe('bfs-dfs visualizer', () => {
  test('should change play state on click', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push(err.message));
    
    // Use dev server on port 4321 which handles /OpenCS base
    await page.goto('/OpenCS/topics/bfs-dfs/');
    await page.waitForTimeout(2000);
    
    const playBtn = page.locator('[data-testid="gtv-play"]');
    await expect(playBtn).toBeVisible({ timeout: 10000 });
    await expect(playBtn).toHaveText('Play');
    
    await playBtn.click();
    await page.waitForTimeout(500);
    
    await expect(playBtn).toHaveText('Pause');
  });
});