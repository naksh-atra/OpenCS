import type { AVLPreset } from './types';

export const AVL_PRESETS: AVLPreset[] = [
  { label: 'LL Rotation', operations: [{ type: 'insert', value: 30 }, { type: 'insert', value: 20 }, { type: 'insert', value: 10 }] },
  { label: 'RR Rotation', operations: [{ type: 'insert', value: 10 }, { type: 'insert', value: 20 }, { type: 'insert', value: 30 }] },
  { label: 'LR Rotation', operations: [{ type: 'insert', value: 30 }, { type: 'insert', value: 10 }, { type: 'insert', value: 20 }] },
  { label: 'RL Rotation', operations: [{ type: 'insert', value: 10 }, { type: 'insert', value: 30 }, { type: 'insert', value: 20 }] },
  { label: 'Balanced Build', operations: [{ type: 'insert', value: 50 }, { type: 'insert', value: 30 }, { type: 'insert', value: 70 }, { type: 'insert', value: 20 }, { type: 'insert', value: 40 }, { type: 'insert', value: 60 }, { type: 'insert', value: 80 }] },
];
