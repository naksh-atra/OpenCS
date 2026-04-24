export type DataStructureType = 'stack' | 'queue' | 'deque';
export type OperationType = 'push' | 'pop' | 'enqueue' | 'dequeue' | 'peek' | 'front' | 'back';

export interface StackQueueOperation {
  type: OperationType;
  value?: number;
  result?: number | null;
  timestamp: number;
}

export interface StackQueueState {
  type: DataStructureType;
  data: number[];
  operations: StackQueueOperation[];
  highlightIndex: number | null;
  message: string;
}

export function createStackQueueState(type: DataStructureType = 'stack', initial: number[] = [3, 7, 1, 8, 2]): StackQueueState {
  return {
    type,
    data: [...initial],
    operations: [],
    highlightIndex: null,
    message: `${capitalize(type)} initialized with [${initial.join(', ')}]`,
  };
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function applyPush(state: StackQueueState, value: number): StackQueueState {
  if (state.type === 'queue') return applyEnqueue(state, value);
  const data = [...state.data, value];
  return {
    ...state,
    type: 'stack',
    data,
    operations: [...state.operations, { type: 'push', value, result: value, timestamp: Date.now() }],
    highlightIndex: data.length - 1,
    message: `Pushed ${value} to stack`,
  };
}

export function applyPop(state: StackQueueState): StackQueueState {
  if (state.type === 'queue') return applyDequeue(state);
  if (state.data.length === 0) return { ...state, message: 'Cannot pop from empty stack' };
  const value = state.data[state.data.length - 1];
  const data = state.data.slice(0, -1);
  return {
    ...state,
    type: 'stack',
    data,
    operations: [...state.operations, { type: 'pop', result: value, timestamp: Date.now() }],
    highlightIndex: null,
    message: `Popped ${value} from stack`,
  };
}

export function applyEnqueue(state: StackQueueState, value: number): StackQueueState {
  const data = [...state.data, value];
  return {
    ...state,
    type: 'queue',
    data,
    operations: [...state.operations, { type: 'enqueue', value, result: value, timestamp: Date.now() }],
    highlightIndex: data.length - 1,
    message: `Enqueued ${value} to queue`,
  };
}

export function applyDequeue(state: StackQueueState): StackQueueState {
  if (state.data.length === 0) return { ...state, message: 'Cannot dequeue from empty queue' };
  const value = state.data[0];
  const data = state.data.slice(1);
  return {
    ...state,
    type: 'queue',
    data,
    operations: [...state.operations, { type: 'dequeue', result: value, timestamp: Date.now() }],
    highlightIndex: null,
    message: `Dequeued ${value} from queue`,
  };
}

export function applyPeek(state: StackQueueState): StackQueueState {
  if (state.data.length === 0) return { ...state, message: `${capitalize(state.type)} is empty` };
  const value = state.type === 'stack'
    ? state.data[state.data.length - 1]
    : state.data[0];
  return {
    ...state,
    operations: [...state.operations, { type: 'peek', result: value, timestamp: Date.now() }],
    highlightIndex: state.type === 'stack' ? state.data.length - 1 : 0,
    message: `Peek: ${value}`,
  };
}

export function getRandomSequence(size: number = 6, max: number = 20): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max) + 1);
}