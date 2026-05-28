import React, { useState, useEffect, useRef, useCallback } from 'react';
import { VisualizerFrame } from '../VisualizerFrame';
import type { SchedulingPreset } from './types';
import { SCHEDULING_PRESETS } from './presets';
import { drawGanttChart, drawProcessTable } from './render';
import { createSchedulingState, computeSchedule, createProcess } from '../../../engines/system-process/cpu-scheduling-ops';
import type { SchedulingState } from '../../../engines/system-process/cpu-scheduling-ops';
import './cpu-scheduling-visualizer.css';

export function CPUSchedulingVisualizer() {
  const [state, setState] = useState<SchedulingState | null>(null);
  const [algorithm, setAlgorithm] = useState<'fcfs' | 'sjf' | 'srtf' | 'priority' | 'round-robin'>('fcfs');
  const [quantum, setQuantum] = useState(2);
  const ganttRef = useRef<HTMLCanvasElement>(null);
  const tableRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (state && state.ganttChart.length > 0) {
      const maxTime = Math.max(...state.ganttChart.map(e => e.endTime));
      drawGanttChart(ganttRef.current, state.ganttChart, maxTime);
      drawProcessTable(tableRef.current, state.processes);
    }
  }, [state]);

  const handleRun = useCallback(() => {
    if (!state) return;
    const result = computeSchedule(state);
    setState(result);
  }, [state]);

  const handlePreset = useCallback((preset: SchedulingPreset) => {
    setAlgorithm(preset.algorithm);
    if (preset.quantum) setQuantum(preset.quantum);
    const processes = preset.processes.map(p => createProcess(p.id, p.arrival, p.burst, p.priority || 0));
    const newState = createSchedulingState(processes, preset.algorithm, preset.quantum || 2);
    setState(newState);
  }, []);

  const handleReset = useCallback(() => {
    setState(null);
  }, []);

  const isEmpty = !state;

  return (
    <VisualizerFrame
      title="CPU Scheduling Algorithms"
      description="Compare FCFS, SJF, SRTF, Priority, and Round Robin scheduling with Gantt charts."
      controls={
        <>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
            {SCHEDULING_PRESETS.map((p) => (
              <button key={p.label} onClick={() => handlePreset(p)} className="cs-algo-btn" style={{ fontSize: '0.75rem', padding: '4px 8px' }}>
                {p.label}
              </button>
            ))}
          </div>
        </>
      }
      isEmpty={isEmpty}
      emptyMessage="Select a preset to load processes, then click Run"
    >
      <div className="cs-container">
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {(['fcfs', 'sjf', 'srtf', 'priority', 'round-robin'] as const).map((algo) => (
            <button key={algo} onClick={() => setAlgorithm(algo)} className={`cs-algo-btn ${algorithm === algo ? 'active' : ''}`}>
              {algo.toUpperCase()}
            </button>
          ))}
          {algorithm === 'round-robin' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <label style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>Quantum:</label>
              <input type="number" min="1" max="10" value={quantum} onChange={e => setQuantum(parseInt(e.target.value) || 2)} style={{ width: '50px', padding: '4px 6px', borderRadius: '4px', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)', fontSize: '0.8125rem' }} />
            </div>
          )}
        </div>

        <div className="cs-controls">
          <button onClick={handleRun} style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid var(--color-primary)', background: 'var(--color-primary)', color: 'white', fontSize: '0.8125rem', cursor: 'pointer' }}>Run</button>
          <button onClick={handleReset} style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)', fontSize: '0.8125rem', cursor: 'pointer' }}>Reset</button>
          {state && (
            <>
              <div className="cs-metric"><span className="cs-metric-label">Processes</span><span className="cs-metric-value">{state.processes.length}</span></div>
              <div className="cs-metric"><span className="cs-metric-label">Completed</span><span className="cs-metric-value">{state.completed.length}</span></div>
            </>
          )}
        </div>

        {state && state.ganttChart.length > 0 && (
          <>
            <div className="cs-gantt-wrap">
              <canvas ref={ganttRef} className="cs-gantt-canvas" width={560} height={80} />
            </div>
            <div className="cs-table-wrap">
              <canvas ref={tableRef} className="cs-table-canvas" width={560} height={120} />
            </div>
          </>
        )}
      </div>
    </VisualizerFrame>
  );
}

export default CPUSchedulingVisualizer;
