import { test, expect } from '@playwright/test';

test.describe('Visual quality checks', () => {
  
  test('Homepage: hero section exists with proper structure', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/');
    
    // Check hero exists
    const hero = await page.$('.hero, .homepage-hero, section:first-of-type');
    expect(hero).not.toBeNull();
    
    // Check for visual cards section
    const cards = await page.$$('.topic-card, .visual-card');
    expect(cards.length).toBeGreaterThan(0);
    
    // Check for feature cards
    const features = await page.$$('.feature-card');
    expect(features.length).toBeGreaterThan(0);
  });

  test('Homepage: no layout overflow', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/');
    
    const overflow = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
      return {
        bodyScrollWidth: body.scrollWidth,
        bodyClientWidth: body.clientWidth,
        htmlScrollWidth: html.scrollWidth,
        htmlClientWidth: html.clientWidth,
      };
    });
    
    // No horizontal overflow
    expect(overflow.bodyScrollWidth).toBeLessThanOrEqual(overflow.bodyClientWidth + 1);
  });

  test('Topic page: header has styled meta pills', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/topics/time-complexity');
    
    const pills = await page.evaluate(() => {
      const all = document.querySelectorAll('.meta-pill');
      return Array.from(all).map(p => ({
        text: p.textContent,
        className: p.className,
      }));
    });
    
    expect(pills.length).toBeGreaterThan(0);
    
    // Check category pill has distinct styling
    const categoryPill = pills.find(p => p.className.includes('category'));
    expect(categoryPill).toBeDefined();
  });

  test('Topic page: learning objectives section', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/topics/time-complexity');
    
    const objectives = await page.evaluate(() => {
      const section = document.querySelector('.topic-objectives');
      if (!section) return null;
      return {
        heading: section.querySelector('h4')?.textContent,
        items: section.querySelectorAll('li').length,
      };
    });
    
    expect(objectives).not.toBeNull();
    expect(objectives!.items).toBeGreaterThan(0);
  });

  test('Topic page: visualizer section has proper spacing', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/topics/time-complexity');
    await page.waitForTimeout(2000);
    
    const vfSection = await page.evaluate(() => {
      const vf = document.querySelector('[style*="margin"]');
      if (!vf) return null;
      const style = window.getComputedStyle(vf);
      return {
        marginTop: style.marginTop,
        marginBottom: style.marginBottom,
        padding: style.padding,
      };
    });
    
    expect(vfSection).not.toBeNull();
  });

  test('Topics index: filter sidebar works', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/topics');
    
    const filters = await page.evaluate(() => {
      const sidebar = document.querySelector('.topics-sidebar');
      if (!sidebar) return null;
      return {
        groups: sidebar.querySelectorAll('.filter-group').length,
        pills: sidebar.querySelectorAll('.filter-pill').length,
      };
    });
    
    expect(filters).not.toBeNull();
    expect(filters!.groups).toBeGreaterThan(0);
    expect(filters!.pills).toBeGreaterThan(5);
  });

  test('Topics index: topic cards have proper structure', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/topics');
    
    const firstCard = await page.evaluate(() => {
      const card = document.querySelector('.topic-card');
      if (!card) return null;
      return {
        hasHeader: !!card.querySelector('.topic-card-header'),
        hasFooter: !!card.querySelector('.topic-card-footer'),
        pills: card.querySelectorAll('.pill').length,
        title: card.querySelector('h3')?.textContent,
      };
    });
    
    expect(firstCard).not.toBeNull();
    expect(firstCard!.hasHeader).toBe(true);
    expect(firstCard!.hasFooter).toBe(true);
    expect(firstCard!.pills).toBeGreaterThan(0);
    expect(firstCard!.title).toBeTruthy();
  });

  test('Sorting: all control groups render', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/topics/sorting');
    await page.waitForSelector('astro-island', { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    const controls = await page.evaluate(() => ({
      presets: document.querySelectorAll('.sv-presets .sv-btn').length,
      algoBtns: document.querySelectorAll('.sv-algo .sv-btn').length,
      playbackBtns: document.querySelectorAll('.sv-playback .sv-btn').length,
      legend: document.querySelectorAll('.sv-legend-item').length,
    }));
    
    expect(controls.presets).toBeGreaterThan(0);
    expect(controls.algoBtns).toBe(3);
    expect(controls.playbackBtns).toBeGreaterThan(0);
    expect(controls.legend).toBe(3);
  });

  test('Hashing: table renders with correct structure', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/topics/hashing');
    await page.waitForSelector('astro-island', { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    const tableInfo = await page.evaluate(() => ({
      cells: document.querySelectorAll('.hs-cell').length,
      rows: document.querySelectorAll('.hs-row').length,
      emptyCells: document.querySelectorAll('.hs-cell.empty').length,
    }));
    
    expect(tableInfo.cells).toBeGreaterThan(0);
    expect(tableInfo.emptyCells).toBeGreaterThan(0);
  });

  test('No broken images on any page', async ({ page }) => {
    const errors: string[] = [];
    page.on('response', response => {
      if (response.status() >= 400 && response.url().match(/\.(png|jpg|jpeg|gif|svg|webp)/i)) {
        errors.push(`Broken image: ${response.url()} (${response.status()})`);
      }
    });
    
    const pages = [
      '/OpenCS/', '/OpenCS/topics',
      '/OpenCS/topics/time-complexity', '/OpenCS/topics/sorting',
      '/OpenCS/topics/hashing', '/OpenCS/topics/recursion-tree',
    ];
    
    for (const path of pages) {
      await page.goto(`http://localhost:4321${path}`, { timeout: 10000 });
      await page.waitForTimeout(1000);
    }
    
    expect(errors).toHaveLength(0);
  });

  test('All pages: no horizontal scrollbar', async ({ page }) => {
    const pages = [
      '/OpenCS/', '/OpenCS/topics',
      '/OpenCS/topics/time-complexity', '/OpenCS/topics/sorting',
      '/OpenCS/topics/hashing', '/OpenCS/topics/arrays',
    ];
    
    for (const path of pages) {
      await page.goto(`http://localhost:4321${path}`, { timeout: 10000 });
      await page.waitForTimeout(2000);
      
      const overflow = await page.evaluate(() => 
        document.body.scrollWidth > document.body.clientWidth
      );
      expect(overflow).toBe(false);
    }
  });
});
