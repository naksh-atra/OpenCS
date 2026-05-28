export interface NumberPreset {
  label: string;
  value: string;
  fromBase: number;
  toBase: number;
}

export type NumberBase = 2 | 8 | 10 | 16;
