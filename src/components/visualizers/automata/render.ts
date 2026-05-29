import type { Automaton, SimulationState } from '../../../engines/theory/automata-ops';

const STATE_COLORS = {
  normal: { fill: '#ffffff', stroke: '#3b82f6', text: '#1e293b' },
  accept: { fill: '#d1fae5', stroke: '#10b981', text: '#065f46' },
  start: { fill: '#dbeafe', stroke: '#3b82f6', text: '#1d4ed8' },
  current: { fill: '#fef3c7', stroke: '#f59e0b', text: '#92400e' },
  both: { fill: '#e0e7ff', stroke: '#6366f1', text: '#3730a3' },
};

export function drawAutomaton(
  canvas: HTMLCanvasElement | null,
  automaton: Automaton,
  simState: SimulationState | null
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

  if (automaton.states.length === 0) {
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('Select a preset to visualize', w / 2, h / 2);
    return;
  }

  const nodeRadius = 22;
  const currentStates = simState?.currentStates || [];

  // Draw transitions
  const drawn = new Set<string>();
  automaton.transitions.forEach(t => {
    const from = automaton.states.find(s => s.id === t.from);
    const toStates = t.to.map(id => automaton.states.find(s => s.id === id)).filter(Boolean);
    toStates.forEach(to => {
      if (!from || !to) return;
      const key = `${t.from}-${to.id}-${t.symbol}`;
      if (drawn.has(key)) return;
      drawn.add(key);

      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (from.id === to.id) {
        // Self-loop
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(from.x, from.y - nodeRadius - 8, 12, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = '#94a3b8';
        ctx.font = '9px system-ui';
        ctx.fillText(t.symbol, from.x, from.y - nodeRadius - 22);
      } else {
        // Arrow
        const nx = dx / dist;
        const ny = dy / dist;
        const x1 = from.x + nx * nodeRadius;
        const y1 = from.y + ny * nodeRadius;
        const x2 = to.x - nx * nodeRadius;
        const y2 = to.y - ny * nodeRadius;

        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Arrowhead
        const angle = Math.atan2(dy, dx);
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 - 8 * Math.cos(angle - 0.4), y2 - 8 * Math.sin(angle - 0.4));
        ctx.lineTo(x2 - 8 * Math.cos(angle + 0.4), y2 - 8 * Math.sin(angle + 0.4));
        ctx.closePath();
        ctx.fillStyle = '#94a3b8';
        ctx.fill();

        // Label
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        ctx.fillStyle = '#64748b';
        ctx.font = '9px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(t.symbol, mx, my - 4);
      }
    });
  });

  // Draw states
  automaton.states.forEach(state => {
    const isCurrent = currentStates.includes(state.id);
    const isAccept = state.isAccept;
    const isStart = state.isStart;

    let colors = STATE_COLORS.normal;
    if (isCurrent && isAccept) colors = STATE_COLORS.both;
    else if (isCurrent) colors = STATE_COLORS.current;
    else if (isAccept) colors = STATE_COLORS.accept;
    else if (isStart) colors = STATE_COLORS.start;

    // Circle
    ctx.fillStyle = colors.fill;
    ctx.strokeStyle = colors.stroke;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(state.x, state.y, nodeRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Double circle for accept states
    if (isAccept) {
      ctx.beginPath();
      ctx.arc(state.x, state.y, nodeRadius - 4, 0, Math.PI * 2);
      ctx.stroke();
    }

    // State label
    ctx.fillStyle = colors.text;
    ctx.font = 'bold 11px system-ui';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(state.id, state.x, state.y);

    // Start arrow
    if (isStart) {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(state.x - nodeRadius - 20, state.y);
      ctx.lineTo(state.x - nodeRadius, state.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(state.x - nodeRadius - 6, state.y - 4);
      ctx.lineTo(state.x - nodeRadius, state.y);
      ctx.lineTo(state.x - nodeRadius - 6, state.y + 4);
      ctx.fillStyle = '#3b82f6';
      ctx.fill();
    }
  });
}
