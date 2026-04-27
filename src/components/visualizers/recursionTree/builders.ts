import { TreeNode, LayoutConfig } from './types';

export const PRESETS = {
  factorial: { maxRenderDepth: 5, complexity: 'O(n)', label: 'Factorial' },
  fibonacci: { maxRenderDepth: 5, complexity: 'O(2^n)', label: 'Fibonacci' },
  'binary-search': { maxRenderDepth: 4, complexity: 'O(log n)', label: 'Binary Search', rangeSize: 16 },
} as const;

export const LAYOUT: Record<string, LayoutConfig> = {
  factorial: { nodeRadius: 18, leafRadius: 16, levelHeight: 48, minHeight: 220, maxHeight: 420 },
  fibonacci: { nodeRadius: 16, leafRadius: 14, levelHeight: 58, minHeight: 260, maxHeight: 460 },
  'binary-search': { nodeRadius: 16, leafRadius: 14, levelHeight: 56, minHeight: 240, maxHeight: 420 },
};

export const CAPTIONS = {
  factorial: 'One recursive call per level until the base case returns 1',
  fibonacci: 'Each call spawns two subcalls — repeated calls cause exponential growth',
  'binary-search': 'Each call halves the search range; complexity grows by depth, not breadth',
};

export function getActualTreeDepth(node: TreeNode | null, currentDepth: number = 0): number {
  if (!node) return currentDepth;
  if (node.children.length === 0) return currentDepth + 1;
  let maxChildDepth = currentDepth;
  node.children.forEach(child => {
    if (child) {
      maxChildDepth = Math.max(maxChildDepth, getActualTreeDepth(child, currentDepth + 1));
    }
  });
  return maxChildDepth;
}

export function getCanvasHeight(renderedDepth: number, config: LayoutConfig): number {
  const TOP_PADDING = 40;
  const BOTTOM_LABEL_SPACE = 24;
  const computed = TOP_PADDING + (renderedDepth * config.levelHeight) + BOTTOM_LABEL_SPACE;
  return Math.min(Math.max(computed, config.minHeight), config.maxHeight);
}

export function buildFactorialTree(n: number, level: number = 0, maxRenderDepth: number): TreeNode | null {
  if (n < 0) return null;
  
  const isBaseCase = n === 0;
  const isTerminal = isBaseCase || level >= maxRenderDepth - 1;
  
  if (isTerminal) {
    return {
      label: isBaseCase ? 'fact(0)' : `fact(${n})`,
      sublabel: isBaseCase ? '→ 1' : undefined,
      type: level === 0 ? 'root' : 'leaf',
      level,
      children: []
    };
  }
  
  const child = buildFactorialTree(n - 1, level + 1, maxRenderDepth);
  return { 
    label: `fact(${n})`, 
    type: level === 0 ? 'root' : 'internal',
    level,
    children: child ? [child] : [] 
  };
}

export function buildFibonacciTree(n: number, level: number = 0, maxRenderDepth: number): TreeNode | null {
  const isBaseCase = n <= 1;
  const isTerminal = isBaseCase || level >= maxRenderDepth - 1;
  
  if (isTerminal) {
    return {
      label: `fib(${n})`,
      type: level === 0 ? 'root' : 'leaf',
      level,
      children: []
    };
  }
  
  const left = buildFibonacciTree(n - 1, level + 1, maxRenderDepth);
  const right = buildFibonacciTree(n - 2, level + 1, maxRenderDepth);
  return { 
    label: `fib(${n})`, 
    type: level === 0 ? 'root' : 'internal',
    level,
    children: ([left, right].filter(Boolean) as TreeNode[])
  };
}

export function buildBinarySearchTree(low: number, high: number, level: number = 0, maxRenderDepth: number): TreeNode | null {
  if (low > high) return null;
  
  const mid = Math.floor((low + high) / 2);
  const isNaturalLeaf = low === high;
  const isTerminal = isNaturalLeaf || level >= maxRenderDepth - 1;
  
  if (isTerminal) {
    return {
      label: isNaturalLeaf ? `[${low}]` : `${low}..${high}`,
      sublabel: isNaturalLeaf ? 'found' : `mid=${mid}`,
      type: level === 0 ? 'root' : 'leaf',
      level,
      children: []
    };
  }
  
  return {
    label: `${low}..${high}`,
    sublabel: `mid=${mid}`,
    type: level === 0 ? 'root' : 'internal',
    level,
    children: [
      buildBinarySearchTree(low, mid - 1, level + 1, maxRenderDepth),
      buildBinarySearchTree(mid + 1, high, level + 1, maxRenderDepth)
    ].filter(Boolean) as TreeNode[]
  };
}