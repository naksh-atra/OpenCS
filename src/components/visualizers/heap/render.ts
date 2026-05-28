import type { Heap } from '../../../engines/treegraph/heap-ops';

interface DrawOptions {
  highlightIndices: number[];
  comparingIndices: number[];
  swappedIndices: number[];
  width: number;
  height: number;
}

function getTreeLevels(heap: Heap): number[][] {
  const levels: number[][] = [];
  let count = 0;
  let levelSize = 1;
  while (count < heap.size) {
    const nodes: number[] = [];
    for (let i = 0; i < levelSize && count < heap.size; i++) {
      nodes.push(count);
      count++;
    }
    levels.push(nodes);
    levelSize *= 2;
  }
  return levels;
}

function getIndexColor(
  index: number,
  opts: DrawOptions
): string {
  if (opts.swappedIndices.includes(index)) return '#10b981'; // green
  if (opts.highlightIndices.includes(index)) return '#f59e0b'; // orange
  if (opts.comparingIndices.includes(index)) return '#3b82f6'; // blue
  return '#1e293b'; // dark (default internal)
}

function getIndexBg(
  index: number,
  opts: DrawOptions
): string {
  if (opts.swappedIndices.includes(index)) return '#d1fae5';
  if (opts.highlightIndices.includes(index)) return '#fef3c7';
  if (opts.comparingIndices.includes(index)) return '#dbeafe';
  return '#ffffff';
}

export function drawHeap(
  canvas: HTMLCanvasElement | null,
  heap: Heap,
  opts: DrawOptions
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

  if (heap.size === 0) {
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('Empty heap', w / 2, h / 2);
    return;
  }

  const levels = getTreeLevels(heap);
  const numLevels = levels.length;
  const levelHeight = Math.min(60, (h - 40) / numLevels);
  const startY = 30;
  const nodeRadius = Math.min(22, levelHeight * 0.35);

  // Map index to position
  const positions: Map<number, { x: number; y: number }> = new Map();
  levels.forEach((level, depth) => {
    const y = startY + depth * levelHeight;
    const spacing = w / (level.length + 1);
    level.forEach((idx, i) => {
      positions.set(idx, { x: spacing * (i + 1), y });
    });
  });

  // Draw edges
  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 2;
  for (let i = 0; i < heap.size; i++) {
    const pos = positions.get(i);
    if (!pos) continue;
    const leftIdx = 2 * i + 1;
    const rightIdx = 2 * i + 2;
    [leftIdx, rightIdx].forEach(childIdx => {
      if (childIdx < heap.size) {
        const childPos = positions.get(childIdx);
        if (childPos) {
          ctx.beginPath();
          ctx.moveTo(pos.x, pos.y + nodeRadius);
          ctx.lineTo(childPos.x, childPos.y - nodeRadius);
          ctx.stroke();
        }
      }
    });
  }

  // Draw nodes
  for (let i = 0; i < heap.size; i++) {
    const pos = positions.get(i);
    if (!pos) continue;

    const bg = getIndexBg(i, opts);
    const border = getIndexColor(i, opts);

    ctx.fillStyle = bg;
    ctx.strokeStyle = border;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, nodeRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = border;
    ctx.font = `bold ${Math.max(11, nodeRadius * 0.55)}px system-ui`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(heap.data[i]), pos.x, pos.y);
  }

  // Draw array view at bottom
  const arrayY = h - 20;
  const cellSize = Math.min(36, (w - 40) / heap.size);
  const arrayStartX = (w - cellSize * heap.size) / 2;

  ctx.font = '9px system-ui';
  ctx.fillStyle = '#94a3b8';
  ctx.textAlign = 'center';
  ctx.fillText('Array view:', w / 2, arrayY - 10);

  for (let i = 0; i < heap.size; i++) {
    const x = arrayStartX + i * cellSize;
    const bg = getIndexBg(i, opts);
    const border = getIndexColor(i, opts);

    ctx.fillStyle = bg;
    ctx.strokeStyle = border;
    ctx.lineWidth = 2;
    ctx.fillRect(x, arrayY, cellSize - 2, cellSize - 2);
    ctx.strokeRect(x, arrayY, cellSize - 2, cellSize - 2);

    ctx.fillStyle = border;
    ctx.font = `bold ${Math.max(9, cellSize * 0.35)}px system-ui`;
    ctx.textAlign = 'center';
    ctx.fillText(String(heap.data[i]), x + (cellSize - 2) / 2, arrayY + (cellSize - 2) / 2);
  }
}
