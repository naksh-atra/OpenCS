import React, { useState, useEffect, useRef, useCallback } from 'react';
import { VisualizerFrame } from '../VisualizerFrame';
import type { HeapPreset } from './types';
import { HEAP_PRESETS } from './presets';
import { drawHeap } from './render';
import {
  createHeapState,
  heapInsert,
  heapExtractRoot,
  buildHeap,
  createHeapState as createNewHeapState,
  type HeapState,
} from '../../../engines/treegraph/heap-ops';
import './heap-visualizer.css';

export function HeapVisualizer() {
  const [state, setState] = useState<HeapState>(() => createHeapState('min'));
  const [inputValue, setInputValue] = useState('');
  const [heapType, setHeapType] = useState<'min' | 'max'>('min');
  const [error, setError] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Draw on state change
  useEffect(() => {
    drawHeap(canvasRef.current, state.heap, {
      highlightIndices: state.highlightIndices,
      comparingIndices: state.comparingIndices,
      swappedIndices: state.swappedIndices,
      width: canvasRef.current?.offsetWidth || 560,
      height: canvasRef.current?.offsetHeight || 320,
    });
  }, [state]);

  // Cleanup timer
  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const handleInsert = useCallback(() => {
    setError(null);
    const val = parseInt(inputValue, 10);
    if (isNaN(val)) {
      setError('Enter a valid integer');
      return;
    }
    setState(prev => heapInsert(prev, val));
    setInputValue('');
  }, [inputValue]);

  const handleExtract = useCallback(() => {
    setError(null);
    if (state.heap.size === 0) {
      setError('Heap is empty');
      return;
    }
    setState(prev => heapExtractRoot(prev));
  }, [state.heap.size]);

  const handleBuildHeap = useCallback(() => {
    setError(null);
    const preset = HEAP_PRESETS.find(p => p.type === heapType);
    if (preset) {
      let newState = createHeapState(heapType, preset.data);
      newState = buildHeap(newState);
      setState(newState);
    }
  }, [heapType]);

  const handleTypeToggle = useCallback((type: 'min' | 'max') => {
    setHeapType(type);
    setState(prev => {
      const newState = createHeapState(type, prev.heap.data);
      return buildHeap(newState);
    });
  }, []);

  const handleReset = useCallback(() => {
    setState(createHeapState(heapType));
    setInputValue('');
    setError(null);
  }, [heapType]);

  const handlePreset = useCallback((preset: HeapPreset) => {
    setHeapType(preset.type);
    let newState = createHeapState(preset.type, preset.data);
    newState = buildHeap(newState);
    setState(newState);
    setInputValue('');
    setError(null);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleInsert();
  }, [handleInsert]);

  return (
    <VisualizerFrame
      title={`${heapType === 'min' ? 'Min' : 'Max'} Heap Visualizer`}
      description={`Size: ${state.heap.size} | Root: ${state.heap.size > 0 ? state.heap.data[0] : '—'} | ${state.message}`}
      controls={
        <>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
            {HEAP_PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => handlePreset(p)}
                className="hp-toggle-btn"
                style={{ fontSize: '0.75rem', padding: '4px 8px' }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </>
      }
      isEmpty={state.heap.size === 0}
      emptyMessage="Heap is empty — insert values or load a preset"
    >
      <div className="hp-container">
        {/* Type toggle */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => handleTypeToggle('min')}
            className={`hp-toggle-btn ${heapType === 'min' ? 'active' : ''}`}
          >
            Min Heap
          </button>
          <button
            onClick={() => handleTypeToggle('max')}
            className={`hp-toggle-btn ${heapType === 'max' ? 'active' : ''}`}
          >
            Max Heap
          </button>
        </div>

        {/* Controls */}
        <div className="hp-controls">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>Value</label>
            <input
              type="number"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. 5"
              style={{
                padding: '8px 10px',
                borderRadius: '6px',
                border: '1px solid var(--color-border)',
                background: 'var(--color-surface)',
                color: 'var(--color-text)',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-mono)',
                width: '80px',
              }}
            />
          </div>
          <button onClick={handleInsert} style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid var(--color-primary)', background: 'var(--color-primary)', color: 'white', fontSize: '0.8125rem', cursor: 'pointer' }}>Insert</button>
          <button onClick={handleExtract} style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)', fontSize: '0.8125rem', cursor: 'pointer' }}>Extract Root</button>
          <button onClick={handleBuildHeap} style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)', fontSize: '0.8125rem', cursor: 'pointer' }}>Build Heap</button>
          <button onClick={handleReset} style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)', fontSize: '0.8125rem', cursor: 'pointer' }}>Reset</button>

          <div className="hp-metric">
            <span className="hp-metric-label">Size</span>
            <span className="hp-metric-value">{state.heap.size}</span>
          </div>
          <div className="hp-metric">
            <span className="hp-metric-label">Root</span>
            <span className="hp-metric-value">{state.heap.size > 0 ? state.heap.data[0] : '—'}</span>
          </div>
        </div>

        {error && <div className="hp-error">{error}</div>}

        {/* Canvas */}
        <div className="hp-canvas-wrap">
          <canvas ref={canvasRef} className="hp-canvas" width={560} height={320} />
        </div>

        {/* Legend */}
        <div className="hp-legend">
          <span className="hp-legend-item normal">Normal</span>
          <span className="hp-legend-item compare">Comparing</span>
          <span className="hp-legend-item highlight">Inserted</span>
          <span className="hp-legend-item swap">Swapped</span>
        </div>
      </div>
    </VisualizerFrame>
  );
}

export default HeapVisualizer;
