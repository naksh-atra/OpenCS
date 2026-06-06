import React, { useState, useCallback } from 'react';
import { VisualizerFrame } from '../VisualizerFrame';
import type { HashingPreset, HashMethod } from './types';
import { HASHING_PRESETS, METHOD_OPTIONS } from './presets';
import {
  createHashingState,
  hashInsert,
  hashSearch,
  hashDelete,
  hashRehash,
  getLoadFactor,
  type HashingState,
} from '../../../engines/sequence/hashing-ops';
import './hashing-visualizer.css';

export function HashingVisualizer() {
  const [state, setState] = useState<HashingState>(() => createHashingState('linear', 7));
  const [inputKey, setInputKey] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleMethodChange = useCallback((method: HashMethod) => {
    setState(createHashingState(method, 7));
    setInputKey('');
    setError(null);
  }, []);

  const handleInsert = useCallback(() => {
    setError(null);
    const key = parseInt(inputKey, 10);
    if (isNaN(key) || key < 0) {
      setError('Enter a valid positive integer key');
      return;
    }
    setState(prev => hashInsert(prev, key, `v${key}`));
    setInputKey('');
  }, [inputKey]);

  const handleSearch = useCallback(() => {
    setError(null);
    const key = parseInt(inputKey, 10);
    if (isNaN(key) || key < 0) {
      setError('Enter a valid positive integer key');
      return;
    }
    setState(prev => hashSearch(prev, key));
    setInputKey('');
  }, [inputKey]);

  const handleDelete = useCallback(() => {
    setError(null);
    const key = parseInt(inputKey, 10);
    if (isNaN(key) || key < 0) {
      setError('Enter a valid positive integer key');
      return;
    }
    setState(prev => hashDelete(prev, key));
    setInputKey('');
  }, [inputKey]);

  const handleRehash = useCallback(() => {
    setState(prev => hashRehash(prev));
    setError(null);
  }, []);

  const handleReset = useCallback(() => {
    setState(createHashingState(state.method, 7));
    setInputKey('');
    setError(null);
  }, [state.method]);

  const handlePreset = useCallback((preset: HashingPreset) => {
    let newState = createHashingState(preset.method, preset.size);
    for (const key of preset.keys) {
      newState = hashInsert(newState, key, `v${key}`);
    }
    setState(newState);
    setInputKey('');
    setError(null);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleInsert();
  }, [handleInsert]);

  const loadFactor = getLoadFactor(state);
  const isHighLoad = loadFactor > 0.7;
  const isFull = loadFactor >= 1;

  const renderCell = (entry: typeof state.table[0], index: number) => {
    const isHighlight = state.highlightIndex === index;
    const isProbe = state.highlightProbeSequence.includes(index);

    if (state.method === 'chaining' && entry.state === 'occupied') {
      // Show chain — simplified: just show the key
      return (
        <div
          key={index}
          className={`hs-cell ${entry.state} ${isHighlight ? 'highlight' : ''} ${isProbe && !isHighlight ? 'probe' : ''}`}
        >
          <span className="hs-chain">
            <span className="hs-chain-node">{entry.key}</span>
          </span>
        </div>
      );
    }

    return (
      <div
        key={index}
        className={`hs-cell ${entry.state} ${isHighlight ? 'highlight' : ''} ${isProbe && !isHighlight ? 'probe' : ''}`}
      >
        {entry.state === 'empty' ? '—' : entry.state === 'deleted' ? `δ (${entry.key})` : entry.key}
      </div>
    );
  };

  return (
    <VisualizerFrame
      title="Hash Tables & Collision Resolution"
      description={`${state.method.charAt(0).toUpperCase() + state.method.slice(1)} probing — Load factor: ${loadFactor.toFixed(2)} (${state.count}/${state.size})`}
      controls={
        <>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }} data-testid="hsv-presets">
            {HASHING_PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => handlePreset(p)}
                className="hs-toggle-btn"
                style={{
                  padding: '4px 8px',
                  borderRadius: '6px',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-surface)',
                  color: 'var(--color-text)',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </>
      }
      isEmpty={false}
    >
      <div className="hs-container" data-testid="hs-container">
        {/* Method selector */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }} data-testid="hsv-method-selector">
          {METHOD_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleMethodChange(opt.value)}
              title={opt.desc}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid var(--color-border)',
                background: state.method === opt.value ? 'var(--color-primary)' : 'var(--color-surface)',
                color: state.method === opt.value ? 'white' : 'var(--color-text)',
                fontSize: '0.8125rem',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="hs-controls" data-testid="hs-controls">
          <div className="hs-field" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>Key</label>
            <input
              type="number"
              min="0"
              value={inputKey}
              onChange={e => setInputKey(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. 50"
              data-testid="hs-input"
              style={{
                padding: '8px 10px',
                borderRadius: '6px',
                border: '1px solid var(--color-border)',
                background: 'var(--color-surface)',
                color: 'var(--color-text)',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-mono)',
                width: '100px',
              }}
            />
          </div>
          <button onClick={handleInsert} className="viz-btn viz-btn-primary">Insert</button>
          <button onClick={handleSearch} className="viz-btn viz-btn-secondary">Search</button>
          <button onClick={handleDelete} className="viz-btn viz-btn-secondary">Delete</button>
          <button onClick={handleRehash} className="viz-btn viz-btn-secondary">Rehash</button>
          <button onClick={handleReset} className="viz-btn viz-btn-secondary">Reset</button>

          <div className="hs-metric" data-testid="hs-load-factor">
            <span className="hs-metric-label">Load Factor</span>
            <span className={`hs-metric-value ${isFull ? 'danger' : isHighLoad ? 'warn' : ''}`}>{loadFactor.toFixed(2)}</span>
          </div>
        </div>

        {error && <div className="hs-error">{error}</div>}

        {/* Hash Table */}
        <div className="hs-table-wrap" data-testid="hs-table-wrap">
          <div className="hs-header-row">
            <span>Index</span>
            <span>Key</span>
            <span>Status</span>
          </div>
          <div className="hs-table" data-testid="hs-table">
            {state.table.map((entry, i) => (
              <div key={i} className="hs-row">
                <span className="hs-index">{i}</span>
                {renderCell(entry, i)}
                <span className={`hs-status ${entry.state}`}>
                  {entry.state === 'empty' ? 'Empty' : entry.state === 'deleted' ? 'Deleted' : 'Occupied'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Probe visualization for open addressing */}
        {state.method !== 'chaining' && state.highlightProbeSequence.length > 0 && (
          <div style={{ padding: '8px 12px', background: 'var(--color-bg)', borderRadius: '6px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text)' }}>
            Probe sequence: {state.highlightProbeSequence.map(i => `[${i}]`).join(' → ')}
          </div>
        )}

        {/* History */}
        {state.history.length > 0 && (
          <div className="hs-history" data-testid="hs-history">
            {state.history.map((entry, i) => (
              <div key={i} className="hs-history-entry">{entry}</div>
            ))}
          </div>
        )}
      </div>
    </VisualizerFrame>
  );
}

export default HashingVisualizer;
