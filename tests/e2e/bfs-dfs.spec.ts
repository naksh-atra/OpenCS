import { test, expect } from '@playwright/test';

test.describe('bfs-dfs visualizer', () => {
  test('should render graph and respond to play', async ({ page }) => {
    await page.goto('/topics/bfs-dfs');
    
    // Verify canvas is visible
    const canvas = page.locator('[data-testid="gtv-canvas"] canvas');
    await expect(canvas).toBeVisible();
    
    // Get canvas bounding box
    const bbox = await canvas.boundingBox();
    expect(bbox).not.toBeNull();
    expect(bbox!.width).toBeGreaterThan(100);
    expect(bbox!.height).toBeGreaterThan(100);
    
    // Press Play button
    await page.locator('[data-testid="gtv-play"]').click();
    
    // Wait for state change
    await page.waitForTimeout(1500);
    
    // Legend should still be visible indicating progress
    const legend = page.locator('[data-testid="gtv-legend"]');
    await expect(legend).toBeVisible();
  });
});