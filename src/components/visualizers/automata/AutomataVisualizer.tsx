import React, { useState, useEffect, useRef, useCallback } from 'react';
import { VisualizerFrame } from '../VisualizerFrame';
import type { AutomatonPreset } from './types';
import { AUTOMATA_PRESETS, getPresetData } from './presets';
import { drawAutomaton } from './render';
import { createAutomaton, simulateStep, simulateFull, type SimulationState } from '../../../engines/theory/automata-ops';
import './automata-visualizer.css';
import { useDebugState } from '../../../lib/useDebugState';

export function AutomataVisualizer() {
  const [automaton, setAutomaton] = useState(() => createAutomaton('dfa', [], [], [], '', []));
  const [simState, setSimState] = useState<SimulationState | null>(null);
  const [inputStr, setInputStr] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useDebugState(
    'Automata',
    simState ? { automatonType: simState.automaton?.type, currentStates: simState.currentStates, inputIndex: simState.inputIndex, accepted: simState.accepted, message: simState.message } : null,
    null, simState?.inputIndex ?? 0, simState?.automaton?.alphabet?.length ?? 0, { type: simState?.automaton?.type }, {}
  );

  useEffect(() => {
    drawAutomaton(canvasRef.current, automaton, simState);
  }, [automaton, simState]);

  const handlePreset = useCallback((preset: typeof AUTOMATA_PRESETS[0]) => {
    const data = getPresetData(preset);
    const auto = createAutomaton(preset.type, data.states, data.alphabet, data.transitions, data.startState, data.acceptStates);
    setAutomaton(auto);
    setSimState(null);
    setInputStr(preset.testInputs[0] || '');
  }, []);

  const handleSimulate = useCallback(() => {
    if (!inputStr) return;
    const sim: SimulationState = {
      automaton,
      input: inputStr,
      currentStates: [automaton.startState],
      inputIndex: 0,
      history: [],
      message: `Starting simulation with input "${inputStr}"`,
      accepted: null,
    };
    setSimState(simulateFull(sim));
  }, [automaton, inputStr]);

  const handleTestInput = useCallback((input: string) => {
    setInputStr(input);
    const sim: SimulationState = {
      automaton, input, currentStates: [automaton.startState],
      inputIndex: 0, history: [],
      message: `Testing "${input}"`, accepted: null,
    };
    setSimState(simulateFull(sim));
  }, [automaton]);

  const handleReset = useCallback(() => {
    setSimState(null);
    setInputStr('');
  }, []);

  return (
    <VisualizerFrame
      title="DFA/NFA Simulator"
      description="Simulate deterministic and nondeterministic finite automata. Enter an input string and watch the state transitions."
      controls={
        <>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }} data-testid="atv-presets">
            {AUTOMATA_PRESETS.map((p) => (
              <button key={p.label} onClick={() => handlePreset(p)} className="at-toggle-btn" style={{ fontSize: '0.75rem', padding: '4px 8px' }}>
                {p.label}
              </button>
            ))}
          </div>
        </>
      }
      isEmpty={automaton.states.length === 0}
      emptyMessage="Select a preset to load an automaton"
    >
      <div className="at-container" data-testid="at-container">
        <div className="at-canvas-wrap" data-testid="at-canvas-wrap">
          <canvas ref={canvasRef} className="at-canvas" width={560} height={250} />
        </div>

        <div className="at-controls" data-testid="at-controls">
          <input type="text" value={inputStr} onChange={e => setInputStr(e.target.value)} placeholder="Input string" className="at-input" data-testid="at-input" />
          <button onClick={handleSimulate} className="viz-btn viz-btn-primary">Simulate</button>
          <button onClick={handleReset} className="viz-btn viz-btn-secondary">Reset</button>
        </div>

        {simState?.accepted !== null && simState?.accepted !== undefined && (
          <div className={`at-result ${simState.accepted ? 'accept' : 'reject'}`} data-testid="at-result">
            {simState.accepted ? '✓ Accepted' : '✗ Rejected'}
          </div>
        )}

        {AUTOMATA_PRESETS.find(p => p.label === automaton.states[0]?.id) && (
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {AUTOMATA_PRESETS[0].testInputs.map(inp => (
              <button key={inp} onClick={() => handleTestInput(inp)} className="at-toggle-btn" style={{ fontSize: '0.6875rem', padding: '2px 6px' }}>
                "{inp || 'ε'}"
              </button>
            ))}
          </div>
        )}

        {simState && simState.history.length > 0 && (
          <div className="at-history" data-testid="at-history">
            {simState.history.map((h, i) => (
              <div key={i} className="at-history-entry">{h.message}</div>
            ))}
          </div>
        )}
      </div>
    </VisualizerFrame>
  );
}

export default AutomataVisualizer;
