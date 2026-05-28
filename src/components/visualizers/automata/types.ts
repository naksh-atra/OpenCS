export interface AutomatonPreset {
  label: string;
  description: string;
  type: 'dfa' | 'nfa';
  testInputs: string[];
}
