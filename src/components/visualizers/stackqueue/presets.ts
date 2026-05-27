import type { StackPreset, QueuePreset } from './types';

export const STACK_PRESETS: StackPreset[] = [
  { label: 'Small', data: [3, 7, 1, 8] },
  { label: 'Ascending', data: [1, 2, 3, 4, 5] },
  { label: 'Random', data: [5, 2, 8, 1, 9] },
];

export const QUEUE_PRESETS: QueuePreset[] = [
  { label: 'Small', data: [3, 7, 1, 8] },
  { label: 'Even', data: [2, 4, 6, 8] },
  { label: 'Sorted', data: [1, 3, 5, 7] },
];
