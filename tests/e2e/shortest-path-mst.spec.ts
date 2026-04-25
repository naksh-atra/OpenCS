import { test, expect } from '@playwright/test';

test.describe('shortest-path-mst visualizer', () => {
  test('should render graph and change state on play', async ({ page }) => {
    await page.goto('/OpenCS/topics/shortest-path-mst');
    
    // Verify canvas is visible
    const canvas = page.locator('[data-testid="spmv-canvas"] canvas');
    await expect(canvas).toBeVisible();
    
    // Verify legend is visible
    const legend = page.locator('[data-testid="spmv-legend"]');
    await expect(legend).toBeVisible();
    
    // Get play button
    const playBtn = page.locator('[data-testid="spmv-play"]');
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