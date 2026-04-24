import React, { useState } from 'react';
import { VisualizerFrame } from './VisualizerFrame';

interface TreeNode {
  value: number;
  children: TreeNode[];
}

function buildTree(fn: string, depth: number, maxDepth: number): TreeNode | null {
  if (depth > maxDepth) return null;
  const node: TreeNode = { value: depth, children: [] };
  const callPattern = getCallPattern(fn, depth);
  callPattern.times.forEach(() => {
    const child = buildTree(fn, depth + 1, maxDepth);
    if (child) node.children.push(child);
  });
  return node;
}

function getCallPattern(fn: string, depth: number): { times: number; label: string } {
  switch (fn) {
    case 'factorial':
      return { times: 1, label: `T(${depth}) → T(${depth}-1)` };
    case 'fibonacci':
      return { times: 2, label: `T(${depth}) → 2 calls` };
    case 'binary-search':
      return { times: 1, label: `T(${depth}) → T(${depth/2})` };
    default:
      return { times: 1, label: `T(${depth})` };
  }
}

function renderTree(node: TreeNode | null, x: number, y: number, spread: number, ctx: CanvasRenderingContext2D, depth: number): number {
  if (!node) return 0;
  const nodeX = x;
  const nodeY = y;
  const childY = y + 70;
  node.children.forEach((child, i) => {
    const childX = x - spread + (spread * 2 / node.children.length) * (i + 0.5);
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-border').trim() || '#e5e7eb';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(nodeX, nodeY + 12);
    ctx.lineTo(childX, childY - 12);
    ctx.stroke();
    renderTree(child, childX, childY, spread / 1.5, ctx, depth + 1);
  });
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-surface').trim() || '#ffffff';
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#2563eb';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(nodeX, nodeY, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim() || '#1f2937';
  ctx.font = 'bold 12px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String(node.value), nodeX, nodeY);
  return nodeX;
}

export function RecursionTreeVisualizer() {
  const [fn, setFn] = useState<'factorial' | 'fibonacci' | 'binary-search'>('fibonacci');
  const [depth, setDepth] = useState(4);
  const [canvasKey, setCanvasKey] = useState(0);

  const presets = [
    { id: 'factorial', label: 'Factorial', maxDepth: 6, description: 'Single recursive call' },
    { id: 'fibonacci', label: 'Fibonacci', maxDepth: 6, description: 'Two recursive calls (exponential)' },
    { id: 'binary-search', label: 'Binary Search', maxDepth: 5, description: 'One call on half the input' },
  ] as const;

  const preset = presets.find(p => p.id === fn)!;
  const maxD = preset.maxDepth;

  const draw = (canvas: HTMLCanvasElement | null) => {
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
    const tree = buildTree(fn, 0, Math.min(depth, maxD));
    if (tree) {
      const spread = Math.min(w / 3, 120 * Math.pow(1.8, depth));
      renderTree(tree, w / 2, 30, spread, ctx, 0);
    }
  };

  const redraw = () => {
    setCanvasKey(k => k + 1);
  };

  return (
    <VisualizerFrame
      title="Recursion Tree Visualizer"
      description={`Visualize ${preset.label} call patterns. See how recursion branches at each level.`}
      controls={
        <>
          <div className="rtv-presets">
            {presets.map(p => (
              <button
                key={p.id}
                onClick={() => { setFn(p.id); setTimeout(redraw, 0); }}
                className={`rtv-preset-btn ${fn === p.id ? 'active' : ''}`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="rtv-slider">
            <label>Depth: {depth}</label>
            <input
              type="range"
              min={1}
              max={maxD}
              value={depth}
              onChange={e => { setDepth(Number(e.target.value)); setTimeout(redraw, 0); }}
            />
          </div>
        </>
      }
      isEmpty={false}
    >
      <div className="rtv-canvas-wrapper">
        <canvas
          key={canvasKey}
          ref={draw}
          className="rtv-canvas"
          width={560}
          height={280}
        />
      </div>

      <style>{`
        .rtv-presets {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .rtv-preset-btn {
          padding: 6px 12px;
          border-radius: 6px;
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          color: var(--color-text);
          font-size: 0.8125rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .rtv-preset-btn:hover {
          border-color: var(--color-primary);
        }

        .rtv-preset-btn.active {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: white;
        }

        .rtv-slider {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.8125rem;
          color: var(--color-text-muted);
        }

        .rtv-slider input[type="range"] {
          width: 120px;
          accent-color: var(--color-primary);
        }

        .rtv-canvas-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .rtv-canvas {
          width: 100%;
          max-width: 560px;
          height: 280px;
          border-radius: var(--radius-md);
          background: var(--color-bg);
        }
      `}</style>
    </VisualizerFrame>
  );
}

export default RecursionTreeVisualizer;