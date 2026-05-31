import { test, expect } from '@playwright/test';

test.describe('Deep visualizer verification', () => {
  test('Sorting: canvas has non-trivial size and React mounted', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/topics/sorting');
    
    // Wait for astro-island
    const island = await page.waitForSelector('astro-island', { timeout: 15000 });
    
    // Wait for hydration (ssr attr removed)
    await page.waitForFunction(() => {
      const el = document.querySelector('astro-island');
      return el && !el.hasAttribute('ssr');
    }, { timeout: 10000 });
    
    // Wait for React effects to run
    await page.waitForTimeout(3000);
    
    // Check canvas exists with proper dimensions
    const canvasInfo = await page.evaluate(() => {
      const c = document.querySelector('canvas');
      if (!c) return null;
      return {
        width: c.width,
        height: c.height,
        // Count SVGs/canvas/rendered elements inside the island
        buttons: document.querySelectorAll('.sv-btn').length,
        presets: document.querySelectorAll('.sv-presets .sv-btn').length,
        canvasWrap: document.querySelectorAll('.sv-canvas-wrap').length,
      };
    });
    
    expect(canvasInfo).not.toBeNull();
    expect(canvasInfo!.width).toBe(560);
    expect(canvasInfo!.height).toBe(260);
    expect(canvasInfo!.buttons).toBeGreaterThan(0);
    console.log('Sorting visualizer:', JSON.stringify(canvasInfo));
  });

  test('All topic pages: no critical errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', err => errors.push(err.message));
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    
    const pages = [
      '/OpenCS/topics/time-complexity',
      '/OpenCS/topics/sorting',
      '/OpenCS/topics/hashing',
      '/OpenCS/topics/recursion-tree',
      '/OpenCS/topics/arrays',
      '/OpenCS/topics/binary-search-tree',
      '/OpenCS/topics/bfs-dfs',
      '/OpenCS/topics/shortest-path-mst',
    ];
    
    for (const path of pages) {
      await page.goto(`http://localhost:4321${path}`, { timeout: 10000 });
      await page.waitForTimeout(2000);
    }
    
    const critical = errors.filter(e => 
      !e.includes('favicon') && !e.includes('net::') && !e.includes('ERR_') && !e.includes('404')
    );
    expect(critical).toHaveLength(0);
  });

  test('Homepage has topic cards', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/');
    
    const cardCount = await page.evaluate(() => 
      document.querySelectorAll('.topic-card').length
    );
    expect(cardCount).toBeGreaterThan(0);
    
    // Check meta pills exist in cards
    const pills = await page.evaluate(() => 
      document.querySelectorAll('.topic-card .pill').length
    );
    expect(pills).toBeGreaterThan(0);
  });

  test('Topic page has meta pills', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/topics/time-complexity');
    
    const pills = await page.evaluate(() => 
      document.querySelectorAll('.meta-pill').length
    );
    expect(pills).toBeGreaterThan(0);
    
    // Check specific pills
    const categoryPill = await page.textContent('.meta-pill.category');
    expect(categoryPill).toBeTruthy();
  });
});
