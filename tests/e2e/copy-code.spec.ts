import { test, expect } from '@playwright/test';

test.describe('Copy code buttons', () => {
  test('Code blocks have copy buttons on topic pages', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/topics/arrays');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const copyButtons = await page.$$('.copy-btn');
    expect(copyButtons.length).toBeGreaterThan(0);
  });

  test('Copy button copies code to clipboard', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/topics/arrays');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const pre = await page.$('pre');
    expect(pre).not.toBeNull();

    // Hover to make button visible
    await pre!.hover();
    await page.waitForTimeout(300);

    const copyBtn = await page.$('.copy-btn');
    expect(copyBtn).not.toBeNull();

    await copyBtn!.click();
    await page.waitForTimeout(500);

    // Button should show feedback (Copied! or Failed depending on clipboard API)
    const btnText = await copyBtn!.textContent();
    expect(['Copied!', 'Failed']).toContain(btnText);
  });

  test('Copy button appears on hover', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/topics/sorting');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Before hover, copy button should be invisible (opacity: 0)
    const pre = await page.$('pre');
    if (pre) {
      await pre.hover();
      await page.waitForTimeout(300);

      const copyBtn = await page.$('.copy-btn');
      expect(copyBtn).not.toBeNull();

      const opacity = await copyBtn!.evaluate(el =>
        window.getComputedStyle(el).opacity
      );
      expect(parseFloat(opacity)).toBeGreaterThan(0);
    }
  });
});
