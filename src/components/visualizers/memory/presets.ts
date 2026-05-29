import type { MemoryPreset } from './types';

export const MEMORY_PRESETS: MemoryPreset[] = [
  { label: 'FIFO (3 frames)', referenceString: [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5], frameCount: 3, algorithm: 'fifo' },
  { label: 'FIFO (4 frames)', referenceString: [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5], frameCount: 4, algorithm: 'fifo' },
  { label: 'LRU (3 frames)', referenceString: [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5], frameCount: 3, algorithm: 'lru' },
  { label: 'Optimal (3 frames)', referenceString: [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5], frameCount: 3, algorithm: 'optimal' },
  { label: 'Belady Anomaly', referenceString: [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5], frameCount: 3, algorithm: 'fifo' },
];
