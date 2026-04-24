export type GraphNodeId = string;

export interface GraphNode {
  id: GraphNodeId;
  x: number;
  y: number;
}

export interface GraphEdge {
  from: GraphNodeId;
  to: GraphNodeId;
  weight: number;
}

export interface Graph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface AdjacencyEntry {
  node: GraphNodeId;
  weight: number;
}

export type AdjacencyList = Map<GraphNodeId, AdjacencyEntry[]>;

export function buildAdjacencyList(g: Graph, directed = false): AdjacencyList {
  const adj = new Map<GraphNodeId, AdjacencyEntry[]>();
  for (const n of g.nodes) adj.set(n.id, []);
  for (const e of g.edges) {
    adj.get(e.from)!.push({ node: e.to, weight: e.weight });
    if (!directed) {
      adj.get(e.to)!.push({ node: e.from, weight: e.weight });
    }
  }
  return adj;
}

export function nodePositions(g: Graph): Map<GraphNodeId, { x: number; y: number }> {
  const m = new Map<GraphNodeId, { x: number; y: number }>();
  for (const n of g.nodes) m.set(n.id, { x: n.x, y: n.y });
  return m;
}

export type StepAction = 'discover' | 'visit' | 'enqueue' | 'dequeue' | 'push' | 'pop' | 'relax' | 'select' | 'finalize' | 'mst-add' | 'path-add';

export interface GraphStep {
  action: StepAction;
  node: GraphNodeId;
  edges?: { from: GraphNodeId; to: GraphNodeId; weight?: number }[];
  distances?: Map<GraphNodeId, number>;
  visited?: GraphNodeId[];
  frontier?: GraphNodeId[];
  stack?: GraphNodeId[];
  queue?: GraphNodeId[];
  path?: GraphNodeId[];
  mstEdges?: GraphEdge[];
  message: string;
}

export interface PresetGraph {
  label: string;
  description: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  directed: boolean;
}

export const PRESET_GRAPHS: PresetGraph[] = [
  {
    label: 'Undirected A',
    description: 'Small undirected graph',
    directed: false,
    nodes: [
      { id: 'A', x: 80, y: 120 },
      { id: 'B', x: 200, y: 60 },
      { id: 'C', x: 200, y: 180 },
      { id: 'D', x: 340, y: 60 },
      { id: 'E', x: 340, y: 180 },
      { id: 'F', x: 460, y: 120 },
    ],
    edges: [
      { from: 'A', to: 'B', weight: 4 },
      { from: 'A', to: 'C', weight: 2 },
      { from: 'B', to: 'D', weight: 1 },
      { from: 'B', to: 'C', weight: 3 },
      { from: 'C', to: 'E', weight: 5 },
      { from: 'D', to: 'E', weight: 6 },
      { from: 'D', to: 'F', weight: 2 },
      { from: 'E', to: 'F', weight: 3 },
    ],
  },
  {
    label: 'Weighted B',
    description: 'Weighted undirected graph',
    directed: false,
    nodes: [
      { id: 'S', x: 60, y: 160 },
      { id: 'A', x: 160, y: 80 },
      { id: 'B', x: 160, y: 240 },
      { id: 'C', x: 280, y: 80 },
      { id: 'D', x: 280, y: 240 },
      { id: 'T', x: 420, y: 160 },
    ],
    edges: [
      { from: 'S', to: 'A', weight: 4 },
      { from: 'S', to: 'B', weight: 2 },
      { from: 'A', to: 'C', weight: 5 },
      { from: 'A', to: 'B', weight: 1 },
      { from: 'B', to: 'D', weight: 8 },
      { from: 'C', to: 'T', weight: 2 },
      { from: 'D', to: 'T', weight: 3 },
      { from: 'C', to: 'D', weight: 4 },
    ],
  },
  {
    label: 'Cycle',
    description: 'Graph with a cycle',
    directed: false,
    nodes: [
      { id: '1', x: 160, y: 80 },
      { id: '2', x: 280, y: 80 },
      { id: '3', x: 360, y: 160 },
      { id: '4', x: 280, y: 240 },
      { id: '5', x: 160, y: 240 },
      { id: '6', x: 80, y: 160 },
    ],
    edges: [
      { from: '1', to: '2', weight: 1 },
      { from: '2', to: '3', weight: 1 },
      { from: '3', to: '4', weight: 1 },
      { from: '4', to: '5', weight: 1 },
      { from: '5', to: '6', weight: 1 },
      { from: '6', to: '1', weight: 1 },
      { from: '1', to: '4', weight: 1 },
    ],
  },
  {
    label: 'Sparse',
    description: 'Sparse tree-like graph',
    directed: false,
    nodes: [
      { id: 'R', x: 60, y: 160 },
      { id: 'A', x: 180, y: 80 },
      { id: 'B', x: 180, y: 240 },
      { id: 'C', x: 320, y: 80 },
      { id: 'D', x: 320, y: 240 },
      { id: 'E', x: 450, y: 160 },
    ],
    edges: [
      { from: 'R', to: 'A', weight: 1 },
      { from: 'R', to: 'B', weight: 1 },
      { from: 'A', to: 'C', weight: 1 },
      { from: 'B', to: 'D', weight: 1 },
      { from: 'C', to: 'E', weight: 1 },
      { from: 'D', to: 'E', weight: 1 },
    ],
  },
];

export function getEdgeWeight(g: Graph, from: GraphNodeId, to: GraphNodeId): number {
  return g.edges.find(e => e.from === from && e.to === to)?.weight ?? 1;
}

export function getNeighbors(adj: AdjacencyList, node: GraphNodeId): AdjacencyEntry[] {
  return adj.get(node) ?? [];
}

export function graphHasEdge(g: Graph, from: GraphNodeId, to: GraphNodeId): boolean {
  return g.edges.some(e => e.from === from && e.to === to);
}

export function findStartNode(g: Graph): GraphNodeId {
  return g.nodes[0]?.id ?? 'A';
}