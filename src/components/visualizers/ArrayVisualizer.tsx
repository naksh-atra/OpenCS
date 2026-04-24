import React, { useState, useCallback } from 'react';
import { VisualizerFrame } from './VisualizerFrame';
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

const PRESETS = [
  { label: 'Small', data: [3, 7, 1, 8, 2] },
  { label: 'Even', data: [2, 4, 6, 8, 10] },
  { label: 'Sorted', data: [1, 3, 5, 7, 9] },
];

export function ArrayVisualizer() {
  const [state, setState] = useState<ArrayState>(createArrayState());
  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState('');
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
            {PRESETS.map(p => (
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
      <div className="av-chart">
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

      <style>{`
        .av-presets {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .av-ops {
          width: 100%;
        }

        .av-op-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          align-items: center;
        }

        .av-btn {
          padding: 6px 12px;
          border-radius: 6px;
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          color: var(--color-text);
          font-size: 0.8125rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .av-btn:hover {
          border-color: var(--color-primary);
        }

        .av-btn-primary {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: white;
        }

        .av-btn-reset {
          color: var(--color-text-muted);
        }

        .av-select {
          padding: 6px 8px;
          border-radius: 6px;
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          color: var(--color-text);
          font-size: 0.8125rem;
        }

        .av-input {
          padding: 6px 8px;
          border-radius: 6px;
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          color: var(--color-text);
          font-size: 0.8125rem;
          width: 80px;
        }

        .av-chart {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
          padding: 16px 0;
          width: 100%;
        }

        .av-cell-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .av-cell {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-surface);
          border: 2px solid var(--color-border);
          border-radius: var(--radius-md);
          transition: all 0.2s ease;
        }

        .av-cell-highlight {
          border-color: var(--color-primary);
          background: color-mix(in srgb, var(--color-primary) 15%, transparent);
        }

        .av-cell-current {
          border-color: var(--color-accent);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent) 30%, transparent);
        }

        .av-cell-value {
          font-family: var(--font-mono);
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--color-text);
        }

        .av-cell-index {
          font-size: 0.6875rem;
          color: var(--color-text-muted);
          font-family: var(--font-mono);
        }
      `}</style>
    </VisualizerFrame>
  );
}

export default ArrayVisualizer;