import { test, expect } from '@playwright/test';

test.describe('New feature tests', () => {

  // ── Prev/Next navigation ──
  test.describe('Topic prev/next navigation', () => {
    test('Prev/next links appear on topic pages', async ({ page }) => {
      await page.goto('http://localhost:4321/OpenCS/topics/arrays');
      await page.waitForTimeout(1000);

      const nav = await page.$('.topic-nav');
      expect(nav).not.toBeNull();
    });

    test('Next link goes to next topic', async ({ page }) => {
      await page.goto('http://localhost:4321/OpenCS/topics/arrays');
      await page.waitForTimeout(1000);

      const nextLink = await page.$('.topic-nav-next');
      expect(nextLink).not.toBeNull();

      await nextLink!.click();
      await page.waitForTimeout(1000);

      // Should be on a different page
      expect(page.url()).not.toContain('/topics/arrays');
    });

    test('Prev link goes to previous topic', async ({ page }) => {
      await page.goto('http://localhost:4321/OpenCS/topics/arrays');
      await page.waitForTimeout(1000);

      const prevLink = await page.$('.topic-nav-prev');
      if (prevLink) {
        await prevLink.click();
        await page.waitForTimeout(1000);
        expect(page.url()).not.toContain('/topics/arrays');
      }
    });

    test('First topic has no prev link', async ({ page }) => {
      await page.goto('http://localhost:4321/OpenCS/topics/time-complexity');
      await page.waitForTimeout(1000);

      const prevLink = await page.$('.topic-nav-prev');
      // First topic should not have a prev link
      // (or it should be a placeholder div)
      if (prevLink) {
        const href = await prevLink.getAttribute('href');
        expect(href).toBeNull();
      }
    });
  });

  // ── Related topics ──
  test.describe('Related topics', () => {
    test('Related topics section appears', async ({ page }) => {
      await page.goto('http://localhost:4321/OpenCS/topics/arrays');
      await page.waitForTimeout(1000);

      const related = await page.$('.related-topics');
      expect(related).not.toBeNull();
    });

    test('Related topics have links', async ({ page }) => {
      await page.goto('http://localhost:4321/OpenCS/topics/arrays');
      await page.waitForTimeout(1000);

      const cards = await page.$$('.related-card');
      expect(cards.length).toBeGreaterThan(0);
      expect(cards.length).toBeLessThanOrEqual(4);

      // Each card should have a valid href
      for (const card of cards) {
        const href = await card.getAttribute('href');
        expect(href).toContain('/topics/');
      }
    });
  });

  // ── Difficulty bar ──
  test.describe('Difficulty progression bar', () => {
    test('Difficulty bar appears on topic pages', async ({ page }) => {
      await page.goto('http://localhost:4321/OpenCS/topics/arrays');
      await page.waitForTimeout(1000);

      const bar = await page.$('.difficulty-bar');
      expect(bar).not.toBeNull();
    });

    test('Correct difficulty segment is active', async ({ page }) => {
      await page.goto('http://localhost:4321/OpenCS/topics/arrays');
      await page.waitForTimeout(1000);

      const active = await page.evaluate(() => {
        const segments = document.querySelectorAll('.difficulty-segment');
        const activeSeg = document.querySelector('.difficulty-segment.active');
        return {
          total: segments.length,
          activeText: activeSeg?.textContent?.trim(),
        };
      });

      expect(active.total).toBe(3);
      expect(active.activeText).toBe('Beginner');
    });
  });

  // ── 404 page ──
  test.describe('404 page', () => {
    test('404 page shows for invalid routes', async ({ page }) => {
      await page.goto('http://localhost:4321/OpenCS/nonexistent-page');
      await page.waitForTimeout(1000);

      const code = await page.$('.error-code');
      expect(code).not.toBeNull();
      const text = await code!.textContent();
      expect(text).toBe('404');
    });

    test('404 page has topic suggestions', async ({ page }) => {
      await page.goto('http://localhost:4321/OpenCS/nonexistent-page');
      await page.waitForTimeout(1000);

      const topics = await page.$$('.error-topic-card');
      expect(topics.length).toBeGreaterThan(0);
    });

    test('404 page links work', async ({ page }) => {
      await page.goto('http://localhost:4321/OpenCS/nonexistent-page');
      await page.waitForTimeout(1000);

      const homeLink = await page.$('.btn-primary');
      expect(homeLink).not.toBeNull();
      const href = await homeLink!.getAttribute('href');
      expect(href).toBe('/OpenCS/');
    });
  });

  // ── Topic progress tracking ──
  test.describe('Topic progress tracking', () => {
    test('Progress buttons appear on topics index', async ({ page }) => {
      await page.goto('http://localhost:4321/OpenCS/topics');
      await page.waitForTimeout(1000);

      const btns = await page.$$('.topic-progress-btn');
      expect(btns.length).toBeGreaterThan(0);
    });

    test('Clicking progress button toggles completion', async ({ page }) => {
      await page.goto('http://localhost:4321/OpenCS/topics');
      await page.waitForTimeout(1000);

      // Clear any previous state
      await page.evaluate(() => localStorage.removeItem('opencs_visited'));
      await page.reload();
      await page.waitForTimeout(1000);

      const btn = await page.$('.topic-progress-btn');
      expect(btn).not.toBeNull();

      // Initially not completed
      let text = await btn!.textContent();
      expect(text).toBe('○');

      // Click to mark as done
      await btn!.click();
      await page.waitForTimeout(300);

      text = await btn!.textContent();
      expect(text).toBe('✓');

      // Click again to unmark
      await btn!.click();
      await page.waitForTimeout(300);

      text = await btn!.textContent();
      expect(text).toBe('○');
    });
  });
});
