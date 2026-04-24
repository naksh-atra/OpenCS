import { test, expect } from '@playwright/test';

test.describe('shortest-path-mst visualizer', () => {
  test('should render graph and respond to play', async ({ page }) => {
    await page.goto('/topics/shortest-path-mst');
    
    // Verify canvas is visible
    const canvas = page.locator('[data-testid="spmv-canvas"] canvas');
    await expect(canvas).toBeVisible();
    
    // Get canvas bounding box
    const bbox = await canvas.boundingBox();
    expect(bbox).not.toBeNull();
    expect(bbox!.width).toBeGreaterThan(100);
    expect(bbox!.height).toBeGreaterThan(100);
    
    // Press Play button
    await page.locator('[data-testid="spmv-play"]').click();
    
    // Wait for state change
    await page.waitForTimeout(1500);
    
    // Legend should still be visible indicating progress
    const legend = page.locator('[data-testid="spmv-legend"]');
    await expect(legend).toBeVisible();
  });
});