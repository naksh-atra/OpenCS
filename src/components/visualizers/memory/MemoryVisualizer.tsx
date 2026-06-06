import React, { useState, useCallback } from 'react';
import { VisualizerFrame } from '../VisualizerFrame';
import type { MemoryPreset } from './types';
import { MEMORY_PRESETS } from './presets';
import { createMemoryState, stepForward, runFull, type MemoryState } from '../../../engines/system-process/memory-ops';
import './memory-visualizer.css';

export function MemoryVisualizer() {
  const [state, setState] = useState<MemoryState | null>(null);
  const [algorithm, setAlgorithm] = useState<'fifo' | 'lru' | 'optimal'>('fifo');

  const handlePreset = useCallback((preset: MemoryPreset) => {
    setAlgorithm(preset.algorithm);
    setState(createMemoryState(preset.referenceString, preset.frameCount, preset.algorithm));
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
  const faultRate = state ? (state.pageFaults / Math.max(1, state.currentIndex + 1) * 100).toFixed(1) : '0';

  return (
    <VisualizerFrame
      title="Page Replacement Algorithms"
      description="Compare FIFO, LRU, and Optimal page replacement. Watch frames fill up and pages get replaced."
      controls={
        <>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }} data-testid="mmv-presets">
            {MEMORY_PRESETS.map((p) => (
              <button key={p.label} onClick={() => handlePreset(p)} className="mm-toggle-btn" style={{ fontSize: '0.75rem', padding: '4px 8px' }}>
                {p.label}
              </button>
            ))}
          </div>
        </>
      }
      isEmpty={isEmpty}
      emptyMessage="Select a preset to load a reference string"
    >
      <div className="mm-container" data-testid="mm-container">
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }} data-testid="mm-algorithm-selector">
          {(['fifo', 'lru', 'optimal'] as const).map((algo) => (
            <button key={algo} onClick={() => setAlgorithm(algo)} className={`mm-toggle-btn ${algorithm === algo ? 'active' : ''}`}>
              {algo.toUpperCase()}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }} data-testid="mm-controls">
          <button onClick={handleStep} className="viz-btn viz-btn-primary">Step</button>
          <button onClick={handleRunFull} className="viz-btn viz-btn-secondary">Run All</button>
          <button onClick={handleReset} className="viz-btn viz-btn-secondary">Reset</button>
        </div>

        {state && (
          <>
            <div className="mm-metrics" data-testid="mm-metrics">
              <div className="mm-metric"><span className="mm-metric-label">Page Faults</span><span className="mm-metric-value fault">{state.pageFaults}</span></div>
              <div className="mm-metric"><span className="mm-metric-label">Page Hits</span><span className="mm-metric-value hit">{state.pageHits}</span></div>
              <div className="mm-metric"><span className="mm-metric-label">Fault Rate</span><span className="mm-metric-value">{faultRate}%</span></div>
            </div>

            <div className="mm-frames" data-testid="mm-frames">
              {state.frames.map((page, i) => (
                <div key={i} className={`mm-frame ${page !== null ? 'filled' : ''} ${state.highlightFrame === i ? 'highlight' : ''}`}>
                  {page !== null ? page : '—'}
                </div>
              ))}
            </div>

            <div className="mm-ref-string" data-testid="mm-ref-string">
              {state.referenceString.map((page, i) => (
                <span key={i} className={`mm-ref-token ${i === state.currentIndex ? 'current' : i < state.currentIndex ? 'past' : ''}`}>
                  {page}
                </span>
              ))}
            </div>

            {state.history.length > 0 && (
              <div className="mm-history" data-testid="mm-history">
                {state.history.map((entry, i) => (
                  <div key={i} className="mm-history-entry">{entry}</div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </VisualizerFrame>
  );
}

export default MemoryVisualizer;
