export type OperationType = 'insert' | 'delete' | 'search' | 'access' | 'update';

export interface ArrayOperation {
  type: OperationType;
  index?: number;
  value?: number;
  result?: number | boolean;
  timestamp: number;
}

export interface ArrayState {
  data: number[];
  operations: ArrayOperation[];
  currentIndex: number | null;
  highlightIndices: number[];
  message: string;
}

export function createArrayState(data: number[] = [3, 7, 1, 8, 2, 5, 9, 4]): ArrayState {
  return {
    data: [...data],
    operations: [],
    currentIndex: null,
    highlightIndices: [],
    message: 'Initial array state',
  };
}

export function applyInsert(state: ArrayState, index: number, value: number): ArrayState {
  if (index < 0 || index > state.data.length) return { ...state, message: 'Index out of bounds' };
  const data = [...state.data];
  data.splice(index, 0, value);
  return {
    ...state,
    data,
    operations: [...state.operations, { type: 'insert', index, value, result: index, timestamp: Date.now() }],
    highlightIndices: [index],
    currentIndex: index,
    message: `Inserted ${value} at index ${index}`,
  };
}

export function applyDelete(state: ArrayState, index: number): ArrayState {
  if (index < 0 || index >= state.data.length) return { ...state, message: 'Index out of bounds' };
  const value = state.data[index];
  const data = [...state.data];
  data.splice(index, 1);
  return {
    ...state,
    data,
    operations: [...state.operations, { type: 'delete', index, result: value, timestamp: Date.now() }],
    highlightIndices: [],
    currentIndex: null,
    message: `Deleted ${value} from index ${index}`,
  };
}

export function applySearch(state: ArrayState, value: number): ArrayState {
  const index = state.data.indexOf(value);
  const found = index !== -1;
  return {
    ...state,
    operations: [...state.operations, { type: 'search', value, result: found ? index : -1, timestamp: Date.now() }],
    highlightIndices: found ? [index] : [],
    currentIndex: found ? index : null,
    message: found ? `Found ${value} at index ${index}` : `${value} not found in array`,
  };
}

export function applyAccess(state: ArrayState, index: number): ArrayState {
  if (index < 0 || index >= state.data.length) return { ...state, message: 'Index out of bounds' };
  const value = state.data[index];
  return {
    ...state,
    operations: [...state.operations, { type: 'access', index, result: value, timestamp: Date.now() }],
    highlightIndices: [index],
    currentIndex: index,
    message: `Accessed index ${index}: value is ${value}`,
  };
}

export function applyUpdate(state: ArrayState, index: number, value: number): ArrayState {
  if (index < 0 || index >= state.data.length) return { ...state, message: 'Index out of bounds' };
  const oldValue = state.data[index];
  const data = [...state.data];
  data[index] = value;
  return {
    ...state,
    data,
    operations: [...state.operations, { type: 'update', index, value, result: oldValue, timestamp: Date.now() }],
    highlightIndices: [index],
    currentIndex: index,
    message: `Updated index ${index}: ${oldValue} → ${value}`,
  };
}

export function getRandomArray(size: number = 8, max: number = 99): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max) + 1);
}