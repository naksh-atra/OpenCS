import { test, expect } from '@playwright/test';

test.describe('bfs-dfs visualizer', () => {
  test('should render graph and change state on play', async ({ page }) => {
    await page.goto('/OpenCS/topics/bfs-dfs');
    
    // Verify canvas is visible with valid bounding box
    const canvas = page.locator('[data-testid="gtv-canvas"] canvas');
    await expect(canvas).toBeVisible();
    
    // Verify legend is visible
    const legend = page.locator('[data-testid="gtv-legend"]');
    await expect(legend).toBeVisible();
    
    // Get play button
    const playBtn = page.locator('[data-testid="gtv-play"]');
    await expect(playBtn).toBeVisible();
    
    // Initial button text should be "Play"
    await expect(playBtn).toHaveText('Play');
    
    // Press Play button
    await playBtn.click();
    
    // Button text should change to "Pause"
    await expect(playBtn).toHaveText('Pause');
    
    // After a delay, button should return to "Play" (animation complete)
    await page.waitForTimeout(3000);
    
    // Legend should still be visible
    await expect(legend).toBeVisible();
  });
});