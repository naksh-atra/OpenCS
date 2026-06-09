import React, { useState, useEffect, useRef, useCallback } from 'react';
import { VisualizerFrame } from '../VisualizerFrame';
import type { GraphRepPreset } from './types';
import { GRAPH_REP_PRESETS } from './presets';
import { drawGraphDiagram, drawAdjacencyMatrix, drawAdjacencyList } from './render';
import './graph-rep-visualizer.css';
import { useDebugState } from '../../../lib/useDebugState';

export function GraphRepVisualizer() {
  const [presetIdx, setPresetIdx] = useState(0);
  const [highlightVertex, setHighlightVertex] = useState<number | null>(null);
  const diagramRef = useRef<HTMLCanvasElement>(null);
  const matrixRef = useRef<HTMLCanvasElement>(null);
  const listRef = useRef<HTMLCanvasElement>(null);

  const preset = GRAPH_REP_PRESETS[presetIdx];

  useDebugState(
    'GraphRep',
    { preset: GRAPH_REP_PRESETS[presetIdx].label, presetIdx, highlightVertex },
    null, 0, 0, { nodeCount: preset.nodes?.length ?? 0, edgeCount: preset.edges?.length ?? 0 }, {}
  );

  useEffect(() => {
    drawGraphDiagram(diagramRef.current, preset, highlightVertex);
  }, [preset, highlightVertex]);

  useEffect(() => {
    drawAdjacencyMatrix(matrixRef.current, preset, null);
  }, [preset]);

  useEffect(() => {
    drawAdjacencyList(listRef.current, preset, highlightVertex);
  }, [preset, highlightVertex]);

  return (
    <VisualizerFrame
      title="Graph Representations"
      description="Compare adjacency matrix vs adjacency list representations. Hover over vertices to highlight connections."
      controls={
        <>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }} data-testid="grv-presets">
            {GRAPH_REP_PRESETS.map((p, i) => (
              <button key={p.label} onClick={() => { setPresetIdx(i); setHighlightVertex(null); }} className={`gr-toggle-btn ${i === presetIdx ? 'active' : ''}`} style={{ fontSize: '0.75rem', padding: '4px 8px' }}>
                {p.label}
              </button>
            ))}
          </div>
        </>
      }
      isEmpty={false}
    >
      <div className="gr-container" data-testid="gr-container">
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }} data-testid="gr-vertex-selector">
          {Array.from({ length: preset.vertices }, (_, i) => (
            <button key={i} onClick={() => setHighlightVertex(highlightVertex === i ? null : i)} style={{ padding: '4px 10px', borderRadius: '4px', border: '1px solid var(--color-border)', background: highlightVertex === i ? '#fef3c7' : 'var(--color-surface)', color: 'var(--color-text)', fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}>
              {i}
            </button>
          ))}
        </div>

        <div className="gr-diagram-wrap" data-testid="gr-diagram-wrap">
          <canvas ref={diagramRef} className="gr-diagram-canvas" width={360} height={220} />
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '0.8125rem', color: 'var(--color-text)' }}>Adjacency Matrix</h4>
          <div className="gr-matrix-wrap" data-testid="gr-matrix-wrap">
            <canvas ref={matrixRef} className="gr-matrix-canvas" width={360} height={120} />
          </div>
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '0.8125rem', color: 'var(--color-text)' }}>Adjacency List</h4>
          <div className="gr-list-wrap" data-testid="gr-list-wrap">
            <canvas ref={listRef} className="gr-list-canvas" width={560} height={100} />
          </div>
        </div>
      </div>
    </VisualizerFrame>
  );
}

export default GraphRepVisualizer;
