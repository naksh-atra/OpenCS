import type { GraphRepPreset } from './types';

export function drawGraphDiagram(
  canvas: HTMLCanvasElement | null,
  preset: GraphRepPreset,
  highlightVertex: number | null
) {
  if (!canvas || !preset) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  const w = canvas.offsetWidth;
  const h = canvas.offsetHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);

  const n = preset.vertices;
  const radius = Math.min(18, Math.min(w, h) * 0.06);
  const centerX = w / 2;
  const centerY = h / 2;
  const graphRadius = Math.min(w, h) * 0.35;

  // Compute vertex positions in a circle
  const positions: { x: number; y: number }[] = [];
  for (let i = 0; i < n; i++) {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2;
    positions.push({
      x: centerX + graphRadius * Math.cos(angle),
      y: centerY + graphRadius * Math.sin(angle),
    });
  }

  // Draw edges
  preset.edges.forEach(([u, v]) => {
    const p1 = positions[u];
    const p2 = positions[v];
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
    if (preset.directed) {
      const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
      const arrowX = p2.x - (radius + 5) * Math.cos(angle);
      const arrowY = p2.y - (radius + 5) * Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(arrowX - 8 * Math.cos(angle - 0.4), arrowY - 8 * Math.sin(angle - 0.4));
      ctx.lineTo(arrowX - 8 * Math.cos(angle + 0.4), arrowY - 8 * Math.sin(angle + 0.4));
      ctx.closePath();
      ctx.fillStyle = '#94a3b8';
      ctx.fill();
    }
  });

  // Draw vertices
  positions.forEach((pos, i) => {
    const isHighlight = highlightVertex === i;
    ctx.fillStyle = isHighlight ? '#fef3c7' : '#ffffff';
    ctx.strokeStyle = isHighlight ? '#f59e0b' : '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = isHighlight ? '#92400e' : '#1e293b';
    ctx.font = `bold ${Math.max(10, radius * 0.6)}px system-ui`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(i), pos.x, pos.y);
  });
}

export function drawAdjacencyMatrix(
  canvas: HTMLCanvasElement | null,
  preset: GraphRepPreset,
  highlightCell: [number, number] | null
) {
  if (!canvas || !preset) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  const w = canvas.offsetWidth;
  const h = 120;
  canvas.height = h;
  canvas.width = w * dpr;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, 200);

  const n = preset.vertices;
  const cellSize = Math.min(30, (w - 40) / (n + 1));
  const startX = (w - (n + 1) * cellSize) / 2;
  const startY = 40;

  // Build adjacency matrix
  const matrix: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
  preset.edges.forEach(([u, v]) => {
    matrix[u][v] = 1;
    if (!preset.directed) matrix[v][u] = 1;
  });

  // Draw header row
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 10px system-ui';
  ctx.textAlign = 'center';
  for (let j = 0; j <= n; j++) {
    ctx.fillText(j === 0 ? '' : String(j - 1), startX + j * cellSize + cellSize / 2, startY - 8);
  }

  // Draw cells
  for (let i = 0; i < n; i++) {
    // Row label
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 10px system-ui';
    ctx.fillText(String(i), startX + cellSize / 2, startY + (i + 1) * cellSize + cellSize / 2);

    for (let j = 0; j < n; j++) {
      const x = startX + (j + 1) * cellSize;
      const y = startY + i * cellSize;
      const isHighlight = highlightCell && highlightCell[0] === i && highlightCell[1] === j;

      ctx.fillStyle = isHighlight ? '#fef3c7' : matrix[i][j] ? '#dbeafe' : '#ffffff';
      ctx.fillRect(x, y, cellSize - 1, cellSize - 1);
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, cellSize - 1, cellSize - 1);

      ctx.fillStyle = matrix[i][j] ? '#1d4ed8' : '#94a3b8';
      ctx.font = '10px system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(matrix[i][j]), x + cellSize / 2, y + cellSize / 2);
    }
  }
}

export function drawAdjacencyList(
  canvas: HTMLCanvasElement | null,
  preset: GraphRepPreset,
  highlightVertex: number | null
) {
  if (!canvas || !preset) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  const w = canvas.offsetWidth;
  const h = Math.max(100, 24 + preset.vertices * 28);
  canvas.height = h;
  canvas.width = w * dpr;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);

  // Build adjacency list
  const adj: Map<number, number[]> = new Map();
  for (let i = 0; i < preset.vertices; i++) adj.set(i, []);
  preset.edges.forEach(([u, v]) => {
    adj.get(u)!.push(v);
    if (!preset.directed) adj.get(v)!.push(u);
  });

  const colWidth = Math.floor((w - 20) / preset.vertices);
  const startX = 10;

  adj.forEach((neighbors, v) => {
    const x = startX + (v % 4) * colWidth;
    const y = 16 + Math.floor(v / 4) * 60;
    const isHighlight = highlightVertex === v;

    // Vertex box
    ctx.fillStyle = isHighlight ? '#fef3c7' : '#ffffff';
    ctx.strokeStyle = isHighlight ? '#f59e0b' : '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x, y, 24, 22, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = isHighlight ? '#92400e' : '#1e293b';
    ctx.font = 'bold 10px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(String(v), x + 12, y + 13);

    // Arrow and neighbors
    if (neighbors.length > 0) {
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x + 24, y + 11);
      ctx.lineTo(x + 34, y + 11);
      ctx.stroke();

      neighbors.forEach((n, ni) => {
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(x + 36 + ni * 26, y - 2, 24, 22, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#065f46';
        ctx.font = '10px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(String(n), x + 48 + ni * 26, y + 11);
      });
    } else {
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px system-ui';
      ctx.fillText('∅', x + 38, y + 13);
    }
  });
}
