import React, { useState, useCallback } from 'react';
import { VisualizerFrame } from '../VisualizerFrame';
import type { ExpressionPreset } from './types';
import { EXPRESSION_PRESETS } from './presets';
import {
  runFullConversion,
  stepForward,
  type ExpressionState,
} from '../../../engines/sequence/expression-ops';
import './expression-visualizer.css';

export function ExpressionVisualizer() {
  const [state, setState] = useState<ExpressionState>({ input: '', output: '', stack: [], steps: [], currentStep: -1, highlightStackIndex: null, message: 'Enter an infix expression' });
  const [inputExpr, setInputExpr] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleConvert = useCallback(() => {
    setError(null);
    if (!inputExpr.trim()) {
      setError('Enter an expression');
      return;
    }
    try {
      const newState = runFullConversion(inputExpr);
      setState(newState);
    } catch {
      setError('Invalid expression');
    }
  }, [inputExpr]);

  const handleStep = useCallback(() => {
    setState(prev => stepForward(prev));
  }, []);

  const handleReset = useCallback(() => {
    setState({ input: '', output: '', stack: [], steps: [], currentStep: -1, highlightStackIndex: null, message: 'Enter an infix expression' });
    setInputExpr('');
    setError(null);
  }, []);

  const handlePreset = useCallback((preset: ExpressionPreset) => {
    setInputExpr(preset.expression);
    setError(null);
    try {
      const newState = runFullConversion(preset.expression);
      setState(newState);
    } catch {
      setError('Invalid expression');
    }
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleConvert();
  }, [handleConvert]);

  const isEmpty = state.steps.length === 0;

  return (
    <VisualizerFrame
      title="Infix to Postfix Conversion"
      description="Visualize the stack-based algorithm to convert infix expressions to postfix (Reverse Polish Notation)."
      controls={
        <>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }} data-testid="exv-presets">
            {EXPRESSION_PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => handlePreset(p)}
                className="exp-toggle-btn"
                style={{ fontSize: '0.75rem', padding: '4px 8px' }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </>
      }
      isEmpty={isEmpty}
      emptyMessage="Select a preset or enter an expression"
    >
      <div className="exp-container" data-testid="exp-container">
        <div className="exp-input-row" data-testid="exp-input-row">
          <div className="exp-field">
            <label htmlFor="exp-input">Infix Expression</label>
            <input
              id="exp-input"
              type="text"
              value={inputExpr}
              onChange={e => setInputExpr(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. A+B*C"
              className="exp-expression-input"
              data-testid="exp-input"
            />
          </div>
          <button onClick={handleConvert} style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid var(--color-primary)', background: 'var(--color-primary)', color: 'white', fontSize: '0.8125rem', cursor: 'pointer', alignSelf: 'flex-end' }}>Convert</button>
          <button onClick={handleStep} style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)', fontSize: '0.8125rem', cursor: 'pointer', alignSelf: 'flex-end' }}>Step</button>
          <button onClick={handleReset} style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)', fontSize: '0.8125rem', cursor: 'pointer', alignSelf: 'flex-end' }}>Reset</button>
        </div>

        {error && <div className="exp-error">{error}</div>}

        {!isEmpty && (
          <>
            <div className="exp-stack-area" data-testid="exp-stack-area">
              <div className="exp-stack-wrap">
                <span className="exp-stack-label">Stack</span>
                <div className="exp-stack" data-testid="exp-stack">
                  {state.stack.length === 0 ? (
                    <div className="exp-stack-item empty">Empty</div>
                  ) : (
                    state.stack.map((item, i) => (
                      <div
                        key={i}
                        className={`exp-stack-item ${i === state.highlightStackIndex ? 'highlight' : ''}`}
                      >
                        {item}
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="exp-output-wrap" data-testid="exp-output-wrap">
                <span className="exp-output-label">Postfix Output</span>
                <div className="exp-output">{state.output || '—'}</div>
              </div>
            </div>

            <div className="exp-steps" data-testid="exp-steps">
              {state.steps.map((step, i) => (
                <div
                  key={i}
                  className={`exp-step ${i === state.currentStep ? 'current' : ''}`}
                >
                  {step.message}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </VisualizerFrame>
  );
}

export default ExpressionVisualizer;
