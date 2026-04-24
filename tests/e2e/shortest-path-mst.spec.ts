import { test, expect } from '@playwright/test';

test.describe('shortest-path-mst visualizer', () => {
  test('should render graph and change state on play', async ({ page }) => {
    await page.goto('/topics/shortest-path-mst');
    
    // Verify canvas is visible with valid bounding box
    const canvas = page.locator('[data-testid="spmv-canvas"] canvas');
    await expect(canvas).toBeVisible();
    
    const bbox = await canvas.boundingBox();
    expect(bbox).not.toBeNull();
    expect(bbox!.width).toBeGreaterThan(100);
    expect(bbox!.height).toBeGreaterThan(100);
    
    // Verify legend is visible
    const legend = page.locator('[data-testid="spmv-legend"]');
    await expect(legend).toBeVisible();
    
    // Get initial message
    const initialMessage = await page.locator('[data-testid="vf-description"]').textContent();
    
    // Press Play button
    await page.locator('[data-testid="spmv-play"]').click();
    
    // Wait for animation to progress
    await page.waitForTimeout(1000);
    
    // Message should have changed
    const currentMessage = await page.locator('[data-testid="vf-description"]').textContent();
    expect(currentMessage).not.toBe(initialMessage);
    
    // Legend should still be visible
    await expect(legend).toBeVisible();
  });
});