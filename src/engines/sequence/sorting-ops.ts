export type SortAlgorithm = 'bubble' | 'insertion' | 'merge';

export type SortAction = 'compare' | 'swap' | 'insert' | 'merge' | 'copy' | 'done' | 'split' | 'merge-split';

export interface SortStep {
  action: SortAction;
  indices: number[];
  array: number[];
  highlight: number[];
  sorted: number[];
  left?: number[];
  right?: number[];
  merged?: number[];
  message: string;
}

export interface SortingState {
  result: number[];
  steps: SortStep[];
  message: string;
}

function makeStep(
  action: SortAction,
  array: number[],
  indices: number[],
  highlight: number[],
  sorted: number[],
  message: string,
  extras?: Partial<Pick<SortStep, 'left' | 'right' | 'merged'>>
): SortStep {
  return { action, indices, array, highlight, sorted, message, ...extras };
}

export function computeBubbleSort(arr: number[]): SortingState {
  const a = [...arr];
  const steps: SortStep[] = [];
  const sorted: number[] = [];
  const n = a.length;

  steps.push(makeStep('compare', [...a], [], [], [], `Start bubble sort with [${a.join(', ')}]`));

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push(makeStep('compare', [...a], [j, j + 1], [j, j + 1], [...sorted], `Compare ${a[j]} and ${a[j + 1]}`));
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push(makeStep('swap', [...a], [j, j + 1], [j, j + 1], [...sorted], `Swap ${a[j + 1]} and ${a[j]}`));
      }
    }
    sorted.unshift(a[n - i - 1]);
    steps.push(makeStep('done', [...a], [n - i - 1], [n - i - 1], [...sorted], `Bubble ${a[n - i - 1]} to sorted`));
  }
  sorted.unshift(a[0]);
  const finalMessage = `Bubble sort done: [${a.join(', ')}]`;
  steps.push(makeStep('done', [...a], [0], [], [...sorted], finalMessage));
  return { result: a, steps, message: finalMessage };
}

export function computeInsertionSort(arr: number[]): SortingState {
  const a = [...arr];
  const steps: SortStep[] = [];
  const sorted: number[] = [a[0]];
  const n = a.length;

  steps.push(makeStep('compare', [...a], [], [0], [], `Start insertion sort. Sorted: [${a[0]}]`));

  for (let i = 1; i < n; i++) {
    const key = a[i];
    let j = i - 1;
    steps.push(makeStep('compare', [...a], [i], [i], [...sorted], `Insert ${key} into sorted portion`));
    while (j >= 0 && a[j] > key) {
      steps.push(makeStep('compare', [...a], [j, j + 1], [j, j + 1], [...sorted], `Compare ${a[j]} and ${key} (shift ${a[j]})`));
      a[j + 1] = a[j];
      steps.push(makeStep('swap', [...a], [j, j + 1], [j, j + 1], [...sorted], `Shift ${a[j]} right`));
      j--;
    }
    a[j + 1] = key;
    sorted.push(key);
    steps.push(makeStep('insert', [...a], [j + 1], [j + 1], [...sorted], `Insert ${key} at position ${j + 1}`));
  }

  const finalMessage = `Insertion sort done: [${a.join(', ')}]`;
  steps.push(makeStep('done', [...a], [], [], [...a], finalMessage));
  return { result: a, steps, message: finalMessage };
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
}

function mergeSortHelper(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSortHelper(arr.slice(0, mid));
  const right = mergeSortHelper(arr.slice(mid));
  return merge(left, right);
}

export function computeMergeSort(arr: number[]): SortingState {
  const steps: SortStep[] = [];
  const sorted: number[] = [];
  const a = [...arr];

  steps.push(makeStep('compare', [...a], [], [], [], `Start merge sort with [${a.join(', ')}]`));

  function ms(arr: number[], depth: number): number[] {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = ms(arr.slice(0, mid), depth + 1);
    const right = ms(arr.slice(mid), depth + 1);
    const merged = merge(left, right);

    steps.push(makeStep('split', [...a], [], [], [...sorted], `Split into L:[${left.join(',')}] R:[${right.join(',')}]`));
    steps.push(makeStep('merge', [...a], [], [], [...sorted], `Merge [${merged.join(',')}]`, { left, right, merged }));
    return merged;
  }

  ms(a, 0);
  const result = mergeSortHelper([...arr]);
  const finalMessage = `Merge sort done: [${result.join(', ')}]`;
  steps.push(makeStep('done', result, [], [], result, finalMessage));
  return { result, steps, message: finalMessage };
}

export function computeSort(algorithm: SortAlgorithm, arr: number[]): SortingState {
  switch (algorithm) {
    case 'bubble': return computeBubbleSort(arr);
    case 'insertion': return computeInsertionSort(arr);
    case 'merge': return computeMergeSort(arr);
  }
}

export const SORT_PRESETS = [
  { label: 'Shuffled', arr: [5, 2, 8, 1, 6, 3, 7, 4] },
  { label: 'Reversed', arr: [8, 7, 6, 5, 4, 3, 2, 1] },
  { label: 'Nearly Sorted', arr: [1, 2, 4, 3, 5, 7, 6, 8] },
  { label: 'Few Unique', arr: [3, 1, 3, 1, 3, 1, 3, 1] },
];