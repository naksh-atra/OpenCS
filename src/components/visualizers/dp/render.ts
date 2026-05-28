import type { DPState } from '../../../engines/theory/dp-ops';

export function drawDPTable(
  canvas: HTMLCanvasElement | null,
  state: DPState
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

  if (state.rows === 0 || state.cols === 0) return;

  const colWidth = Math.max(40, Math.min(80, (w - 60) / state.cols));
  const rowHeight = Math.max(24, Math.min(36, (h - 30) / state.rows));
  const startX = 40;
  const startY = 20;

  // Draw cells
  for (let r = 0; r < state.rows; r++) {
    for (let c = 0; c < state.cols; c++) {
      const x = startX + c * colWidth;
      const y = startY + r * rowHeight;

      // Background
      const isHighlight = state.highlightCells.some(([hr, hc]) => hr === r && hc === c);
      const isCurrent = state.currentCell && state.currentCell[0] === r && state.currentCell[1] === c;
      const isBacktrack = state.backtrackPath.some(([br, bc]) => br === r && bc === c);

      if (isCurrent) {
        ctx.fillStyle = '#fef3c7';
      } else if (isBacktrack) {
        ctx.fillStyle = '#d1fae5';
      } else if (isHighlight) {
        ctx.fillStyle = '#dbeafe';
      } else if (r === 0 || c === 0) {
        ctx.fillStyle = '#f1f5f9';
      } else {
        ctx.fillStyle = '#ffffff';
      }
      ctx.fillRect(x, y, colWidth - 1, rowHeight - 1);

      // Border
      ctx.strokeStyle = isCurrent ? '#f59e0b' : '#e5e7eb';
      ctx.lineWidth = isCurrent ? 2 : 1;
      ctx.strokeRect(x, y, colWidth - 1, rowHeight - 1);

      // Value
      const val = state.table[r]?.[c];
      if (val !== undefined && val !== '  ') {
        ctx.fillStyle = isCurrent ? '#92400e' : isBacktrack ? '#065f46' : '#1e293b';
        ctx.font = `${isCurrent ? 'bold ' : ''}${Math.min(12, colWidth * 0.25)}px system-ui`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(val), x + colWidth / 2, y + rowHeight / 2);
      }
    }
  }

  // Column labels
  ctx.fillStyle = '#94a3b8';
  ctx.font = '9px system-ui';
  ctx.textAlign = 'center';
  state.colLabels?.forEach((label, c) => {
    ctx.fillText(label.substring(0, 6), startX + c * colWidth + colWidth / 2, startY - 6);
  });

  // Row labels
  state.rowLabels?.forEach((label, r) => {
    ctx.fillText(label.substring(0, 8), startX - 4, startY + r * rowHeight + rowHeight / 2);
  });
}
