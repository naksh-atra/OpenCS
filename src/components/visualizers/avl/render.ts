import type { AVLNode } from '../../../engines/treegraph/avl-ops';

export function drawAVLTree(
  canvas: HTMLCanvasElement | null,
  root: AVLNode | null,
  highlightValue: number | null
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

  if (!root) {
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('Empty AVL tree', w / 2, h / 2);
    return;
  }

  // BFS to compute positions
  const positions: Map<AVLNode, { x: number; y: number }> = new Map();
  const levels: AVLNode[][] = [];
  let queue: (AVLNode | null)[] = [root];
  while (queue.length > 0) {
    const level: AVLNode[] = [];
    const next: (AVLNode | null)[] = [];
    for (const n of queue) {
      if (n) level.push(n);
      if (n) { next.push(n.left); next.push(n.right); }
    }
    if (level.length > 0) levels.push(level);
    if (next.every(n => n === null)) break;
    queue = next;
  }

  const numLevels = levels.length;
  const levelHeight = Math.min(70, (h - 40) / numLevels);
  const nodeRadius = Math.min(20, levelHeight * 0.35);

  levels.forEach((level, depth) => {
    const y = 30 + depth * levelHeight;
    const spacing = w / (level.length + 1);
    level.forEach((node, i) => {
      positions.set(node, { x: spacing * (i + 1), y });
    });
  });

  // Draw edges
  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 2;
  queue = [root];
  while (queue.length > 0) {
    const node = queue.shift()!;
    const pos = positions.get(node);
    if (!pos) continue;
    [node.left, node.right].forEach(child => {
      if (child) {
        const childPos = positions.get(child);
        if (childPos) {
          ctx.beginPath();
          ctx.moveTo(pos.x, pos.y + nodeRadius);
          ctx.lineTo(childPos.x, childPos.y - nodeRadius);
          ctx.stroke();
        }
        queue.push(child);
      }
    });
  }

  // Draw nodes
  queue = [root];
  while (queue.length > 0) {
    const node = queue.shift()!;
    const pos = positions.get(node);
    if (!pos) continue;

    const isHighlight = highlightValue === node.value;

    ctx.fillStyle = isHighlight ? '#fef3c7' : '#ffffff';
    ctx.strokeStyle = isHighlight ? '#f59e0b' : '#3b82f6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, nodeRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = isHighlight ? '#92400e' : '#1e293b';
    ctx.font = `bold ${Math.max(11, nodeRadius * 0.55)}px system-ui`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(node.value), pos.x, pos.y);

    // Height label
    ctx.fillStyle = '#94a3b8';
    ctx.font = `${Math.max(8, nodeRadius * 0.35)}px system-ui`;
    ctx.fillText(`h=${node.height}`, pos.x, pos.y + nodeRadius + 10);

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
}
