export type ComplexityTier = 'optimal' | 'good' | 'fair' | 'moderate' | 'costly' | 'expensive';

export interface ComplexityClass {
  id: string;
  label: string;
  notation: string;
  height: number;
  tier: ComplexityTier;
  description: string;
  example: string;
}

export const complexityClasses: ComplexityClass[] = [
  {
    id: 'o1',
    label: 'O(1)',
    notation: 'O(1)',
    height: 15,
    tier: 'optimal',
    description: 'Constant time — always takes the same regardless of input size',
    example: 'Array index access, hash table lookup',
  },
  {
    id: 'ologn',
    label: 'O(log n)',
    notation: 'O(log n)',
    height: 30,
    tier: 'good',
    description: 'Logarithmic time — doubling input adds one step',
    example: 'Binary search, balanced tree traversal',
  },
  {
    id: 'on',
    label: 'O(n)',
    notation: 'O(n)',
    height: 50,
    tier: 'fair',
    description: 'Linear time — grows proportionally with input',
    example: 'Linear search, single loop, linked list traversal',
  },
  {
    id: 'onlogn',
    label: 'O(n log n)',
    notation: 'O(n log n)',
    height: 65,
    tier: 'moderate',
    description: 'Linearithmic time — common for efficient sorting',
    example: 'Merge sort, heap sort, quicksort average',
  },
  {
    id: 'on2',
    label: 'O(n²)',
    notation: 'O(n²)',
    height: 80,
    tier: 'costly',
    description: 'Quadratic time — nested loops over same input',
    example: 'Bubble sort, insertion sort, naive duplicate check',
  },
  {
    id: 'on3',
    label: 'O(n³)',
    notation: 'O(n³)',
    height: 90,
    tier: 'costly',
    description: 'Cubic time — triple nested loops',
    example: 'Floyd-Warshall, naive matrix multiplication',
  },
  {
    id: 'o2n',
    label: 'O(2ⁿ)',
    notation: 'O(2ⁿ)',
    height: 100,
    tier: 'expensive',
    description: 'Exponential time — each input doubles work',
    example: 'Naive Fibonacci, power set generation',
  },
  {
    id: 'onf',
    label: 'O(n!)',
    notation: 'O(n!)',
    height: 100,
    tier: 'expensive',
    description: 'Factorial time — grows faster than exponential',
    example: 'Traveling salesman brute force, permutation generation',
  },
];

export function getComplexityById(id: string): ComplexityClass | undefined {
  return complexityClasses.find(c => c.id === id);
}

export function filterByTier(tier: ComplexityTier): ComplexityClass[] {
  return complexityClasses.filter(c => c.tier === tier);
}