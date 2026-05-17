import React, { useState, useEffect, useRef } from 'react';
import { VisualizerFrame } from './VisualizerFrame';
import type { SortPreset } from './types';
import { SORT_PRESETS } from './sorting/presets';
import '../../styles/sorting-visualizer.css';
import {
  type SortStep,
  type SortingState,
  type SortAlgorithm,
  computeSort,
} from '../../engines/sequence';

import { drawBars } from './sorting/render';
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
      <div className="sv-canvas-wrap" data-testid="sv-canvas">
        <canvas ref={canvasRef} className="sv-canvas" width={560} height={260} />
      </div>
      <div className="sv-legend">
        <span className="sv-legend-item sv-legend-compare">Comparing</span>
        <span className="sv-legend-item sv-legend-swap">Swapping</span>
        <span className="sv-legend-item sv-legend-sorted">Sorted</span>
      </div>
    </VisualizerFrame>
  );
}

export default SortingVisualizer;