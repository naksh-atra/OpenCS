export function drawBars(
  canvas: HTMLCanvasElement | null,
  step: any,
  maxVal: number
) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.offsetWidth;
  const h = canvas.offsetHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);

  if (!step) return;

  const getCS = (v: string) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  const primary = getCS('--color-primary') || '#2563eb';
  const surface = getCS('--color-surface') || '#ffffff';
  const text = getCS('--color-text') || '#1f2937';
  const sorted = '#16a34a';
  const compare = '#d97706';
  const swap = '#dc2626';

  const arr = step.array;
  const n = arr.length;
  const barWidth = Math.max(4, Math.min(40, (w - 32) / n - 4));
  const gap = 4;
  const totalWidth = n * (barWidth + gap) - gap;
  const startX = (w - totalWidth) / 2;
  const maxBarH = h - 48;

  for (let i = 0; i < n; i++) {
    const barH = Math.max(8, (arr[i] / maxVal) * maxBarH);
    const x = startX + i * (barWidth + gap);
    const y = h - 16 - barH;

    const isSorted = step.sorted.includes(i);
    const isHighlight = step.highlight.includes(i);
    const isCompare = step.action === 'compare' && step.indices.includes(i);
    const isSwap = (step.action === 'swap' || step.action === 'insert') && step.indices.includes(i);

    if (isSorted) {
      ctx.fillStyle = sorted;
    } else if (isSwap) {
      ctx.fillStyle = swap;
    } else if (isCompare) {
      ctx.fillStyle = compare;
    } else if (isHighlight) {
      ctx.fillStyle = primary;
    } else {
      ctx.fillStyle = '#94a3b8';
    }

    ctx.beginPath();
    // @ts-ignore - roundRect may not exist in older types
    ctx.roundRect(x, y, barWidth, barH, [3, 3, 0, 0]);
    ctx.fill();

    ctx.fillStyle = isSorted || isSwap || isCompare || isHighlight ? '#ffffff' : text;
    ctx.font = `bold ${Math.min(12, barWidth - 2)}px system-ui`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      String(arr[i]),
      x + barWidth / 2,
      y + barH / 2
    );
  }

  if (step.left && step.merged) {
    ctx.fillStyle = primary;
    ctx.font = '11px system-ui';
    ctx.textAlign = 'left';
    ctx.fillText(`L:[${step.left.join(',')}] R:[${(step.right ?? []).join(',')}] → [${step.merged.join(',')}]`, 8, 14);
  }
}
