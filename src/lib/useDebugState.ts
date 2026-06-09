import { useEffect, useRef } from 'react';

interface DebugInfo {
  vizName: string;
  state: Record<string, unknown> | null;
  step: Record<string, unknown> | null;
  stepIndex: number;
  totalSteps: number;
  metadata: Record<string, unknown>;
  renderOutput: Record<string, unknown>;
  lastRenderTime: number;
}

/**
 * Expose visualizer state to the debug panel via window.__VIS_DEBUG__.
 * Call this hook at the top of every visualizer component.
 *
 * @param vizName - Human-readable name for the debug panel title
 * @param state - Current visualizer state object
 * @param step - Current step data (or null)
 * @param stepIndex - Current step index (0-based)
 * @param totalSteps - Total number of steps
 * @param metadata - Any extra metadata to display
 * @param renderOutput - Render-specific output data (bar count, node count, etc.)
 */
export function useDebugState(
  vizName: string,
  state: Record<string, unknown> | null,
  step: Record<string, unknown> | null,
  stepIndex: number,
  totalSteps: number,
  metadata: Record<string, unknown> = {},
  renderOutput: Record<string, unknown> = {}
) {
  const renderStart = useRef(performance.now());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const info: DebugInfo = {
      vizName,
      state,
      step,
      stepIndex,
      totalSteps,
      metadata,
      renderOutput,
      lastRenderTime: performance.now() - renderStart.current,
    };
    const w = window as { __VIS_DEBUG__?: DebugInfo };
    w.__VIS_DEBUG__ = info;
    renderStart.current = performance.now();
  }, [vizName, state, step, stepIndex, totalSteps, metadata, renderOutput]);
}
