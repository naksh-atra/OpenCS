import type { NumberPreset, NumberBase } from './types';

export const NUMBER_PRESETS: NumberPreset[] = [
  { label: '25 → Binary', value: '25', fromBase: 10, toBase: 2 },
  { label: '11001 → Decimal', value: '11001', fromBase: 2, toBase: 10 },
  { label: '255 → Hex', value: '255', fromBase: 10, toBase: 16 },
  { label: 'FF → Decimal', value: 'FF', fromBase: 16, toBase: 10 },
  { label: '77 → Octal', value: '77', fromBase: 10, toBase: 8 },
  { label: '100 → Octal', value: '100', fromBase: 8, toBase: 10 },
  { label: '3.14 IEEE754', value: '3.14', fromBase: 10, toBase: 10 },
  { label: '-0.15625 IEEE754', value: '-0.15625', fromBase: 10, toBase: 10 },
];

export const AVAILABLE_BASES: { value: NumberBase; label: string }[] = [
  { value: 2, label: 'Binary (Base 2)' },
  { value: 8, label: 'Octal (Base 8)' },
  { value: 10, label: 'Decimal (Base 10)' },
  { value: 16, label: 'Hexadecimal (Base 16)' },
];
