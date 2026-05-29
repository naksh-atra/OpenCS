export interface HashingPreset {
  label: string;
  method: 'chaining' | 'linear' | 'quadratic' | 'double';
  size: number;
  keys: number[];
}

export type HashMethod = 'chaining' | 'linear' | 'quadratic' | 'double';
