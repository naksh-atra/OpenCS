import type { HeapPreset } from './types';

export const HEAP_PRESETS: HeapPreset[] = [
  { label: 'Min Heap', type: 'min', data: [3, 1, 6, 5, 2, 4] },
  { label: 'Max Heap', type: 'max', data: [4, 2, 7, 1, 5, 3] },
  { label: 'Heap Sort Demo', type: 'max', data: [12, 11, 13, 5, 6, 7] },
  { label: 'Small Min Heap', type: 'min', data: [1, 3, 2] },
];
