import { test, expect } from '@playwright/test';

test.describe('bfs-dfs visualizer', () => {
  test('should render graph and change state on play', async ({ page }) => {
    await page.goto('/topics/bfs-dfs');
    
    // Verify canvas is visible with valid bounding box
    const canvas = page.locator('[data-testid="gtv-canvas"] canvas');
    await expect(canvas).toBeVisible();
    
    const bbox = await canvas.boundingBox();
    expect(bbox).not.toBeNull();
    expect(bbox!.width).toBeGreaterThan(100);
    expect(bbox!.height).toBeGreaterThan(100);
    
    // Verify legend is visible
    const legend = page.locator('[data-testid="gtv-legend"]');
    await expect(legend).toBeVisible();
    
    // Get initial message (should say "Press play to start")
    const initialMessage = await page.locator('[data-testid="vf-description"]').textContent();
    
    // Press Play button
    await page.locator('[data-testid="gtv-play"]').click();
    
    // Wait for animation to progress
    await page.waitForTimeout(1000);
    
    // Message should have changed from initial state (no longer "Press play to start")
    const currentMessage = await page.locator('[data-testid="vf-description"]').textContent();
    expect(currentMessage).not.toBe(initialMessage);
    
    // Legend should still be visible
    await expect(legend).toBeVisible();
  });
});