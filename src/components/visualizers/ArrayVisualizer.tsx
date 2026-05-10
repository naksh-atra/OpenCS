import React, { useState, useCallback } from 'react';
import { VisualizerFrame } from './VisualizerFrame';
import type { ArrayPreset } from './array/types';
import { PRESETS } from './array/presets';
import {
  createArrayState,
  applyInsert,
  applyDelete,
  applySearch,
  applyAccess,
  applyUpdate,
  getRandomArray,
  type ArrayState,
} from '../../engines/sequence';
import '../../styles/array-visualizer.css';

export function ArrayVisualizer() {
  const [state, setState] = useState<ArrayState>(createArrayState());
  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [operation, setOperation] = useState<string>('access');

  const handlePreset = useCallback((data: number[]) => {
    setState(createArrayState(data));
    setInputValue('');
    setInputIndex('');
  }, []);

  const handleRandom = useCallback(() => {
    setState(createArrayState(getRandomArray(8, 50)));
    setInputValue('');
    setInputIndex('');
  }, []);

  const handleReset = useCallback(() => {
    setState(createArrayState());
    setInputValue('');
    setInputIndex('');
  }, []);

  const handleOp = useCallback((op: string, value?: string, index?: string) => {
    const val = value ? parseInt(value, 10) : undefined;
    const idx = index ? parseInt(index, 10) : undefined;

    setState(prev => {
      switch (op) {
        case 'insert':
          return idx !== undefined && val !== undefined ? applyInsert(prev, idx, val) : prev;
        case 'delete':
          return idx !== undefined ? applyDelete(prev, idx) : prev;
        case 'search':
          return val !== undefined ? applySearch(prev, val) : prev;
        case 'access':
          return idx !== undefined ? applyAccess(prev, idx) : prev;
        case 'update':
          return idx !== undefined && val !== undefined ? applyUpdate(prev, idx, val) : prev;
        default:
          return prev;
      }
    });
  }, []);

  const opsWithValue = ['insert', 'search', 'update'];
  const opsWithIndex = ['insert', 'delete', 'access', 'update'];

  return (
    <VisualizerFrame
      title="Array Operations Visualizer"
      description={`Array: [${state.data.join(', ')}] — ${state.message}`}
      controls={
        <>
          <div className="av-presets">
            {PRESETS.map((p: ArrayPreset) => (
              <button key={p.label} onClick={() => handlePreset(p.data)} className="av-btn">
                {p.label}
              </button>
            ))}
            <button onClick={handleRandom} className="av-btn">Random</button>
            <button onClick={handleReset} className="av-btn av-btn-reset">Reset</button>
          </div>
          <div className="av-ops">
            <div className="av-op-row">
              <select value={operation} onChange={e => setOperation(e.target.value)} className="av-select">
                <option value="access">Access</option>
                <option value="insert">Insert</option>
                <option value="delete">Delete</option>
                <option value="search">Search</option>
                <option value="update">Update</option>
              </select>
              {opsWithIndex.includes(operation) && (
                <input
                  type="number"
                  placeholder="Index"
                  value={inputIndex}
                  onChange={e => setInputIndex(e.target.value)}
                  className="av-input"
                />
              )}
              {opsWithValue.includes(operation) && (
                <input
                  type="number"
                  placeholder="Value"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  className="av-input"
                />
              )}
              <button
                onClick={() => handleOp(operation, inputValue, inputIndex)}
                className="av-btn av-btn-primary"
              >
                Execute
              </button>
            </div>
          </div>
        </>
      }
      isEmpty={false}
    >
      {error && (
        <div className="av-error">
          {error}
        </div>
      )}
      <div className="av-chart" data-testid="array-visualizer">
        {state.data.map((val, i) => (
          <div key={i} className="av-cell-wrapper">
            <div
              className={`av-cell ${state.highlightIndices.includes(i) ? 'av-cell-highlight' : ''} ${state.currentIndex === i ? 'av-cell-current' : ''}`}
            >
              <span className="av-cell-value">{val}</span>
            </div>
            <span className="av-cell-index">{i}</span>
          </div>
        ))}
      </div>
    </VisualizerFrame>
  );
}

export default ArrayVisualizer;
