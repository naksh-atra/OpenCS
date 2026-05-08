import { test, expect } from '@playwright/test';

test.describe('stack-queue visualizer', () => {
  test('should show empty state when data is empty', async ({ page }) => {
    await page.goto('/topics/stack-queue');
    await page.waitForTimeout(1000);
    
    // Click clear all button to empty the stack/queue
    const clearBtn = page.locator('button:has-text("Clear")');
    if (await clearBtn.count() > 0) {
      await clearBtn.click();
      await page.waitForTimeout(500);
    }
    
    // Check for empty indicator - should be styled
    const emptyIndicator = page.locator('.sqv-empty-indicator');
    if (await emptyIndicator.count() > 0) {
      console.log('Empty indicator found');
    }
    
    // Check for VisualizerFrame empty state
    const vfEmpty = page.locator('.vf-empty');
    console.log('vf-empty visible:', await vfEmpty.isVisible().catch(() => false));
  });
});
