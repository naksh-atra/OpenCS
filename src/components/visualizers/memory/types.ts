export interface MemoryPreset {
  label: string;
  referenceString: number[];
  frameCount: number;
  algorithm: 'fifo' | 'lru' | 'optimal';
}
