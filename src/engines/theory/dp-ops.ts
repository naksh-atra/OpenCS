export interface DPStep {
  cell: [number, number];
  value: number | string;
  computation: string;
  message: string;
}

export interface DPState {
  problem: string;
  label: string;
  table: (number | string)[][];
  rows: number;
  cols: number;
  currentCell: [number, number] | null;
  highlightCells: [number, number][];
  backtrackPath: [number, number][];
  message: string;
  steps: DPStep[];
  currentStep: number;
  rowLabels: string[];
  colLabels: string[];
}

export function createDPState(problem: string): DPState {
  switch (problem) {
    case 'fibonacci':
      return createFibonacciState(8);
    case 'lcs':
      return createLCSState('ABCDGH', 'AEDFHR');
    case 'knapsack':
      return createKnapsackState([1, 2, 3], [6, 10, 12], 5);
    default:
      return createFibonacciState(8);
  }
}

function createFibonacciState(n: number): DPState {
  const table: (number | string)[][] = Array.from({ length: n + 1 }, () => ['  ']);
  const steps: DPStep[] = [];

  // Base cases
  table[0] = [0 as number | string];
  steps.push({ cell: [0, 0], value: 0, computation: 'F(0) = 0', message: 'Base case: F(0) = 0' });
  table[1] = [1 as number | string];
  steps.push({ cell: [1, 0], value: 1, computation: 'F(1) = 1', message: 'Base case: F(1) = 1' });

  for (let i = 2; i <= n; i++) {
    const val = (table[i - 1][0] as number) + (table[i - 2][0] as number);
    table[i] = [val];
    steps.push({
      cell: [i, 0],
      value: val,
      computation: `F(${i}) = F(${i - 1}) + F(${i - 2}) = ${table[i - 1][0]} + ${table[i - 2][0]} = ${val}`,
      message: `F(${i}) = ${val}`,
    });
  }

  return {
    problem: 'fibonacci',
    label: `Fibonacci(${n})`,
    table, rows: n + 1, cols: 1,
    currentCell: null, highlightCells: [], backtrackPath: [],
    message: `F(${n}) = ${table[n][0]}`,
    steps, currentStep: steps.length - 1,
    rowLabels: Array.from({ length: n + 1 }, (_, i) => `F(${i})`),
    colLabels: ['Value'],
  };
}

function createLCSState(s1: string, s2: string): DPState {
  const m = s1.length;
  const n = s2.length;
  const table: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  const steps: DPStep[] = [];

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0 || j === 0) {
        table[i][j] = 0;
      } else if (s1[i - 1] === s2[j - 1]) {
        table[i][j] = table[i - 1][j - 1] + 1;
        steps.push({
          cell: [i, j],
          value: table[i][j],
          computation: `dp[${i}][${j}] = dp[${i - 1}][${j - 1}] + 1 = ${table[i][j]} (match: ${s1[i - 1]})`,
          message: `Match at s1[${i - 1}]='${s1[i - 1]}' == s2[${j - 1}]='${s2[j - 1]}' → dp[${i}][${j}] = ${table[i][j]}`,
        });
      } else {
        table[i][j] = Math.max(table[i - 1][j], table[i][j - 1]);
        steps.push({
          cell: [i, j],
          value: table[i][j],
          computation: `dp[${i}][${j}] = max(dp[${i - 1}][${j}], dp[${i}][${j - 1}]) = ${table[i][j]}`,
          message: `dp[${i}][${j}] = max(${table[i - 1][j]}, ${table[i][j - 1]}) = ${table[i][j]}`,
        });
      }
    }
  }

  // Backtrack
  const backtrack: [number, number][] = [];
  let i = m, j = n;
  while (i > 0 && j > 0) {
    if (s1[i - 1] === s2[j - 1]) {
      backtrack.unshift([i, j]);
      i--; j--;
    } else if (table[i - 1][j] > table[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return {
    problem: 'lcs',
    label: `LCS("${s1}", "${s2}")`,
    table, rows: m + 1, cols: n + 1,
    currentCell: null, highlightCells: [], backtrackPath: backtrack,
    message: `LCS length = ${table[m][n]}`,
    steps, currentStep: steps.length - 1,
    rowLabels: ['#', ...s1.split('')],
    colLabels: ['#', ...s2.split('')],
  };
}

function createKnapsackState(weights: number[], values: number[], capacity: number): DPState {
  const n = weights.length;
  const table: number[][] = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
  const steps: DPStep[] = [];

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      const wi = weights[i - 1];
      const vi = values[i - 1];
      if (wi > w) {
        table[i][w] = table[i - 1][w];
      } else {
        table[i][w] = Math.max(table[i - 1][w], table[i - 1][w - wi] + vi);
      }
      steps.push({
        cell: [i, w],
        value: table[i][w],
        computation: `dp[${i}][${w}] = max(dp[${i - 1}][${w}], dp[${i - 1}][${w - wi}] + ${vi}) = ${table[i][w]}`,
        message: `Item ${i} (w=${wi}, v=${vi}) at capacity ${w}: dp[${i}][${w}] = ${table[i][w]}`,
      });
    }
  }

  return {
    problem: 'knapsack',
    label: `Knapsack (capacity=${capacity})`,
    table, rows: n + 1, cols: capacity + 1,
    currentCell: null, highlightCells: [], backtrackPath: [],
    message: `Max value = ${table[n][capacity]}`,
    steps, currentStep: steps.length - 1,
    rowLabels: ['#', ...weights.map((w, i) => `I${i + 1}(w=${w})`)],
    colLabels: Array.from({ length: capacity + 1 }, (_, w) => `w=${w}`),
  };
}

export function stepForward(state: DPState): DPState {
  if (state.currentStep >= state.steps.length - 1) {
    return { ...state, message: 'Already at final step' };
  }
  const nextStep = state.currentStep + 1;
  const step = state.steps[nextStep];
  return {
    ...state,
    currentStep: nextStep,
    currentCell: step.cell,
    highlightCells: [...state.highlightCells, step.cell],
    message: step.message,
  };
}

export function runFull(state: DPState): DPState {
  let current = { ...state };
  while (current.currentStep < current.steps.length - 1) {
    current = stepForward(current);
  }
  return current;
}
