import React, { useState, useEffect, useRef } from 'react';
import { VisualizerFrame } from './VisualizerFrame';
import {
  type Graph,
  type GraphNodeId,
  type GraphStep,
  PRESET_GRAPHS,
  findStartNode,
} from '../../engines/treegraph';
import { computeGraphTraversal, type TraversalResult, type TraversalType } from '../../engines/treegraph';

type DrawState = {
  visited: Set<GraphNodeId>;
  frontier: Set<GraphNodeId>;
  current: GraphNodeId | null;
  enqueued: Set<GraphNodeId>;
  popped: Set<GraphNodeId>;
  pending: GraphNodeId[];
};

function drawGraph(
  canvas: HTMLCanvasElement | null,
  graph: Graph,
  ds: DrawState
) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.offsetWidth;
  const h = canvas.offsetHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);

  const getCS = (v: string) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  const border = getCS('--color-border') || '#e5e7eb';
  const text = getCS('--color-text') || '#1f2937';
  const primary = getCS('--color-primary') || '#2563eb';
  const surface = getCS('--color-surface') || '#ffffff';
  const visited = '#16a34a';
  const frontier = '#d97706';

  const positions = new Map<GraphNodeId, { x: number; y: number }>();
  for (const n of graph.nodes) positions.set(n.id, { x: n.x, y: n.y });

  for (const edge of graph.edges) {
    const from = positions.get(edge.from);
    const to = positions.get(edge.to);
    if (!from || !to) continue;
    const isEnqueued = ds.enqueued.has(edge.from) && ds.enqueued.has(edge.to);
    ctx.strokeStyle = isEnqueued ? frontier : border;
    ctx.lineWidth = isEnqueued ? 3 : 1.5;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();

    const mx = (from.x + to.x) / 2;
    const my = (from.y + to.y) / 2;
    const len = Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2);
    if (len > 0) {
      ctx.fillStyle = surface;
      ctx.fillRect(mx - 10, my - 9, 20, 18);
      ctx.fillStyle = text;
      ctx.font = '10px system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(edge.weight), mx, my);
    }
  }

  for (const n of graph.nodes) {
    const pos = positions.get(n.id)!;
    const isVisited = ds.visited.has(n.id);
    const isFrontier = ds.frontier.has(n.id);
    const isCurrent = ds.current === n.id;

    if (isCurrent) {
      ctx.fillStyle = primary;
      ctx.strokeStyle = primary;
    } else if (isVisited) {
      ctx.fillStyle = visited;
      ctx.strokeStyle = visited;
    } else if (isFrontier) {
      ctx.fillStyle = frontier;
      ctx.strokeStyle = frontier;
    } else {
      ctx.fillStyle = surface;
      ctx.strokeStyle = border;
    }

    ctx.lineWidth = isCurrent ? 3 : 2;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, isCurrent ? 20 : 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = isCurrent || isVisited ? '#ffffff' : text;
    ctx.font = `bold ${isCurrent ? 14 : 12}px system-ui`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(n.id, pos.x, pos.y);
  }
}

export function GraphTraversalVisualizer() {
  const [presetIdx, setPresetIdx] = useState(0);
  const [algo, setAlgo] = useState<TraversalType>('bfs');
  const [result, setResult] = useState<TraversalResult | null>(null);
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const graph: Graph = {
    nodes: PRESET_GRAPHS[presetIdx].nodes,
    edges: PRESET_GRAPHS[presetIdx].edges,
  };
  const startNode = findStartNode(graph);

  useEffect(() => {
    setStepIdx(0);
    setIsPlaying(false);
    const res = computeGraphTraversal(algo, graph, startNode);
    setResult(res);
  }, [presetIdx, algo, graph, startNode]);

  useEffect(() => {
    if (!result) return;
    const step = stepIdx > 0 && stepIdx <= result.steps.length ? result.steps[stepIdx - 1] : null;
    const ds: DrawState = {
      visited: new Set(step?.visited ?? []),
      frontier: new Set(step?.frontier ?? (step?.queue ?? step?.stack ?? [])),
      current: stepIdx > 0 && stepIdx <= result.steps.length ? result.steps[stepIdx - 1].node : null,
      enqueued: new Set(
        result.steps.slice(0, stepIdx).filter(s => s.action === 'enqueue' || s.action === 'push').map(s => s.node)
      ),
      popped: new Set(
        result.steps.slice(0, stepIdx).filter(s => s.action === 'pop').map(s => s.node)
      ),
      pending: [],
    };
    drawGraph(canvasRef.current, graph, ds);
  }, [result, stepIdx, graph]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (isPlaying && result && stepIdx < result.steps.length) {
      timerRef.current = setTimeout(() => setStepIdx(i => i + 1), 800);
    } else if (result && stepIdx >= result.steps.length) {
      setIsPlaying(false);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [isPlaying, stepIdx, result]);

  const handlePlay = () => {
    if (stepIdx >= (result?.steps.length ?? 0)) setStepIdx(0);
    setIsPlaying(true);
  };

  const handleStep = () => {
    if (!result) return;
    if (stepIdx >= result.steps.length) setStepIdx(0);
    else setStepIdx(i => i + 1);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setStepIdx(0);
  };

  const message = result && stepIdx > 0 && stepIdx <= result.steps.length ? result.steps[stepIdx - 1].message : result ? 'Press play to start' : '';

  return (
    <VisualizerFrame
      title="Graph Traversal"
      description={message}
      controls={
        <>
          <div className="gtv-presets">
            {PRESET_GRAPHS.map((p, i) => (
              <button key={p.label} onClick={() => setPresetIdx(i)} className={`gtv-btn ${presetIdx === i ? 'active' : ''}`}>
                {p.label}
              </button>
            ))}
          </div>
          <div className="gtv-controls">
            <div className="gtv-algo">
              <button onClick={() => setAlgo('bfs')} className={`gtv-btn ${algo === 'bfs' ? 'active' : ''}`}>BFS</button>
              <button onClick={() => setAlgo('dfs')} className={`gtv-btn ${algo === 'dfs' ? 'active' : ''}`}>DFS</button>
            </div>
            <div className="gtv-playback">
              <button onClick={handleReset} className="gtv-btn">Reset</button>
              <button onClick={handleStep} className="gtv-btn">Step</button>
              <button onClick={handlePlay} className="gtv-btn gtv-btn-primary">{isPlaying ? 'Pause' : 'Play'}</button>
            </div>
          </div>
        </>
      }
      isEmpty={false}
    >
      <div className="gtv-canvas-wrap" data-testid="gtv-canvas">
        <canvas ref={canvasRef} className="gtv-canvas" width={560} height={320} />
      </div>
      <div className="gtv-legend" data-testid="gtv-legend">
        <span className="gtv-legend-item gtv-legend-pending">Pending</span>
        <span className="gtv-legend-item gtv-legend-frontier">Frontier</span>
        <span className="gtv-legend-item gtv-legend-visited">Visited</span>
        <span className="gtv-legend-item gtv-legend-current">Current</span>
      </div>

      <style>{`
        .gtv-presets { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
        .gtv-controls { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; justify-content: space-between; }
        .gtv-algo { display: flex; gap: 8px; }
        .gtv-playback { display: flex; gap: 8px; }
        .gtv-btn { padding: 6px 12px; border-radius: 6px; border: 1px solid var(--color-border); background: var(--color-surface); color: var(--color-text); font-size: 0.8125rem; cursor: pointer; transition: all 0.15s; }
        .gtv-btn:hover { border-color: var(--color-primary); }
        .gtv-btn.active { background: var(--color-primary); border-color: var(--color-primary); color: white; }
        .gtv-btn-primary { background: var(--color-primary); border-color: var(--color-primary); color: white; }
        .gtv-canvas-wrap { width: 100%; display: flex; justify-content: center; }
        .gtv-canvas { width: 100%; max-width: 560px; height: 320px; border-radius: var(--radius-md); background: var(--color-bg); }
        .gtv-legend { display: flex; gap: 16px; justify-content: center; margin-top: 8px; font-size: 0.75rem; color: var(--color-text); }
        .gtv-legend-item::before { content: '■'; margin-right: 4px; }
        .gtv-legend-pending::before { color: var(--color-border); }
        .gtv-legend-frontier::before { color: #d97706; }
        .gtv-legend-visited::before { color: #16a34a; }
        .gtv-legend-current::before { color: var(--color-primary); }
      `}</style>
    </VisualizerFrame>
  );
}

export default GraphTraversalVisualizer;