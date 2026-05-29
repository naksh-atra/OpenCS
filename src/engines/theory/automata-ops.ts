export type AutomatonType = 'dfa' | 'nfa';

export interface AutomatonState {
  id: string;
  x: number;
  y: number;
  isStart: boolean;
  isAccept: boolean;
}

export interface AutomatonTransition {
  from: string;
  symbol: string;
  to: string[];
}

export interface Automaton {
  states: AutomatonState[];
  alphabet: string[];
  transitions: AutomatonTransition[];
  startState: string;
  acceptStates: string[];
  type: AutomatonType;
}

export interface SimulationStep {
  states: string[];
  inputIndex: number;
  symbol: string;
  message: string;
}

export interface SimulationState {
  automaton: Automaton;
  input: string;
  currentStates: string[];
  inputIndex: number;
  history: SimulationStep[];
  message: string;
  accepted: boolean | null;
}

export function createAutomaton(
  type: AutomatonType,
  states: AutomatonState[],
  alphabet: string[],
  transitions: AutomatonTransition[],
  startState: string,
  acceptStates: string[]
): Automaton {
  return { states, alphabet, transitions, startState, acceptStates, type };
}

export function simulateStep(simState: SimulationState): SimulationState {
  const { automaton, input, inputIndex, currentStates } = simState;
  if (inputIndex >= input.length) {
    const accepted = currentStates.some(s => automaton.acceptStates.includes(s));
    return { ...simState, accepted, message: accepted ? 'Accepted!' : 'Rejected' };
  }

  const symbol = input[inputIndex];
  const newStates: Set<string> = new Set();

  for (const state of currentStates) {
    const trans = automaton.transitions.filter(t => t.from === state && t.symbol === symbol);
    for (const t of trans) {
      t.to.forEach(s => newStates.add(s));
    }
  }

  const newStatesArr = [...newStates];
  const history = [...simState.history, {
    states: newStatesArr,
    inputIndex,
    symbol,
    message: `Read '${symbol}' from {${currentStates.join(',')}} → {${newStatesArr.join(',')}}`,
  }];

  return {
    ...simState,
    currentStates: newStatesArr,
    inputIndex: inputIndex + 1,
    history,
    message: `Read '${symbol}': {${currentStates.join(',')}} → {${newStatesArr.join(',')}}`,
  };
}

export function simulateFull(simState: SimulationState): SimulationState {
  let current = { ...simState };
  while (current.inputIndex < current.input.length && current.currentStates.length > 0) {
    current = simulateStep(current);
  }
  const accepted = current.currentStates.some(s => simState.automaton.acceptStates.includes(s));
  return { ...current, accepted, message: accepted ? 'Accepted!' : 'Rejected' };
}
