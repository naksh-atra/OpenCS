import {
  type Graph,
  type GraphNodeId,
  type GraphEdge,
  buildAdjacencyList,
  type GraphStep,
} from './graph-types';

export type AlgorithmType = 'dijkstra' | 'prim';

export interface PathResult {
  distances: Map<GraphNodeId, number>;
  predecessors: Map<GraphNodeId, GraphNodeId | null>;
  steps: GraphStep[];
  message: string;
}

export interface MSTResult {
  mstEdges: GraphEdge[];
  totalWeight: number;
  steps: GraphStep[];
  message: string;
}

export function computeDijkstra(g: Graph, sourceId: GraphNodeId): PathResult {
  const adj = buildAdjacencyList(g, false);
  const distances = new Map<GraphNodeId, number>();
  const predecessors = new Map<GraphNodeId, GraphNodeId | null>();
  const steps: GraphStep[] = [];

  for (const n of g.nodes) {
    distances.set(n.id, Infinity);
    predecessors.set(n.id, null);
  }
  distances.set(sourceId, 0);

  steps.push({
    action: 'discover',
    node: sourceId,
    distances: new Map(distances),
    message: `Start Dijkstra from ${sourceId}`,
  });

  const settled = new Set<GraphNodeId>();
  const pq: { id: GraphNodeId; dist: number }[] = [{ id: sourceId, dist: 0 }];

  while (pq.length) {
    pq.sort((a, b) => a.dist - b.dist);
    const current = pq.shift()!;

    if (settled.has(current.id)) continue;
    settled.add(current.id);

    steps.push({
      action: 'visit',
      node: current.id,
      distances: new Map(distances),
      message: `Settle ${current.id} (dist: ${current.dist === Infinity ? '∞' : current.dist})`,
    });

    const neighbors = adj.get(current.id) ?? [];
    for (const { node: neighborId, weight } of neighbors) {
      if (settled.has(neighborId)) continue;

      const via = current.id;
      const newDist = current.dist + weight;
      const prevDist = distances.get(neighborId)!;

      steps.push({
        action: 'relax',
        node: neighborId,
        edges: [{ from: via, to: neighborId, weight }],
        distances: new Map(distances),
        message: `Relax ${via}→${neighborId}: ${newDist} ${newDist < prevDist ? '<' : '≥'} ${prevDist === Infinity ? '∞' : prevDist}`,
      });

      if (newDist < prevDist) {
        distances.set(neighborId, newDist);
        predecessors.set(neighborId, via);
        pq.push({ id: neighborId, dist: newDist });

        steps.push({
          action: 'select',
          node: neighborId,
          edges: [{ from: via, to: neighborId, weight }],
          distances: new Map(distances),
          message: `Update ${neighborId} dist → ${newDist}`,
        });
      }
    }
  }

  const distMap = new Map(distances);
  steps.push({
    action: 'finalize',
    node: sourceId,
    distances: distMap,
    message: `Dijkstra complete from ${sourceId}`,
  });

  return { distances: distMap, predecessors, steps, message: steps[steps.length - 1].message };
}

export function buildPath(predecessors: Map<GraphNodeId, GraphNodeId | null>, source: GraphNodeId, target: GraphNodeId): GraphNodeId[] {
  const path: GraphNodeId[] = [];
  let current: GraphNodeId | null = target;
  while (current !== null) {
    path.unshift(current);
    current = predecessors.get(current) ?? null;
    if (current === source) {
      path.unshift(source);
      break;
    }
  }
  return path;
}

export function computePrim(g: Graph, startId: GraphNodeId): MSTResult {
  const adj = buildAdjacencyList(g, false);
  const steps: GraphStep[] = [];
  const inMST = new Set<GraphNodeId>();
  const mstEdges: GraphEdge[] = [];
  const key = new Map<GraphNodeId, number>();

  for (const n of g.nodes) key.set(n.id, Infinity);
  key.set(startId, 0);

  steps.push({
    action: 'discover',
    node: startId,
    mstEdges: [],
    message: `Start Prim's MST from ${startId}`,
  });

  const pq: { id: GraphNodeId; keyVal: number; from: GraphNodeId | null }[] = [{ id: startId, keyVal: 0, from: null }];

  while (pq.length) {
    pq.sort((a, b) => a.keyVal - b.keyVal);
    const { id: u, from } = pq.shift()!;

    if (inMST.has(u)) continue;
    inMST.add(u);

    if (from !== null) {
      const weight = g.edges.find(e => (e.from === from && e.to === u) || (e.from === u && e.to === from))?.weight ?? 1;
      mstEdges.push({ from, to: u, weight });

      steps.push({
        action: 'mst-add',
        node: u,
        edges: mstEdges.map(e => ({ from: e.from, to: e.to, weight: e.weight })),
        mstEdges: [...mstEdges],
        message: `Add ${from}—${u} (w=${weight}) to MST`,
      });
    } else {
      steps.push({
        action: 'visit',
        node: u,
        mstEdges: [...mstEdges],
        message: `Add ${u} to MST (start node)`,
      });
    }

    const neighbors = adj.get(u) ?? [];
    for (const { node: v, weight } of neighbors) {
      if (!inMST.has(v) && weight < (key.get(v) ?? Infinity)) {
        key.set(v, weight);
        pq.push({ id: v, keyVal: weight, from: u });

        steps.push({
          action: 'relax',
          node: v,
          edges: [{ from: u, to: v, weight }],
          message: `Consider edge ${u}—${v} (key=${weight})`,
        });
      }
    }
  }

  const totalWeight = mstEdges.reduce((sum, e) => sum + e.weight, 0);
  steps.push({
    action: 'finalize',
    node: startId,
    mstEdges: [...mstEdges],
    message: `MST complete: ${mstEdges.map(e => `${e.from}—${e.to}`).join(', ')} (total: ${totalWeight})`,
  });

  return { mstEdges, totalWeight, steps, message: steps[steps.length - 1].message };
}