export interface AVLPreset {
  label: string;
  operations: Array<{ type: 'insert' | 'delete'; value: number }>;
}
