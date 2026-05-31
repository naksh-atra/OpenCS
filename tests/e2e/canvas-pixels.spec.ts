import { test, expect } from '@playwright/test';
import * as fs from 'fs';

test.describe('Canvas pixel content verification', () => {
  test('Sorting canvas has drawn bars (non-white pixels)', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/topics/sorting');
    await page.waitForSelector('astro-island canvas', { timeout: 15000 });
    await page.waitForTimeout(3000);
    
    const pixelCheck = await page.evaluate(() => {
      const canvases = document.querySelectorAll('canvas');
      for (const canvas of canvases) {
        const ctx = canvas.getContext('2d');
        if (!ctx) continue;
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let nonWhite = 0;
        for (let i = 0; i < data.length; i += 4) {
          if (data[i] < 240 || data[i+1] < 240 || data[i+2] < 240) {
            nonWhite++;
          }
        }
        if (nonWhite > 100) return { canvas: true, nonWhite, w: canvas.width, h: canvas.height };
      }
      return { canvas: false, nonWhite: 0 };
    });
    
    expect(pixelCheck.canvas).toBe(true);
    expect(pixelCheck.nonWhite).toBeGreaterThan(100);
    console.log(`Canvas: ${pixelCheck.w}x${pixelCheck.h}, non-white pixels: ${pixelCheck.nonWhite}`);
  });

  test('BST canvas has drawn content', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/topics/binary-search-tree');
    await page.waitForSelector('astro-island canvas', { timeout: 15000 });
    await page.waitForTimeout(3000);
    
    const result = await page.evaluate(() => {
      const canvases = document.querySelectorAll('canvas');
      for (const canvas of canvases) {
        const ctx = canvas.getContext('2d');
        if (!ctx) continue;
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let nonWhite = 0;
        for (let i = 0; i < data.length; i += 4) {
          if (data[i] < 240 || data[i+1] < 240 || data[i+2] < 240) nonWhite++;
        }
        if (nonWhite > 100) return { found: true, nonWhite };
      }
      return { found: false, nonWhite: 0 };
    });
    
    expect(result.found).toBe(true);
  });

  test('No JS errors on any topic page', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', err => errors.push(err.message));
    
    const allPages = [
      '/OpenCS/', '/OpenCS/topics', '/OpenCS/about',
      '/OpenCS/topics/time-complexity', '/openCS/topics/recursion-tree',
      '/OpenCS/topics/arrays', '/OpenCS/topics/stack-queue',
      '/OpenCS/topics/tree-traversals', '/OpenCS/topics/number-systems',
      '/OpenCS/topics/binary-search-tree', '/OpenCS/topics/bfs-dfs',
      '/OpenCS/topics/shortest-path-mst', '/OpenCS/topics/linked-lists',
      '/OpenCS/topics/sorting', '/OpenCS/topics/graph-representations',
      '/OpenCS/topics/hashing', '/OpenCS/topics/heaps',
      '/OpenCS/topics/expression-parsing', '/OpenCS/topics/cpu-scheduling',
      '/OpenCS/topics/memory-management', '/OpenCS/topics/dynamic-programming',
      '/OpenCS/topics/avl-trees', '/OpenCS/topics/dfa-nfa',
    ];
    
    for (const path of allPages) {
      try {
        await page.goto(`http://localhost:4321${path}`, { timeout: 10000 });
        await page.waitForTimeout(1000);
      } catch (e) {
        // ignore navigation errors
      }
    }
    
    const critical = errors.filter(e => 
      !e.includes('favicon') && 
      !e.includes('ERR_CONNECTION') &&
      !e.includes('404') &&
      !e.includes('net::')
    );
    if (critical.length > 0) {
      console.log('Critical errors:', critical);
    }
    expect(critical).toHaveLength(0);
  });
});
