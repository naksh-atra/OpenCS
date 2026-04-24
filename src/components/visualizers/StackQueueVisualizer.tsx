import React, { useState, useCallback } from 'react';
import { VisualizerFrame } from './VisualizerFrame';
import {
  createStackQueueState,
  applyPush,
  applyPop,
  applyEnqueue,
  applyDequeue,
  applyPeek,
  getRandomSequence,
  type StackQueueState,
  type DataStructureType,
} from '../../engines/sequence';

const STACK_PRESETS = [
  { label: 'Small', data: [3, 7, 1, 8] },
  { label: 'Ascending', data: [1, 2, 3, 4, 5] },
  { label: 'Random', data: [5, 2, 8, 1, 9] },
];

const QUEUE_PRESETS = [
  { label: 'Small', data: [3, 7, 1, 8] },
  { label: 'Even', data: [2, 4, 6, 8] },
  { label: 'Sorted', data: [1, 3, 5, 7] },
];

export function StackQueueVisualizer() {
  const [state, setState] = useState<StackQueueState>(createStackQueueState('stack', [3, 7, 1, 8]));
  const [inputValue, setInputValue] = useState('');
  const [mode, setMode] = useState<DataStructureType>('stack');

  const handleModeChange = useCallback((newMode: DataStructureType) => {
    setMode(newMode);
    setState(createStackQueueState(newMode));
    setInputValue('');
  }, []);

  const handlePreset = useCallback((data: number[]) => {
    setState(createStackQueueState(mode, data));
    setInputValue('');
  }, [mode]);

  const handleRandom = useCallback(() => {
    setState(createStackQueueState(mode, getRandomSequence(6, 20)));
    setInputValue('');
  }, [mode]);

  const handleReset = useCallback(() => {
    setState(createStackQueueState(mode));
    setInputValue('');
  }, [mode]);

  const handlePush = useCallback(() => {
    const val = inputValue ? parseInt(inputValue, 10) : Math.floor(Math.random() * 20) + 1;
    setState(prev => applyPush(prev, val));
    setInputValue('');
  }, [inputValue]);

  const handlePop = useCallback(() => {
    setState(prev => applyPop(prev));
  }, []);

  const handleEnqueue = useCallback(() => {
    const val = inputValue ? parseInt(inputValue, 10) : Math.floor(Math.random() * 20) + 1;
    setState(prev => applyEnqueue(prev, val));
    setInputValue('');
  }, [inputValue]);

  const handleDequeue = useCallback(() => {
    setState(prev => applyDequeue(prev));
  }, []);

  const handlePeek = useCallback(() => {
    setState(prev => applyPeek(prev));
  }, []);

  const isStack = state.type === 'stack';
  const presets = isStack ? STACK_PRESETS : QUEUE_PRESETS;
  const canOperate = state.data.length > 0;

  return (
    <VisualizerFrame
      title={`${isStack ? 'Stack' : 'Queue'} Visualizer`}
      description={`${isStack ? 'LIFO' : 'FIFO'} — ${state.message}`}
      controls={
        <>
          <div className="sqv-mode-tabs">
            <button
              onClick={() => handleModeChange('stack')}
              className={`sqv-mode-tab ${mode === 'stack' ? 'active' : ''}`}
            >
              Stack (LIFO)
            </button>
            <button
              onClick={() => handleModeChange('queue')}
              className={`sqv-mode-tab ${mode === 'queue' ? 'active' : ''}`}
            >
              Queue (FIFO)
            </button>
          </div>
          <div className="sqv-presets">
            {presets.map(p => (
              <button key={p.label} onClick={() => handlePreset(p.data)} className="sqv-btn">
                {p.label}
              </button>
            ))}
            <button onClick={handleRandom} className="sqv-btn">Random</button>
            <button onClick={handleReset} className="sqv-btn sqv-btn-reset">Reset</button>
          </div>
          <div className="sqv-ops">
            <div className="sqv-input-row">
              <input
                type="number"
                placeholder={isStack ? 'Push value' : 'Enqueue value'}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                className="sqv-input"
              />
              {isStack ? (
                <>
                  <button onClick={handlePush} className="sqv-btn sqv-btn-primary">
                    Push
                  </button>
                  <button onClick={handlePop} className="sqv-btn sqv-btn-warn" disabled={!canOperate}>
                    Pop
                  </button>
                </>
              ) : (
                <>
                  <button onClick={handleEnqueue} className="sqv-btn sqv-btn-primary">
                    Enqueue
                  </button>
                  <button onClick={handleDequeue} className="sqv-btn sqv-btn-warn" disabled={!canOperate}>
                    Dequeue
                  </button>
                </>
              )}
              <button onClick={handlePeek} className="sqv-btn" disabled={!canOperate}>
                Peek
              </button>
            </div>
            <div className="sqv-hint">
              {isStack
                ? 'Stack: push adds to top, pop removes from top'
                : 'Queue: enqueue adds to back, dequeue removes from front'}
            </div>
          </div>
        </>
      }
      isEmpty={state.data.length === 0}
      emptyMessage={isStack ? 'Stack is empty' : 'Queue is empty'}
    >
      <div className={`sqv-container ${isStack ? 'sqv-stack' : 'sqv-queue'}`}>
        <div className="sqv-structure">
          {isStack ? (
            <>
              <div className="sqv-top-label">TOP</div>
              <div className="sqv-items sqv-stack-items">
                {[...state.data].reverse().map((val, i) => {
                  const realIndex = state.data.length - 1 - i;
                  return (
                    <div
                      key={realIndex}
                      className={`sqv-item ${state.highlightIndex === realIndex ? 'sqv-item-highlight' : ''}`}
                    >
                      <span className="sqv-item-value">{val}</span>
                    </div>
                  );
                })}
                {state.data.length === 0 && <div className="sqv-empty-indicator">Empty</div>}
              </div>
              <div className="sqv-bottom-label">BOTTOM</div>
            </>
          ) : (
            <div className="sqv-items sqv-queue-items">
              <div className="sqv-front-label">FRONT</div>
              <div className="sqv-queue-row">
                {state.data.map((val, i) => (
                  <div
                    key={i}
                    className={`sqv-item sqv-queue-item ${state.highlightIndex === i ? 'sqv-item-highlight' : ''}`}
                  >
                    <span className="sqv-item-value">{val}</span>
                  </div>
                ))}
                {state.data.length === 0 && <div className="sqv-empty-indicator">Empty</div>}
              </div>
              <div className="sqv-back-label">BACK</div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .sqv-mode-tabs {
          display: flex;
          gap: 4px;
          background: var(--color-bg);
          padding: 4px;
          border-radius: var(--radius-md);
        }

        .sqv-mode-tab {
          padding: 6px 16px;
          border: none;
          border-radius: var(--radius-sm);
          background: transparent;
          color: var(--color-text-muted);
          font-size: 0.8125rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .sqv-mode-tab.active {
          background: var(--color-surface);
          color: var(--color-primary);
          box-shadow: var(--shadow-sm);
        }

        .sqv-presets {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .sqv-btn {
          padding: 6px 12px;
          border-radius: 6px;
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          color: var(--color-text);
          font-size: 0.8125rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .sqv-btn:hover:not(:disabled) {
          border-color: var(--color-primary);
        }

        .sqv-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .sqv-btn-primary {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: white;
        }

        .sqv-btn-warn {
          color: #dc2626;
          border-color: #fca5a5;
        }

        .sqv-btn-reset {
          color: var(--color-text-muted);
        }

        .sqv-ops {
          width: 100%;
        }

        .sqv-input-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          align-items: center;
        }

        .sqv-input {
          padding: 6px 8px;
          border-radius: 6px;
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          color: var(--color-text);
          font-size: 0.8125rem;
          width: 100px;
        }

        .sqv-hint {
          margin-top: 8px;
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }

        .sqv-container {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 16px 0;
        }

        .sqv-structure {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .sqv-stack .sqv-items {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .sqv-queue .sqv-items {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .sqv-queue-row {
          display: flex;
          gap: 4px;
        }

        .sqv-item {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-surface);
          border: 2px solid var(--color-border);
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
        }

        .sqv-item-highlight {
          border-color: var(--color-primary);
          background: color-mix(in srgb, var(--color-primary) 15%, transparent);
        }

        .sqv-item-value {
          font-family: var(--font-mono);
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--color-text);
        }

        .sqv-top-label, .sqv-bottom-label {
          font-size: 0.625rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-muted);
          padding: 2px 0;
        }

        .sqv-front-label, .sqv-back-label {
          font-size: 0.625rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-muted);
          padding: 2px 0;
        }

        .sqv-empty-indicator {
          padding: 12px 24px;
          color: var(--color-text-muted);
          font-size: 0.875rem;
          border: 2px dashed var(--color-border);
          border-radius: var(--radius-sm);
        }
      `}</style>
    </VisualizerFrame>
  );
}

export default StackQueueVisualizer;