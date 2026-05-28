import React, { useState, useEffect, useRef, useCallback } from 'react';
import { VisualizerFrame } from '../VisualizerFrame';
import type { AVLPreset } from './types';
import { AVL_PRESETS } from './presets';
import { drawAVLTree } from './render';
import { createAVLState, avlInsert, type AVLState } from '../../../engines/treegraph/avl-ops';
import './avl-visualizer.css';

export function AVLVisualizer() {
  const [state, setState] = useState<AVLState>(createAVLState());
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawAVLTree(canvasRef.current, state.root, state.highlightNode);
  }, [state]);

  const handleInsert = useCallback(() => {
    setError(null);
    const val = parseInt(inputValue, 10);
    if (isNaN(val)) { setError('Enter a valid integer'); return; }
    setState(prev => avlInsert(prev, val));
    setInputValue('');
  }, [inputValue]);

  const handleReset = useCallback(() => {
    setState(createAVLState());
    setInputValue('');
    setError(null);
  }, []);

  const handlePreset = useCallback((preset: AVLPreset) => {
    let newState = createAVLState();
    for (const op of preset.operations) {
      if (op.type === 'insert') {
        newState = avlInsert(newState, op.value);
      }
    }
    setState(newState);
    setInputValue('');
    setError(null);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleInsert();
  }, [handleInsert]);

  return (
    <VisualizerFrame
      title="AVL Tree — Self-Balancing BST"
      description="Watch the tree rebalance itself with rotations after each insertion. Height difference never exceeds 1."
      controls={
        <>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
            {AVL_PRESETS.map((p) => (
              <button key={p.label} onClick={() => handlePreset(p)} className="avl-toggle-btn" style={{ fontSize: '0.75rem', padding: '4px 8px' }}>
                {p.label}
              </button>
            ))}
          </div>
        </>
      }
      isEmpty={!state.root}
      emptyMessage="Insert values or load a preset to build an AVL tree"
    >
      <div className="avl-container">
        <div className="avl-controls">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>Value</label>
            <input type="number" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder="e.g. 50" style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)', fontSize: '0.875rem', fontFamily: 'var(--font-mono)', width: '80px' }} />
          </div>
          <button onClick={handleInsert} style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid var(--color-primary)', background: 'var(--color-primary)', color: 'white', fontSize: '0.8125rem', cursor: 'pointer' }}>Insert</button>
          <button onClick={handleReset} style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)', fontSize: '0.8125rem', cursor: 'pointer' }}>Reset</button>
        </div>

        {error && <div className="avl-error">{error}</div>}

        <div className="avl-canvas-wrap">
          <canvas ref={canvasRef} className="avl-canvas" width={560} height={300} />
        </div>

        {state.steps.length > 0 && (
          <div className="avl-steps">
            {state.steps.slice(-5).map((step, i) => (
              <div key={i} className="avl-step">{step.message}</div>
            ))}
          </div>
        )}
      </div>
    </VisualizerFrame>
  );
}

export default AVLVisualizer;
