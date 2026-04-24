import React, { useState, useEffect, useRef } from 'react';
import { VisualizerFrame } from './VisualizerFrame';
import {
  type SortStep,
  type SortingState,
  type SortAlgorithm,
  computeSort,
  SORT_PRESETS,
} from '../../engines/sequence';

function drawBars(
  canvas: HTMLCanvasElement | null,
  step: SortStep | null,
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

export function SortingVisualizer() {
  const [presetIdx, setPresetIdx] = useState(0);
  const [algo, setAlgo] = useState<SortAlgorithm>('bubble');
  const [sortState, setSortState] = useState<SortingState | null>(null);
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const arr = SORT_PRESETS[presetIdx].arr;
  const maxVal = Math.max(...arr);

  useEffect(() => {
    setStepIdx(0);
    setIsPlaying(false);
    const result = computeSort(algo, [...arr]);
    setSortState(result);
  }, [presetIdx, algo, arr]);

  useEffect(() => {
    if (!sortState) return;
    const step = stepIdx > 0 && stepIdx <= sortState.steps.length ? sortState.steps[stepIdx - 1] : null;
    drawBars(canvasRef.current, step, maxVal);
  }, [sortState, stepIdx, maxVal]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (isPlaying && sortState && stepIdx < sortState.steps.length) {
      timerRef.current = setTimeout(() => setStepIdx(i => i + 1), algo === 'merge' ? 400 : 300);
    } else if (sortState && stepIdx >= sortState.steps.length) {
      setIsPlaying(false);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [isPlaying, stepIdx, sortState, algo]);

  const handlePlay = () => {
    if (!sortState) return;
    if (stepIdx >= sortState.steps.length) setStepIdx(0);
    setIsPlaying(true);
  };

  const handleStep = () => {
    if (!sortState) return;
    if (stepIdx >= sortState.steps.length) setStepIdx(0);
    else setStepIdx(i => i + 1);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setStepIdx(0);
  };

  const message = sortState && stepIdx > 0 && stepIdx <= sortState.steps.length
    ? sortState.steps[stepIdx - 1].message
    : sortState?.message ?? 'Press play to start';

  return (
    <VisualizerFrame
      title="Sorting Algorithms"
      description={message}
      controls={
        <>
          <div className="sv-presets">
            {SORT_PRESETS.map((p, i) => (
              <button key={p.label} onClick={() => setPresetIdx(i)} className={`sv-btn ${presetIdx === i ? 'active' : ''}`}>
                {p.label}
              </button>
            ))}
          </div>
          <div className="sv-controls">
            <div className="sv-algo">
              <button onClick={() => setAlgo('bubble')} className={`sv-btn ${algo === 'bubble' ? 'active' : ''}`}>Bubble</button>
              <button onClick={() => setAlgo('insertion')} className={`sv-btn ${algo === 'insertion' ? 'active' : ''}`}>Insertion</button>
              <button onClick={() => setAlgo('merge')} className={`sv-btn ${algo === 'merge' ? 'active' : ''}`}>Merge</button>
            </div>
            <div className="sv-playback">
              <button onClick={handleReset} className="sv-btn">Reset</button>
              <button onClick={handleStep} className="sv-btn">Step</button>
              <button onClick={handlePlay} className="sv-btn sv-btn-primary">{isPlaying ? 'Pause' : 'Play'}</button>
            </div>
          </div>
        </>
      }
      isEmpty={false}
    >
      <div className="sv-canvas-wrap">
        <canvas ref={canvasRef} className="sv-canvas" width={560} height={260} />
      </div>
      <div className="sv-legend">
        <span className="sv-legend-item sv-legend-compare">Comparing</span>
        <span className="sv-legend-item sv-legend-swap">Swapping</span>
        <span className="sv-legend-item sv-legend-sorted">Sorted</span>
      </div>

      <style>{`
        .sv-presets { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
        .sv-controls { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; justify-content: space-between; }
        .sv-algo { display: flex; gap: 8px; }
        .sv-playback { display: flex; gap: 8px; }
        .sv-btn { padding: 6px 12px; border-radius: 6px; border: 1px solid var(--color-border); background: var(--color-surface); color: var(--color-text); font-size: 0.8125rem; cursor: pointer; transition: all 0.15s; }
        .sv-btn:hover { border-color: var(--color-primary); }
        .sv-btn.active { background: var(--color-primary); border-color: var(--color-primary); color: white; }
        .sv-btn-primary { background: var(--color-primary); border-color: var(--color-primary); color: white; }
        .sv-canvas-wrap { width: 100%; display: flex; justify-content: center; }
        .sv-canvas { width: 100%; max-width: 560px; height: 260px; border-radius: var(--radius-md); background: var(--color-bg); }
        .sv-legend { display: flex; gap: 16px; justify-content: center; margin-top: 8px; font-size: 0.75rem; color: var(--color-text); }
        .sv-legend-item::before { content: '■'; margin-right: 4px; }
        .sv-legend-compare::before { color: #d97706; }
        .sv-legend-swap::before { color: #dc2626; }
        .sv-legend-sorted::before { color: #16a34a; }
      `}</style>
    </VisualizerFrame>
  );
}

export default SortingVisualizer;