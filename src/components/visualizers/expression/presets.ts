import type { ExpressionPreset } from './types';

export const EXPRESSION_PRESETS: ExpressionPreset[] = [
  { label: 'A+B*C', expression: 'A+B*C' },
  { label: '(A+B)*(C-D)', expression: '(A+B)*(C-D)' },
  { label: 'A+B*C-D/E', expression: 'A+B*C-D/E' },
  { label: 'A*(B+C)/D', expression: 'A*(B+C)/D' },
  { label: 'A^B^C', expression: 'A^B^C' },
  { label: '(A+B)*(C-D)/E', expression: '(A+B)*(C-D)/E' },
];
