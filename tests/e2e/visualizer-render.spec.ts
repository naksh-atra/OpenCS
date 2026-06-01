import { test, expect } from '@playwright/test';

test.describe('Canvas visualizers render content', () => {
  test('Sorting: canvas element exists after hydration', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/topics/sorting');
    await page.waitForSelector('astro-island canvas', { timeout: 15000 });
    
    const canvasSize = await page.evaluate(() => {
      const c = document.querySelector('canvas');
      return c ? { w: c.width, h: c.height } : null;
    });
    expect(canvasSize).not.toBeNull();
    expect(canvasSize!.w).toBeGreaterThan(0);
    expect(canvasSize!.h).toBeGreaterThan(0);
  });

  test('BST: canvas element exists after hydration', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/topics/binary-search-tree');
    await page.waitForSelector('astro-island canvas', { timeout: 15000 });
    
    const canvasCount = await page.evaluate(() => document.querySelectorAll('canvas').length);
    expect(canvasCount).toBeGreaterThan(0);
  });

  test('Hashing: table/grid renders', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/topics/hashing');
    await page.waitForSelector('astro-island', { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    // Hashing visualizer should have hash table cells
    const cells = await page.evaluate(() => document.querySelectorAll('.hs-cell, .hs-row, [class*="hs-"]').length);
    expect(cells).toBeGreaterThan(0);
  });

  test('Time Complexity: bars render', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/topics/time-complexity');
    await page.waitForSelector('astro-island', { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    const bars = await page.evaluate(() => document.querySelectorAll('.complexity-bar').length);
    expect(bars).toBeGreaterThan(0);
  });

  test('Arrays: array bars render', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/topics/arrays');
    await page.waitForSelector('astro-island', { timeout: 15000 });
    await page.waitForTimeout(2000);

    // Array visualizer should have rendered content
    const hasContent = await page.evaluate(() => {
      const chart = document.querySelector('[data-testid="array-visualizer"]');
      return chart !== null;
    });
    expect(hasContent).toBe(true);
  });
});
