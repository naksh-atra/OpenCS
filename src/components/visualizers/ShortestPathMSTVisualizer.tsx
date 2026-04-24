import React, { useState, useEffect, useRef } from 'react';
import { VisualizerFrame } from './VisualizerFrame';
import {
  type Graph,
  type GraphNodeId,
  type GraphEdge,
  type GraphStep,
  PRESET_GRAPHS,
  findStartNode,
} from '../../engines/treegraph';
import {
  computeDijkstra,
  computePrim,
  type AlgorithmType,
  type PathResult,
  type MSTResult,
} from '../../engines/treegraph';

type DrawState = {
  visited: Set<GraphNodeId>;
  settled: Set<GraphNodeId>;
  current: GraphNodeId | null;
  mstEdges: GraphEdge[];
  relaxedEdges: { from: GraphNodeId; to: GraphNodeId }[];
  path: GraphNodeId[];
};

function drawGraph(
  canvas: HTMLCanvasElement | null,
  graph: Graph,
  ds: DrawState,
  distances: Map<GraphNodeId, number>,
  algo: AlgorithmType
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
  const mst = '#7c3aed';
  const relaxed = '#d97706';

  const positions = new Map<GraphNodeId, { x: number; y: number }>();
  for (const n of graph.nodes) positions.set(n.id, { x: n.x, y: n.y });

  for (const edge of graph.edges) {
    const from = positions.get(edge.from);
    const to = positions.get(edge.to);
    if (!from || !to) continue;

    const isMSTEdge = ds.mstEdges.some(
      e => (e.from === edge.from && e.to === edge.to) || (e.from === edge.to && e.to === edge.from)
    );
    const isRelaxed = ds.relaxedEdges.some(
      e => (e.from === edge.from && e.to === edge.to) || (e.from === edge.to && e.to === edge.from)
    );
    const isPath = ds.path.includes(edge.from) && ds.path.includes(edge.to) &&
      Math.abs(ds.path.indexOf(edge.from) - ds.path.indexOf(edge.to)) === 1;

    if (isMSTEdge) {
      ctx.strokeStyle = mst;
      ctx.lineWidth = 3;
    } else if (isRelaxed) {
      ctx.strokeStyle = relaxed;
      ctx.lineWidth = 2;
    } else if (isPath) {
      ctx.strokeStyle = primary;
      ctx.lineWidth = 3;
    } else {
      ctx.strokeStyle = border;
      ctx.lineWidth = 1.5;
    }

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
      ctx.fillStyle = isMSTEdge ? mst : text;
      ctx.font = '10px system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(edge.weight), mx, my);
    }
  }

  for (const n of graph.nodes) {
    const pos = positions.get(n.id)!;
    const isVisited = ds.visited.has(n.id);
    const isSettled = ds.settled.has(n.id);
    const isCurrent = ds.current === n.id;
    const dist = distances.get(n.id);

    if (isCurrent) {
      ctx.fillStyle = primary;
      ctx.strokeStyle = primary;
    } else if (isSettled) {
      ctx.fillStyle = visited;
      ctx.strokeStyle = visited;
    } else if (isVisited) {
      ctx.fillStyle = relaxed;
      ctx.strokeStyle = relaxed;
    } else {
      ctx.fillStyle = surface;
      ctx.strokeStyle = border;
    }

    ctx.lineWidth = isCurrent ? 3 : 2;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, isCurrent ? 20 : 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = isCurrent || isSettled ? '#ffffff' : text;
    ctx.font = `bold ${isCurrent ? 14 : 12}px system-ui`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(n.id, pos.x, pos.y);

    if (dist !== undefined && algo === 'dijkstra') {
      const label = dist === Infinity ? '∞' : String(dist);
      ctx.font = '10px system-ui';
      ctx.fillStyle = text;
      ctx.textAlign = 'left';
      ctx.fillText(label, pos.x + 20, pos.y - 4);
    }
  }
}

export function ShortestPathMSTVisualizer() {
  const [presetIdx, setPresetIdx] = useState(1);
  const [algo, setAlgo] = useState<AlgorithmType>('dijkstra');
  const [dijkstraResult, setDijkstraResult] = useState<PathResult | null>(null);
  const [primResult, setPrimResult] = useState<MSTResult | null>(null);
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
    if (algo === 'dijkstra') {
      setDijkstraResult(computeDijkstra(graph, startNode));
      setPrimResult(null);
    } else {
      setPrimResult(computePrim(graph, startNode));
      setDijkstraResult(null);
    }
  }, [presetIdx, algo, graph, startNode]);

  useEffect(() => {
    let steps: GraphStep[] = [];
    let distances = new Map<GraphNodeId, number>();
    let ds: DrawState = {
      visited: new Set(),
      settled: new Set(),
      current: null,
      mstEdges: [],
      relaxedEdges: [],
      path: [],
    };

    if (algo === 'dijkstra' && dijkstraResult) {
      steps = dijkstraResult.steps;
      distances = dijkstraResult.distances;
      if (stepIdx > 0 && stepIdx <= steps.length) {
        const step = steps[stepIdx - 1];
        ds = {
          visited: new Set(steps.slice(0, stepIdx).filter(s => s.action === 'visit').map(s => s.node)),
          settled: new Set(steps.slice(0, stepIdx).filter(s => s.action === 'visit').map(s => s.node)),
          current: step.node,
          mstEdges: [],
          relaxedEdges: steps.slice(0, stepIdx).filter(s => s.action === 'select').flatMap(s => s.edges ?? []),
          path: [],
        };
      }
    } else if (algo === 'prim' && primResult) {
      steps = primResult.steps;
      if (stepIdx > 0 && stepIdx <= steps.length) {
        const step = steps[stepIdx - 1];
        ds = {
          visited: new Set(steps.slice(0, stepIdx).filter(s => s.action === 'visit' || s.action === 'mst-add').map(s => s.node)),
          settled: new Set(steps.slice(0, stepIdx).filter(s => s.action === 'mst-add').map(s => s.node)),
          current: step.node,
          mstEdges: step.mstEdges ?? [],
          relaxedEdges: steps.slice(0, stepIdx).filter(s => s.action === 'relax').flatMap(s => s.edges ?? []),
          path: [],
        };
      }
    }

    drawGraph(canvasRef.current, graph, ds, distances, algo);
  }, [dijkstraResult, primResult, stepIdx, graph, algo]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const steps = algo === 'dijkstra' ? dijkstraResult?.steps : primResult?.steps;
    if (isPlaying && steps && stepIdx < steps.length) {
      timerRef.current = setTimeout(() => setStepIdx(i => i + 1), 1200);
    } else if (steps && stepIdx >= steps.length) {
      setIsPlaying(false);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [isPlaying, stepIdx, dijkstraResult, primResult, algo]);

  const handlePlay = () => {
    const steps = algo === 'dijkstra' ? dijkstraResult?.steps : primResult?.steps;
    if (stepIdx >= (steps?.length ?? 0)) setStepIdx(0);
    setIsPlaying(true);
  };

  const handleStep = () => {
    const steps = algo === 'dijkstra' ? dijkstraResult?.steps : primResult?.steps;
    if (!steps) return;
    if (stepIdx >= steps.length) setStepIdx(0);
    else setStepIdx(i => i + 1);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setStepIdx(0);
  };

  const getMessage = () => {
    const steps = algo === 'dijkstra' ? dijkstraResult?.steps : primResult?.steps;
    if (!steps) return '';
    if (stepIdx > 0 && stepIdx <= steps.length) return steps[stepIdx - 1].message;
    return 'Press play to start';
  };

  return (
    <VisualizerFrame
      title="Shortest Path & MST"
      description={getMessage()}
      controls={
        <>
          <div className="spmv-presets">
            {PRESET_GRAPHS.map((p, i) => (
              <button key={p.label} onClick={() => setPresetIdx(i)} className={`spmv-btn ${presetIdx === i ? 'active' : ''}`}>
                {p.label}
              </button>
            ))}
          </div>
          <div className="spmv-controls">
            <div className="spmv-algo">
              <button onClick={() => setAlgo('dijkstra')} className={`spmv-btn ${algo === 'dijkstra' ? 'active' : ''}`}>Dijkstra</button>
              <button onClick={() => setAlgo('prim')} className={`spmv-btn ${algo === 'prim' ? 'active' : ''}`}>Prim</button>
            </div>
            <div className="spmv-playback">
              <button onClick={handleReset} className="spmv-btn">Reset</button>
              <button onClick={handleStep} className="spmv-btn">Step</button>
              <button onClick={handlePlay} className="spmv-btn spmv-btn-primary">{isPlaying ? 'Pause' : 'Play'}</button>
            </div>
          </div>
        </>
      }
      isEmpty={false}
    >
      <div className="spmv-canvas-wrap">
        <canvas ref={canvasRef} className="spmv-canvas" width={560} height={320} />
      </div>
      <div className="spmv-legend">
        <span className="spmv-legend-item spmv-legend-relaxed">In PQ (unsettled)</span>
        <span className="spmv-legend-item spmv-legend-visited">Settled</span>
        <span className="spmv-legend-item spmv-legend-mst">MST Edge</span>
        <span className="spmv-legend-item spmv-legend-current">Current</span>
      </div>

      <style>{`
        .spmv-presets { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
        .spmv-controls { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; justify-content: space-between; }
        .spmv-algo { display: flex; gap: 8px; }
        .spmv-playback { display: flex; gap: 8px; }
        .spmv-btn { padding: 6px 12px; border-radius: 6px; border: 1px solid var(--color-border); background: var(--color-surface); color: var(--color-text); font-size: 0.8125rem; cursor: pointer; transition: all 0.15s; }
        .spmv-btn:hover { border-color: var(--color-primary); }
        .spmv-btn.active { background: var(--color-primary); border-color: var(--color-primary); color: white; }
        .spmv-btn-primary { background: var(--color-primary); border-color: var(--color-primary); color: white; }
        .spmv-canvas-wrap { width: 100%; display: flex; justify-content: center; }
        .spmv-canvas { width: 100%; max-width: 560px; height: 320px; border-radius: var(--radius-md); background: var(--color-bg); }
        .spmv-legend { display: flex; gap: 16px; justify-content: center; margin-top: 8px; font-size: 0.75rem; color: var(--color-text); }
        .spmv-legend-item::before { content: '■'; margin-right: 4px; }
        .spmv-legend-relaxed::before { color: #d97706; }
        .spmv-legend-visited::before { color: #16a34a; }
        .spmv-legend-mst::before { color: #7c3aed; }
        .spmv-legend-current::before { color: var(--color-primary); }
      `}</style>
    </VisualizerFrame>
  );
}

export default ShortestPathMSTVisualizer;