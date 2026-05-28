import type { HashingPreset, HashMethod } from './types';

export const HASHING_PRESETS: HashingPreset[] = [
  { label: 'Linear Probing', method: 'linear', size: 7, keys: [50, 700, 76, 85, 92, 20, 35] },
  { label: 'Quadratic Probing', method: 'quadratic', size: 7, keys: [50, 700, 76, 85, 92] },
  { label: 'Double Hashing', method: 'double', size: 7, keys: [50, 700, 76, 85, 92, 20] },
  { label: 'Chaining', method: 'chaining', size: 7, keys: [50, 700, 76, 85, 92, 20, 35, 42] },
  { label: 'Clustering Demo', method: 'linear', size: 11, keys: [11, 22, 33, 44, 55] },
];

export const METHOD_OPTIONS: { value: HashMethod; label: string; desc: string }[] = [
  { value: 'chaining', label: 'Chaining', desc: 'Each slot holds a linked list of entries' },
  { value: 'linear', label: 'Linear Probing', desc: 'h(k, i) = (h(k) + i) mod m' },
  { value: 'quadratic', label: 'Quadratic Probing', desc: 'h(k, i) = (h(k) + i²) mod m' },
  { value: 'double', label: 'Double Hashing', desc: 'h(k, i) = (h₁(k) + i·h₂(k)) mod m' },
];
