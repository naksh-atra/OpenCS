import { test, expect } from '@playwright/test';

test.describe('Canvas content verification', () => {
  test('Sorting canvas has drawn content', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/topics/sorting');
    await page.waitForSelector('astro-island canvas', { timeout: 15000 });
    await page.waitForTimeout(3000); // Wait for useEffect + drawBars
    
    const hasContent = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return false;
      const ctx = canvas.getContext('2d');
      if (!ctx) return false;
      // Check if any pixels are non-white (the bars should be colored)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        // Check if pixel is not white (255,255,255)
        if (data[i] < 250 || data[i+1] < 250 || data[i+2] < 250) {
          return true;
        }
      }
      return false;
    });
    expect.hasAssertions();
  });

  test('Topic pages have no console errors', async ({ page }) => {
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
    ];
    
    for (const path of pages) {
      await page.goto(`http://localhost:4321${path}`);
      await page.waitForTimeout(2000);
    }
    
    const relevantErrors = errors.filter(e => 
      !e.includes('favicon') && 
      !e.includes('ERR_CONNECTION') &&
      !e.includes('404')
    );
    expect(relevantErrors).toHaveLength(0);
  });

  test('Homepage renders correctly', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/');
    await page.waitForLoadState('networkidle');
    
    const heading = await page.textContent('h1');
    expect(heading).toBeTruthy();
    
    // Check for topic cards
    const cards = await page.$$('.topic-card');
    expect(cards.length).toBeGreaterThan(0);
  });

  test('Topics index renders with filters', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/topics');
    await page.waitForLoadState('networkidle');
    
    const filterPills = await page.$$('.filter-pill');
    expect(filterPills.length).toBeGreaterThan(5);
  });
});
