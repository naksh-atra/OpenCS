import { test, expect } from '@playwright/test';

const BASE = '/OpenCS';

test.describe('Dark mode toggle', () => {
  test('Theme toggle button exists in header', async ({ page }) => {
    await page.goto(`http://localhost:4321${BASE}/`);
    // Wait for React hydration
    await page.waitForTimeout(2000);
    const toggle = await page.$('[data-testid="theme-toggle"]');
    expect(toggle).not.toBeNull();
  });

  test('Clicking toggle switches between light and dark', async ({ page }) => {
    await page.goto(`http://localhost:4321${BASE}/`);
    await page.waitForTimeout(2000);

    // Click toggle to switch to dark
    await page.click('[data-testid="theme-toggle"]');
    await page.waitForTimeout(500);

    const darkBg = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim()
    );
    expect(darkBg).toBe('#0F1419');

    // Click again to go back to light
    await page.click('[data-testid="theme-toggle"]');
    await page.waitForTimeout(500);

    const lightBg = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim()
    );
    expect(lightBg).toBe('#FAF9F6');
  });

  test('Label shows Dark in light mode, Light in dark mode', async ({ page }) => {
    await page.goto(`http://localhost:4321${BASE}/`);
    await page.waitForTimeout(2000);

    const label = await page.textContent('.theme-toggle-label');
    expect(label?.trim()).toBe('Dark');

    await page.click('[data-testid="theme-toggle"]');
    await page.waitForTimeout(500);

    const darkLabel = await page.textContent('.theme-toggle-label');
    expect(darkLabel?.trim()).toBe('Light');
  });

  test('Persists across page navigation', async ({ page }) => {
    await page.goto(`http://localhost:4321${BASE}/`);
    await page.waitForTimeout(2000);

    await page.click('[data-testid="theme-toggle"]');
    await page.waitForTimeout(500);

    await page.goto(`http://localhost:4321${BASE}/topics/time-complexity`);
    await page.waitForTimeout(2000);

    const bg = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim()
    );
    expect(bg).toBe('#0F1419');
  });

  test('Dark mode visual check — body background is dark', async ({ page }) => {
    await page.goto(`http://localhost:4321${BASE}/`);
    await page.waitForTimeout(2000);

    // Switch to dark
    await page.click('[data-testid="theme-toggle"]');
    await page.waitForTimeout(500);

    const bodyBg = await page.evaluate(() =>
      window.getComputedStyle(document.body).backgroundColor
    );

    // Parse rgb values — dark mode should have low values
    const rgb = bodyBg.match(/\d+/g);
    expect(rgb).not.toBeNull();
    expect(Number(rgb![0])).toBeLessThan(30);
    expect(Number(rgb![1])).toBeLessThan(30);
    expect(Number(rgb![2])).toBeLessThan(30);
  });

  test('SSR flash prevention — dark mode loads without flash', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('theme', 'dark');
    });

    await page.goto(`http://localhost:4321${BASE}/`);

    // Immediately check (before React hydration) — the inline script should have set it
    const html = await page.evaluate(() => document.documentElement.outerHTML.substring(0, 200));
    expect(html).toContain('data-theme="dark"');
  });
});
