import { test, expect } from '@playwright/test';

test.describe('linked-list visualizer', () => {
  test('should render nodes and respond to insert', async ({ page }) => {
    await page.goto('/topics/linked-lists');
    
    // Verify list is visible
    const list = page.locator('[data-testid="llv-list"]');
    await expect(list).toBeVisible();
    
    // Get initial node count
    const nodes = list.locator('.llv-node');
    const initialCount = await nodes.count();
    expect(initialCount).toBeGreaterThan(0);
    
    // Perform insert operation
    const input = page.locator('input[type="number"]');
    await input.fill('99');
    await page.locator('[data-testid="llv-insert"]').click();
    
    // Wait for DOM update
    await page.waitForTimeout(500);
    
    // Node count should increase
    const newNodes = list.locator('.llv-node');
    expect(await newNodes.count()).toBe(initialCount + 1);
  });
});