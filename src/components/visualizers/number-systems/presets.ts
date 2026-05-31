import type { NumberPreset, NumberBase } from './types';

export const NUMBER_PRESETS: NumberPreset[] = [
  { label: 'Decimal → Binary', value: '25', fromBase: 10, toBase: 2 },
  { label: 'Binary → Decimal', value: '11001', fromBase: 2, toBase: 10 },
  { label: 'Decimal → Hex', value: '255', fromBase: 10, toBase: 16 },
  { label: 'Hex → Decimal', value: 'FF', fromBase: 16, toBase: 10 },
  { label: 'Decimal → Octal', value: '77', fromBase: 10, toBase: 8 },
  { label: 'Octal → Decimal', value: '100', fromBase: 8, toBase: 10 },
  { label: 'IEEE 754 (3.14)', value: '3.14', fromBase: 10, toBase: 10 },
  { label: 'IEEE 754 (-0.15625)', value: '-0.15625', fromBase: 10, toBase: 10 },
];

export const AVAILABLE_BASES: { value: NumberBase; label: string }[] = [
  { value: 2, label: 'Binary (Base 2)' },
  { value: 8, label: 'Octal (Base 8)' },
  { value: 10, label: 'Decimal (Base 10)' },
  { value: 16, label: 'Hexadecimal (Base 16)' },
];
