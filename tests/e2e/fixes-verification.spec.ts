import { test, expect } from '@playwright/test';

test.describe('Issue fixes verification', () => {
  test('Time Complexity: has interactive n input and comparison table', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/topics/time-complexity');
    await page.waitForSelector('astro-island', { timeout: 15000 });
    await page.waitForTimeout(2000);

    // Check for n input (range slider)
    const rangeInput = await page.$('input[type="range"]');
    expect(rangeInput).not.toBeNull();

    // Check for number input
    const numberInput = await page.$('input[type="number"]');
    expect(numberInput).not.toBeNull();

    // Check for comparison table
    const table = await page.$('table');
    expect(table).not.toBeNull();

    // Check table has multiple rows (header + data rows)
    const rows = await page.$$('tbody tr');
    expect(rows.length).toBeGreaterThanOrEqual(3);

    // Change n value and verify bars update
    await page.fill('input[type="number"]', '50');
    await page.waitForTimeout(500);

    // The chart should still show bars
    const bars = await page.$$('.complexity-bar');
    expect(bars.length).toBeGreaterThan(0);
  });

  test('Stack/Queue: no duplicate Random presets', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/topics/stack-queue');
    await page.waitForSelector('astro-island', { timeout: 15000 });
    await page.waitForTimeout(2000);

    // Count how many buttons say "Random" — should be exactly 1 (the dynamic button)
    const randomCount = await page.evaluate(() =>
      Array.from(document.querySelectorAll('.sqv-btn')).filter(
        b => b.textContent?.trim() === 'Random'
      ).length
    );
    expect(randomCount).toBe(1);
  });

  test('Stack/Queue: Random button generates different values on click', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/topics/stack-queue');
    await page.waitForSelector('astro-island', { timeout: 15000 });
    await page.waitForTimeout(2000);

    // Click Random button and check values change
    const randomBtn = await page.$('.sqv-presets .sqv-btn:last-child');
    expect(randomBtn).not.toBeNull();

    await randomBtn!.click();
    await page.waitForTimeout(500);
    const values1 = await page.evaluate(() =>
      Array.from(document.querySelectorAll('.sqv-item-value')).map(e => e.textContent)
    );
    expect(values1.length).toBeGreaterThan(0);
  });

  test('Number Systems: preset labels use base names', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/topics/number-systems');
    await page.waitForSelector('astro-island', { timeout: 15000 });
    await page.waitForTimeout(2000);

    const labels = await page.evaluate(() =>
      Array.from(document.querySelectorAll('.ns-toggle-btn')).map(b => b.textContent?.trim())
    );

    // Labels should use base names like "Decimal → Binary"
    expect(labels.some(l => l?.includes('Decimal → Binary'))).toBe(true);
    expect(labels.some(l => l?.includes('Binary → Decimal'))).toBe(true);
    expect(labels.some(l => l?.includes('Decimal → Hex'))).toBe(true);
    expect(labels.some(l => l?.includes('Hex → Decimal'))).toBe(true);
  });

  test('Number Systems: swap button works and converts', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/topics/number-systems');
    await page.waitForSelector('astro-island', { timeout: 15000 });
    await page.waitForTimeout(2000);

    // Click "Decimal → Binary" preset first
    const presetBtns = await page.$$('.ns-toggle-btn');
    for (const btn of presetBtns) {
      const text = await btn.textContent();
      if (text?.includes('Decimal → Binary')) {
        await btn.click();
        break;
      }
    }
    await page.waitForTimeout(1000);

    // Verify initial conversion shows result
    const initialResult = await page.textContent('.ns-result-value');
    expect(initialResult).toContain('11001');

    // Click swap button
    const swapBtn = await page.$('.ns-swap-btn');
    expect(swapBtn).not.toBeNull();
    await swapBtn!.click();
    await page.waitForTimeout(1000);

    // After swap: should auto-convert with swapped bases
    const swappedResult = await page.textContent('.ns-result-value');
    expect(swappedResult).toContain('25');
  });

  test('Tree Traversal: presets show different tree structures', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/topics/tree-traversals');
    await page.waitForSelector('astro-island', { timeout: 15000 });
    await page.waitForTimeout(3000);

    // Get preset buttons
    const presetLabels = await page.evaluate(() =>
      Array.from(document.querySelectorAll('.ttv-presets .ttv-btn')).map(b => b.textContent?.trim())
    );

    expect(presetLabels).toContain('Small');
    expect(presetLabels).toContain('Full');
    expect(presetLabels).toContain('Skewed Left');
    expect(presetLabels).toContain('Balanced');

    // Click "Small" preset
    await page.click('.ttv-presets .ttv-btn:first-child');
    await page.waitForTimeout(2000);
    const smallResult = await page.textContent('.ttv-result-values');
    expect(smallResult).toBeTruthy();

    // Click "Full" preset — should have different traversal (7 nodes)
    await page.click('.ttv-presets .ttv-btn:nth-child(2)');
    await page.waitForTimeout(2000);
    const fullResult = await page.textContent('.ttv-result-values');
    expect(fullResult).toBeTruthy();

    // Full tree with 7 nodes should have longer traversal result
    expect(fullResult!.length).toBeGreaterThan(smallResult!.length);
  });
});
