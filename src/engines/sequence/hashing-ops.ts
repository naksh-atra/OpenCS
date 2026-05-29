export type HashMethod = 'chaining' | 'linear' | 'quadratic' | 'double';

export interface HashEntry {
  key: number | null;
  value: string;
  state: 'empty' | 'occupied' | 'deleted';
}

export interface HashingStep {
  action: 'insert' | 'search' | 'delete' | 'rehash';
  key: number;
  index: number;
  probes: number;
  probeSequence: number[];
  message: string;
}

export interface HashingState {
  table: HashEntry[];
  size: number;
  method: HashMethod;
  count: number;
  loadFactor: number;
  highlightIndex: number | null;
  highlightProbeSequence: number[];
  message: string;
  steps: HashingStep[];
  history: string[];
}

export function createHashingState(method: HashMethod = 'linear', size: number = 7): HashingState {
  return {
    table: Array.from({ length: size }, () => ({ key: null, value: '', state: 'empty' as const })),
    size,
    method,
    count: 0,
    loadFactor: 0,
    highlightIndex: null,
    highlightProbeSequence: [],
    message: `Empty hash table (size ${size}, ${method} probing)`,
    steps: [],
    history: [],
  };
}

export function hash(key: number, size: number): number {
  return key % size;
}

export function hash2(key: number, size: number): number {
  return 1 + (key % (size - 1));
}

export function getProbeSequence(
  state: HashingState,
  key: number
): number[] {
  const { size, method } = state;
  const probes: number[] = [];
  const h1 = hash(key, size);

  if (method === 'chaining') {
    probes.push(h1);
    return probes;
  }

  for (let i = 0; i < size; i++) {
    let idx: number;
    switch (method) {
      case 'linear':
        idx = (h1 + i) % size;
        break;
      case 'quadratic':
        idx = (h1 + i * i) % size;
        break;
      case 'double':
        idx = (h1 + i * hash2(key, size)) % size;
        break;
      default:
        idx = (h1 + i) % size;
    }
    probes.push(idx);
    if (probes.length >= size) break;
  }
  return probes;
}

export function getLoadFactor(state: HashingState): number {
  return state.count / state.size;
}

export function hashInsert(state: HashingState, key: number, value: string): HashingState {
  const probeSeq = getProbeSequence(state, key);
  const table = state.table.map(e => ({ ...e }));
  let probes = 0;

  for (const idx of probeSeq) {
    probes++;
    if (table[idx].state === 'empty' || table[idx].state === 'deleted') {
      table[idx] = { key, value, state: 'occupied' };
      const newCount = state.count + 1;
      const newHistory = [...state.history, `Inserted ${key} at index ${idx} (${probes} probe${probes > 1 ? 's' : ''})`];
      return {
        ...state,
        table,
        count: newCount,
        loadFactor: newCount / state.size,
        highlightIndex: idx,
        highlightProbeSequence: probeSeq.slice(0, probes),
        message: `Inserted ${key} at index ${idx} (${probes} probe${probes > 1 ? 's' : ''})`,
        steps: [...state.steps, { action: 'insert' as const, key, index: idx, probes, probeSequence: probeSeq.slice(0, probes), message: `Inserted ${key}` }],
        history: newHistory,
      };
    }
    if (table[idx].state === 'occupied' && table[idx].key === key) {
      table[idx].value = value;
      return {
        ...state,
        table,
        highlightIndex: idx,
        highlightProbeSequence: probeSeq.slice(0, probes),
        message: `Updated ${key} at index ${idx}`,
        steps: [...state.steps, { action: 'insert' as const, key, index: idx, probes, probeSequence: probeSeq.slice(0, probes), message: `Updated ${key}` }],
        history: state.history,
      };
    }
  }

  return {
    ...state,
    highlightIndex: null,
    highlightProbeSequence: probeSeq,
    message: `Table full — could not insert ${key}. Rehash needed.`,
    steps: [...state.steps, { action: 'insert' as const, key, index: -1, probes, probeSequence: probeSeq, message: 'Insert failed — table full' }],
    history: [...state.history, `Failed to insert ${key} — table full`],
  };
}

export function hashSearch(state: HashingState, key: number): HashingState {
  const probeSeq = getProbeSequence(state, key);
  let probes = 0;

  for (const idx of probeSeq) {
    probes++;
    const entry = state.table[idx];
    if (entry.state === 'empty') {
      return {
        ...state,
        highlightIndex: null,
        highlightProbeSequence: probeSeq.slice(0, probes),
        message: `${key} not found (stopped at empty slot after ${probes} probe${probes > 1 ? 's' : ''})`,
        steps: [...state.steps, { action: 'search' as const, key, index: -1, probes, probeSequence: probeSeq.slice(0, probes), message: `${key} not found` }],
        history: [...state.history, `Search ${key}: not found (${probes} probes)`],
      };
    }
    if (entry.state === 'occupied' && entry.key === key) {
      return {
        ...state,
        highlightIndex: idx,
        highlightProbeSequence: probeSeq.slice(0, probes),
        message: `Found ${key} at index ${idx} (${probes} probe${probes > 1 ? 's' : ''})`,
        steps: [...state.steps, { action: 'search' as const, key, index: idx, probes, probeSequence: probeSeq.slice(0, probes), message: `Found ${key}` }],
        history: [...state.history, `Search ${key}: found at index ${idx} (${probes} probes)`],
      };
    }
  }

  return {
    ...state,
    highlightIndex: null,
    highlightProbeSequence: probeSeq,
    message: `${key} not found after ${probes} probes`,
    steps: [...state.steps, { action: 'search' as const, key, index: -1, probes, probeSequence: probeSeq, message: `${key} not found` }],
    history: [...state.history, `Search ${key}: not found (${probes} probes)`],
  };
}

export function hashDelete(state: HashingState, key: number): HashingState {
  const probeSeq = getProbeSequence(state, key);
  let probes = 0;

  for (const idx of probeSeq) {
    probes++;
    const entry = state.table[idx];
    if (entry.state === 'empty') {
      return {
        ...state,
        highlightIndex: null,
        highlightProbeSequence: probeSeq.slice(0, probes),
        message: `${key} not found — nothing to delete`,
        steps: [...state.steps, { action: 'delete' as const, key, index: -1, probes, probeSequence: probeSeq.slice(0, probes), message: `${key} not found` }],
        history: state.history,
      };
    }
    if (entry.state === 'occupied' && entry.key === key) {
      const table = state.table.map(e => ({ ...e }));
      table[idx] = { key: null, value: '', state: 'deleted' };
      const newCount = state.count - 1;
      return {
        ...state,
        table,
        count: newCount,
        loadFactor: newCount / state.size,
        highlightIndex: idx,
        highlightProbeSequence: probeSeq.slice(0, probes),
        message: `Deleted ${key} from index ${idx} (lazy deletion)`,
        steps: [...state.steps, { action: 'delete' as const, key, index: idx, probes, probeSequence: probeSeq.slice(0, probes), message: `Deleted ${key}` }],
        history: [...state.history, `Deleted ${key} from index ${idx}`],
      };
    }
  }

  return {
    ...state,
    highlightIndex: null,
    highlightProbeSequence: probeSeq,
    message: `${key} not found — nothing to delete`,
    steps: [...state.steps, { action: 'delete' as const, key, index: -1, probes, probeSequence: probeSeq, message: `${key} not found` }],
    history: state.history,
  };
}

export function hashRehash(state: HashingState): HashingState {
  const newSize = state.size * 2 + 1;
  let newState = createHashingState(state.method, newSize);

  for (const entry of state.table) {
    if (entry.state === 'occupied' && entry.key !== null) {
      newState = hashInsert(newState, entry.key, entry.value);
    }
  }

  return {
    ...newState,
    message: `Rehashed: ${state.size} → ${newSize} slots`,
    history: [...state.history, `Rehashed from ${state.size} to ${newSize} slots`],
  };
}

export function getRandomKeys(count: number, max: number = 99): number[] {
  const keys: number[] = [];
  const used = new Set<number>();
  while (keys.length < count) {
    const k = Math.floor(Math.random() * max) + 1;
    if (!used.has(k)) {
      used.add(k);
      keys.push(k);
    }
  }
  return keys;
}
