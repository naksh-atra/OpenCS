import React, { useState, useEffect, useRef, useCallback } from 'react';
import { VisualizerFrame } from '../VisualizerFrame';
import type { DPPreset } from './types';
import { DP_PRESETS } from './presets';
import { drawDPTable } from './render';
import { createDPState, stepForward, runFull, type DPState } from '../../../engines/theory/dp-ops';
import './dp-visualizer.css';
import { useDebugState } from '../../../lib/useDebugState';

export function DPVisualizer() {
  const [state, setState] = useState<DPState | null>(null);

  useDebugState(
    'DP',
    state ? { problem: state.problem, tableSize: `${state.rows}x${state.cols}`, currentCell: state.currentCell, message: state.message } : null,
    null, 0, state?.steps?.length ?? 0, { problem: state?.problem }, {}
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (state) {
      drawDPTable(canvasRef.current, state);
    }
  }, [state]);

  const handlePreset = useCallback((preset: DPPreset) => {
    setState(createDPState(preset.problem));
  }, []);

  const handleStep = useCallback(() => {
    setState(prev => prev ? stepForward(prev) : null);
  }, []);

  const handleRunFull = useCallback(() => {
    setState(prev => prev ? runFull(prev) : null);
  }, []);

  const handleReset = useCallback(() => {
    setState(null);
  }, []);

  const isEmpty = !state;

  return (
    <VisualizerFrame
      title="Dynamic Programming Visualizer"
description="Watch DP tables fill step by step. See Fibonacci, LCS, and 0/1 Knapsack in action."
      controls={
        <>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }} data-testid="dpv-presets">
            {DP_PRESETS.map((p) => (
              <button key={p.label} onClick={() => handlePreset(p)} className="dp-problem-btn" style={{ fontSize: '0.75rem', padding: '4px 8px' }}>
                {p.label}
              </button>
            ))}
          </div>
        </>
      }
      isEmpty={isEmpty}
      emptyMessage="Select a problem to visualize"
    >
      <div className="dp-container" data-testid="dp-container">
        <div className="dp-controls" data-testid="dp-controls">
          <button onClick={handleStep} className="viz-btn viz-btn-primary">Step</button>
          <button onClick={handleRunFull} className="viz-btn viz-btn-secondary">Run All</button>
          <button onClick={handleReset} className="viz-btn viz-btn-secondary">Reset</button>
        </div>

        {state && (
          <>
            <div className="dp-canvas-wrap" data-testid="dp-canvas-wrap">
              <canvas ref={canvasRef} className="dp-canvas" width={560} height={280} data-testid="dp-canvas" />
            </div>

            <div className="dp-legend" data-testid="dp-legend">
              <span className="dp-legend-item current">Current</span>
              <span className="dp-legend-item filled">Filled</span>
              {state.backtrackPath.length > 0 && <span className="dp-legend-item backtrack">Backtrack</span>}
            </div>

            {state.steps.length > 0 && (
              <div className="dp-steps" data-testid="dp-steps">
                {state.steps.slice(Math.max(0, state.currentStep - 5), state.currentStep + 1).map((step, i) => (
                  <div key={i} className={`dp-step ${i === Math.min(5, state.currentStep) ? 'current' : ''}`}>
                    {step.message}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </VisualizerFrame>
  );
}

export default DPVisualizer;
