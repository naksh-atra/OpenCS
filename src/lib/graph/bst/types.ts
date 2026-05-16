// Types and dummy export for BST visualizer
export const __bst_dummy = {};

export type TreeNode = {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
};

export function buildTreeFromArray(arr: (number | null)[]): TreeNode | null {
  if (!arr.length || arr[0] === null) return null;
  const root: TreeNode = { value: arr[0], left: null, right: null };
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    const node = queue.shift()!;
    if (i < arr.length && arr[i] !== null) {
      node.left = { value: arr[i]!, left: null, right: null };
      queue.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      node.right = { value: arr[i]!, left: null, right: null };
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

export function inorderCollect(node: TreeNode | null, result: number[]): void {
  if (!node) return;
  inorderCollect(node.left, result);
  result.push(node.value);
  inorderCollect(node.right, result);
}

export interface TraversalStep {
  node: number;
  action: 'visit' | 'push' | 'pop';
  path: number[];
  order: string;
}

export interface TreeTraversalState {
  root: TreeNode | null;
  steps: TraversalStep[];
  currentStep: number;
  message: string;
}

export type BSTOperation = 'insert' | 'search' | 'delete';

export interface BSTStep {
  node: number;
  action: BSTOperation | 'found' | 'not-found' | 'replaced';
  visited: number[];
  highlighted: number[];
  message: string;
}

export interface BSTState {
  root: TreeNode | null;
  steps: BSTStep[];
  currentStep: number;
  result: number[];
  message: string;
}
