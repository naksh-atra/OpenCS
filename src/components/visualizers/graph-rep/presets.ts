import type { GraphRepPreset } from './types';

export const GRAPH_REP_PRESETS: GraphRepPreset[] = [
  { label: 'Undirected (4 vertices)', vertices: 4, edges: [[0,1],[0,2],[1,2],[2,3]], directed: false },
  { label: 'Directed (4 vertices)', vertices: 4, edges: [[0,1],[1,2],[2,3],[3,0]], directed: true },
  { label: 'Complete K4', vertices: 4, edges: [[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]], directed: false },
  { label: 'Tree (5 vertices)', vertices: 5, edges: [[0,1],[0,2],[1,3],[1,4]], directed: false },
];
