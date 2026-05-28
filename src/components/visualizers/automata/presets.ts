import type { AutomatonPreset } from './types';
import type { AutomatonState, AutomatonTransition } from '../../../engines/theory/automata-ops';

interface FullPreset extends AutomatonPreset {
  states: AutomatonState[];
  alphabet: string[];
  transitions: AutomatonTransition[];
  startState: string;
  acceptStates: string[];
}

export const AUTOMATA_PRESETS: FullPreset[] = [
  {
    label: 'DFA: ends with 01',
    description: 'Accepts binary strings ending in 01',
    type: 'dfa',
    testInputs: ['01', '101', '0101', '110', '100'],
    states: [
      { id: 'q0', x: 100, y: 150, isStart: true, isAccept: false },
      { id: 'q1', x: 250, y: 150, isStart: false, isAccept: false },
      { id: 'q2', x: 400, y: 150, isStart: false, isAccept: true },
    ],
    alphabet: ['0', '1'],
    transitions: [
      { from: 'q0', symbol: '0', to: ['q1'] }, { from: 'q0', symbol: '1', to: ['q0'] },
      { from: 'q1', symbol: '0', to: ['q1'] }, { from: 'q1', symbol: '1', to: ['q2'] },
      { from: 'q2', symbol: '0', to: ['q1'] }, { from: 'q2', symbol: '1', to: ['q0'] },
    ],
    startState: 'q0',
    acceptStates: ['q2'],
  },
  {
    label: 'DFA: even 0s',
    description: 'Accepts binary strings with even number of 0s',
    type: 'dfa',
    testInputs: ['', '00', '1001', '010', '000'],
    states: [
      { id: 'A', x: 150, y: 150, isStart: true, isAccept: true },
      { id: 'B', x: 350, y: 150, isStart: false, isAccept: false },
    ],
    alphabet: ['0', '1'],
    transitions: [
      { from: 'A', symbol: '0', to: ['B'] }, { from: 'A', symbol: '1', to: ['A'] },
      { from: 'B', symbol: '0', to: ['A'] }, { from: 'B', symbol: '1', to: ['B'] },
    ],
    startState: 'A',
    acceptStates: ['A'],
  },
];

export function getPresetData(preset: FullPreset) {
  return {
    states: preset.states,
    alphabet: preset.alphabet,
    transitions: preset.transitions,
    startState: preset.startState,
    acceptStates: preset.acceptStates,
  };
}
