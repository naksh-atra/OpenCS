import { test, expect } from '@playwright/test';

test('should find any visualizer wrapper', async ({ page }) => {
  await page.goto('/OpenCS/topics/bfs-dfs');
  await page.waitForTimeout(3000);
  
  // Look for any element with 'gtv' class prefix
  const gtv = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('[class*="gtv"]')).map(el => el.className);
  });
  
  console.log('Found gtv elements:', gtv);
  
  // Check for canvas with data-testid
  const canvas = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('[data-testid]')).map(el => el.getAttribute('data-testid'));
  });
  console.log('Data testids:', canvas);
  
  // Check for any canvas
  const allCanvas = await page.locator('canvas').count();
  console.log('Canvas count:', allCanvas);
});