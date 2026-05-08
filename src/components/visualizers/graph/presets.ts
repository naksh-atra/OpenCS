import { GraphPreset } from './types';

export const GRAPH_PRESETS: GraphPreset[] = [
  {
    label: 'Simple BST',
    nodes: [
      { id: '1', label: '8' },
      { id: '2', label: '3' },
      { id: '3', label: '10' },
    ],
    edges: [
      { source: '1', target: '2' },
      { source: '1', target: '3' },
    ],
  },
  {
    label: 'Balanced Tree',
    nodes: [
      { id: '1', label: '5' },
      { id: '2', label: '3' },
      { id: '3', label: '7' },
      { id: '4', label: '2' },
      { id: '5', label: '4' },
    ],
    edges: [
      { source: '1', target: '2' },
      { source: '1', target: '3' },
      { source: '2', target: '4' },
      { source: '2', target: '5' },
    ],
  },
];
