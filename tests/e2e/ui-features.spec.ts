import { test, expect } from '@playwright/test';

test.describe('UI features — comprehensive', () => {

  // ── Scroll progress bar ──
  test.describe('Scroll progress bar', () => {
    test('Progress bar exists on all pages', async ({ page }) => {
      const pages = ['/OpenCS/', '/OpenCS/topics', '/OpenCS/topics/arrays', '/OpenCS/about'];
      for (const path of pages) {
        await page.goto(path);
        await page.waitForTimeout(500);
        const bar = await page.$('.scroll-progress');
        expect(bar).not.toBeNull();
      }
    });

    test('Progress bar width increases on scroll', async ({ page }) => {
      await page.goto('http://localhost:4321/OpenCS/topics/arrays');
      await page.waitForTimeout(1000);

      const initialWidth = await page.evaluate(() =>
        parseFloat(document.querySelector('.scroll-progress')?.style.width || '0')
      );

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);

      const scrolledWidth = await page.evaluate(() =>
        parseFloat(document.querySelector('.scroll-progress')?.style.width || '0')
      );

      expect(scrolledWidth).toBeGreaterThan(initialWidth);
    });
  });

  // ── Breadcrumb navigation ──
  test.describe('Breadcrumb navigation', () => {
    test('Breadcrumb appears on topic pages', async ({ page }) => {
      await page.goto('http://localhost:4321/OpenCS/topics/arrays');
      await page.waitForTimeout(500);
      const breadcrumb = await page.$('.breadcrumb');
      expect(breadcrumb).not.toBeNull();
    });

    test('Breadcrumb has correct structure', async ({ page }) => {
      await page.goto('http://localhost:4321/OpenCS/topics/sorting');
      await page.waitForTimeout(500);

      const links = await page.evaluate(() => {
        const bc = document.querySelector('.breadcrumb');
        if (!bc) return null;
        return {
          home: bc.querySelector('a[href="/OpenCS/"]')?.textContent,
          topics: bc.querySelector('a[href="/OpenCS/topics"]')?.textContent,
          current: bc.querySelector('.breadcrumb-current')?.textContent,
        };
      });

      expect(links).not.toBeNull();
      expect(links!.home).toBe('Home');
      expect(links!.topics).toBe('Topics');
      expect(links!.current).toBeTruthy();
    });

    test('Breadcrumb links are clickable', async ({ page }) => {
      await page.goto('http://localhost:4321/OpenCS/topics/hashing');
      await page.waitForTimeout(500);

      // Click "Topics" breadcrumb
      await page.click('.breadcrumb a[href="/OpenCS/topics"]');
      await page.waitForTimeout(500);
      expect(page.url()).toContain('/topics');
      expect(page.url()).not.toContain('/topics/hashing');
    });
  });

  // ── Footer ──
  test.describe('Footer', () => {
    test('Footer has GitHub link', async ({ page }) => {
      await page.goto('http://localhost:4321/OpenCS/');
      const ghLink = await page.$('.footer-github');
      expect(ghLink).not.toBeNull();

      const href = await ghLink!.getAttribute('href');
      expect(href).toContain('github.com');

      const target = await ghLink!.getAttribute('target');
      expect(target).toBe('_blank');
    });

    test('Footer has build date', async ({ page }) => {
      await page.goto('http://localhost:4321/OpenCS/');
      const date = await page.evaluate(() =>
        document.querySelector('.footer-meta')?.textContent
      );
      expect(date).toBeTruthy();
      expect(date).toContain('Updated');
    });

    test('Footer renders on all pages', async ({ page }) => {
      const pages = ['/OpenCS/', '/OpenCS/topics', '/OpenCS/topics/arrays', '/OpenCS/about', '/OpenCS/roadmap'];
      for (const path of pages) {
        await page.goto(path);
        await page.waitForTimeout(500);
        const footer = await page.$('.footer');
        expect(footer).not.toBeNull();
        const logo = await page.$('.footer-logo');
        expect(logo).not.toBeNull();
      }
    });
  });

  // ── Topics index search ──
  test.describe('Topics search', () => {
    test('Search input exists on topics index', async ({ page }) => {
      await page.goto('http://localhost:4321/OpenCS/topics');
      await page.waitForTimeout(500);
      const search = await page.$('#topicSearch');
      expect(search).not.toBeNull();
    });

    test('Search filters topics by name', async ({ page }) => {
      await page.goto('http://localhost:4321/OpenCS/topics');
      await page.waitForTimeout(500);

      // Get initial count
      const initialCount = await page.evaluate(() =>
        document.querySelectorAll('.topic-card').length
      );
      expect(initialCount).toBeGreaterThan(1);

      // Search for "sorting"
      await page.fill('#topicSearch', 'sorting');
      await page.waitForTimeout(500);

      const afterCount = await page.evaluate(() =>
        Array.from(document.querySelectorAll('.topic-card')).filter(
          c => c.style.display !== 'none'
        ).length
      );
      expect(afterCount).toBeLessThan(initialCount);
    });

    test('Clear button resets search', async ({ page }) => {
      await page.goto('http://localhost:4321/OpenCS/topics');
      await page.waitForTimeout(500);

      await page.fill('#topicSearch', 'xyznonexistent');
      await page.waitForTimeout(500);

      await page.click('#searchClear');
      await page.waitForTimeout(500);

      const allVisible = await page.evaluate(() =>
        Array.from(document.querySelectorAll('.topic-card')).every(
          c => c.style.display !== 'none'
        )
      );
      expect(allVisible).toBe(true);
    });
  });
});
