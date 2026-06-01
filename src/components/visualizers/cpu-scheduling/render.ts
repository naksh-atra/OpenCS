import type { GanttEntry, Process } from '../../../engines/system-process/cpu-scheduling-ops';
import { themeColor } from '../../../lib/theme-colors';

const COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
  '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1',
];

function getProcessColor(processId: string): string {
  const idx = parseInt(processId.replace(/\D/g, ''), 10) || 0;
  return COLORS[(idx - 1) % COLORS.length];
}

export function drawGanttChart(
  canvas: HTMLCanvasElement | null,
  gantt: GanttEntry[],
  maxTime: number
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

  if (gantt.length === 0) {
    ctx.fillStyle = themeColor('text-muted');
    ctx.font = '14px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('Run a schedule to see the Gantt chart', w / 2, h / 2);
    return;
  }

  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 10;
  const paddingBottom = 20;
  const chartW = w - paddingLeft - paddingRight;
  const chartH = h - paddingTop - paddingBottom;
  const barHeight = Math.min(36, chartH * 0.6);
  const barY = paddingTop + (chartH - barHeight) / 2;

  // Draw bars
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1;
  gantt.forEach((entry, i) => {
    const x1 = paddingLeft + (entry.startTime / maxTime) * chartW;
    const x2 = paddingLeft + (entry.endTime / maxTime) * chartW;
    const barW = x2 - x1;

    // Bar fill
    ctx.fillStyle = getProcessColor(entry.processId);
    ctx.fillRect(x1, barY, barW, barHeight);

    // Bar border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.strokeRect(x1, barY, barW, barHeight);

    // Process label
    if (barW > 20) {
      ctx.fillStyle = themeColor('surface');
      ctx.font = 'bold 11px system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(entry.processId, x1 + barW / 2, barY + barHeight / 2);
    }
  });

  // Time axis
  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(paddingLeft, barY + barHeight + 5);
  ctx.lineTo(paddingLeft + chartW, barY + barHeight + 5);
  ctx.stroke();

  // Time labels
  ctx.fillStyle = themeColor('text-muted');
  ctx.font = '10px system-ui';
  ctx.textAlign = 'center';
  const step = Math.ceil(maxTime / 10);
  for (let t = 0; t <= maxTime; t += step) {
    const x = paddingLeft + (t / maxTime) * chartW;
    ctx.fillText(String(t), x, barY + barHeight + 18);
    ctx.beginPath();
    ctx.moveTo(x, barY + barHeight + 3);
    ctx.lineTo(x, barY + barHeight + 7);
    ctx.stroke();
  }
}

export function drawProcessTable(
  canvas: HTMLCanvasElement | null,
  processes: Process[]
) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  const w = canvas.offsetWidth;
  const canvasH = Math.max(120, 30 + processes.length * 28);
  canvas.height = canvasH;
  canvas.width = w * dpr;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, canvasH);

  const headers = ['Process', 'Arrival', 'Burst', 'Start', 'Complete', 'Waiting', 'Turnaround'];
  const colW = Math.floor((w - 20) / headers.length);
  const startX = 10;
  const rowH = 24;
  const headerY = 8;

  // Header
  ctx.fillStyle = themeColor('text-muted');
  ctx.font = 'bold 9px system-ui';
  headers.forEach((h, i) => {
    ctx.fillText(h, startX + i * colW + colW / 2, headerY + 8);
  });

  // Rows
  processes.forEach((p, row) => {
    const y = headerY + 20 + row * rowH;
    ctx.fillStyle = row % 2 === 0 ? '#f8fafc' : '#ffffff';
    ctx.fillRect(startX, y - 4, headers.length * colW, rowH);

    ctx.fillStyle = themeColor('text');
    ctx.font = '9px system-ui';
    const values = [
      p.id,
      String(p.arrivalTime),
      String(p.burstTime),
      p.startTime !== null ? String(p.startTime) : '—',
      p.completionTime !== null ? String(p.completionTime) : '—',
      String(p.waitingTime),
      String(p.turnaroundTime),
    ];
    values.forEach((v, i) => {
      ctx.fillText(v, startX + i * colW + colW / 2, y + 8);
    });
  });
}
