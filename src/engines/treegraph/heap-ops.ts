export type HeapType = 'min' | 'max';

export interface Heap {
  data: number[];
  type: HeapType;
  size: number;
}

export interface HeapStep {
  action: 'insert' | 'extract' | 'heapify' | 'swap' | 'compare';
  indices: number[];
  values: number[];
  message: string;
}

export interface HeapState {
  heap: Heap;
  steps: HeapStep[];
  currentStep: number;
  highlightIndices: number[];
  comparingIndices: number[];
  swappedIndices: number[];
  message: string;
}

export function createHeap(type: HeapType = 'min', data: number[] = []): Heap {
  return { data: [...data], type, size: data.length };
}

export function parent(i: number): number {
  return Math.floor((i - 1) / 2);
}

export function leftChild(i: number): number {
  return 2 * i + 1;
}

export function rightChild(i: number): number {
  return 2 * i + 2;
}

export function compare(heap: Heap, a: number, b: number): boolean {
  if (heap.type === 'min') return a < b;
  return a > b;
}

export function swap(arr: number[], i: number, j: number): void {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

export function bubbleUp(heap: Heap, index: number, steps: HeapStep[]): void {
  let i = index;
  while (i > 0) {
    const p = parent(i);
    steps.push({
      action: 'compare',
      indices: [i, p],
      values: [heap.data[i], heap.data[p]],
      message: `Compare ${heap.data[i]} with parent ${heap.data[p]}`,
    });
    if (compare(heap, heap.data[i], heap.data[p])) {
      swap(heap.data, i, p);
      steps.push({
        action: 'swap',
        indices: [i, p],
        values: [heap.data[i], heap.data[p]],
        message: `Swap ${heap.data[p]} ↔ ${heap.data[i]}`,
      });
      i = p;
    } else {
      break;
    }
  }
}

export function bubbleDown(heap: Heap, index: number, steps: HeapStep[]): void {
  let i = index;
  while (true) {
    const l = leftChild(i);
    const r = rightChild(i);
    let target = i;

    if (l < heap.size) {
      steps.push({
        action: 'compare',
        indices: [target, l],
        values: [heap.data[target], heap.data[l]],
        message: `Compare ${heap.data[target]} with left child ${heap.data[l]}`,
      });
      if (compare(heap, heap.data[l], heap.data[target])) {
        target = l;
      }
    }

    if (r < heap.size) {
      steps.push({
        action: 'compare',
        indices: [target, r],
        values: [heap.data[target], heap.data[r]],
        message: `Compare ${heap.data[target]} with right child ${heap.data[r]}`,
      });
      if (compare(heap, heap.data[r], heap.data[target])) {
        target = r;
      }
    }

    if (target !== i) {
      swap(heap.data, i, target);
      steps.push({
        action: 'swap',
        indices: [i, target],
        values: [heap.data[i], heap.data[target]],
        message: `Swap ${heap.data[target]} ↔ ${heap.data[i]}`,
      });
      i = target;
    } else {
      break;
    }
  }
}

export function heapInsert(state: HeapState, value: number): HeapState {
  const heap: Heap = { ...state.heap, data: [...state.heap.data, value] };
  heap.size++;
  const steps: HeapStep[] = [...state.steps];
  const insertIdx = heap.size - 1;

  steps.push({
    action: 'insert',
    indices: [insertIdx],
    values: [value],
    message: `Insert ${value} at index ${insertIdx}`,
  });

  bubbleUp(heap, insertIdx, steps);

  return {
    ...state,
    heap,
    steps,
    currentStep: steps.length - 1,
    highlightIndices: [insertIdx],
    comparingIndices: [],
    swappedIndices: [],
    message: `Inserted ${value}`,
  };
}

export function heapExtractRoot(state: HeapState): HeapState {
  if (state.heap.size === 0) {
    return { ...state, message: 'Heap is empty' };
  }

  const heap: Heap = { ...state.heap, data: [...state.heap.data] };
  const steps: HeapStep[] = [...state.steps];
  const root = heap.data[0];

  steps.push({
    action: 'extract',
    indices: [0],
    values: [root],
    message: `Extract root: ${root}`,
  });

  heap.data[0] = heap.data[heap.size - 1];
  heap.size--;

  if (heap.size > 0) {
    bubbleDown(heap, 0, steps);
  }

  return {
    ...state,
    heap,
    steps,
    currentStep: steps.length - 1,
    highlightIndices: [],
    comparingIndices: [],
    swappedIndices: [],
    message: `Extracted ${root}`,
  };
}

export function buildHeap(state: HeapState): HeapState {
  const heap: Heap = { ...state.heap };
  const steps: HeapStep[] = [...state.steps];

  steps.push({
    action: 'heapify',
    indices: [],
    values: [],
    message: `Building ${heap.type} heap from array`,
  });

  for (let i = Math.floor(heap.size / 2) - 1; i >= 0; i--) {
    bubbleDown(heap, i, steps);
  }

  return {
    ...state,
    heap,
    steps,
    currentStep: steps.length - 1,
    highlightIndices: [],
    comparingIndices: [],
    swappedIndices: [],
    message: `Heap built`,
  };
}

export function getTreeLevels(heap: Heap): number[][] {
  const levels: number[][] = [];
  let level = 0;
  let count = 0;
  let levelSize = 1;

  while (count < heap.size) {
    const levelNodes: number[] = [];
    for (let i = 0; i < levelSize && count < heap.size; i++) {
      levelNodes.push(heap.data[count]);
      count++;
    }
    levels.push(levelNodes);
    levelSize *= 2;
    level++;
  }

  return levels;
}

export function verifyHeapProperty(heap: Heap): boolean {
  for (let i = 0; i < heap.size; i++) {
    const l = leftChild(i);
    const r = rightChild(i);
    if (l < heap.size && !compare(heap, heap.data[i], heap.data[l])) return false;
    if (r < heap.size && !compare(heap, heap.data[i], heap.data[r])) return false;
  }
  return true;
}

export function createHeapState(type: HeapType = 'min', data: number[] = []): HeapState {
  const heap = createHeap(type, data);
  return {
    heap,
    steps: [],
    currentStep: -1,
    highlightIndices: [],
    comparingIndices: [],
    swappedIndices: [],
    message: data.length > 0 ? `Heap initialized with ${data.length} elements` : 'Empty heap',
  };
}
