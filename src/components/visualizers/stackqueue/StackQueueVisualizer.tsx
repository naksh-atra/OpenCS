import React, { useState, useCallback } from 'react';
import { VisualizerFrame } from '../VisualizerFrame';
import type { StackPreset, QueuePreset } from './types';
import { STACK_PRESETS, QUEUE_PRESETS } from './presets';
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
} from '../../../engines/sequence';
import './stackqueue-visualizer.css';
import { useDebugState } from '../../../lib/useDebugState';

export function StackQueueVisualizer() {
  const [state, setState] = useState<StackQueueState>(createStackQueueState('stack', [3, 7, 1, 8]));
  const [inputValue, setInputValue] = useState('');
  const [mode, setMode] = useState<DataStructureType>('stack');

  useDebugState(
    'StackQueue',
    state ? { type: state.type, data: state.data, highlightIndex: state.highlightIndex, message: state.message } : null,
    null, 0, state?.operations?.length ?? 0, { mode }, { elementCount: state?.data?.length ?? 0 }
  );

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
  const presets: (StackPreset | QueuePreset)[] = isStack ? STACK_PRESETS : QUEUE_PRESETS;
  const canOperate = state.data.length > 0;

  return (
    <VisualizerFrame
      title={`${isStack ? 'Stack' : 'Queue'} Visualizer`}
      description={`${isStack ? 'LIFO' : 'FIFO'} — ${state.message}`}
      controls={
        <>
          <div className="sqv-mode-tabs" data-testid="sqv-mode-tabs">
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
          <div className="sqv-presets" data-testid="sqv-presets">
            {presets.map(p => (
              <button key={p.label} onClick={() => handlePreset(p.data)} className="sqv-btn">
                {p.label}
              </button>
            ))}
            <button onClick={handleRandom} className="sqv-btn">Random</button>
            <button onClick={handleReset} className="sqv-btn sqv-btn-reset">Reset</button>
          </div>
          <div className="sqv-ops" data-testid="sqv-ops">
            <div className="sqv-input-row">
              <input
                type="number"
                placeholder={isStack ? 'Push value' : 'Enqueue value'}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                className="sqv-input"
                data-testid="sqv-input"
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
      <div className={`sqv-container ${isStack ? 'sqv-stack' : 'sqv-queue'}`} data-testid="sqv-container">
        <div className="sqv-structure">
          {isStack ? (
            <>
              <div className="sqv-top-label">TOP</div>
              <div className="sqv-items sqv-stack-items" data-testid="sqv-items">
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
            <div className="sqv-items sqv-queue-items" data-testid="sqv-items">
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
    </VisualizerFrame>
  );
}

export default StackQueueVisualizer;
