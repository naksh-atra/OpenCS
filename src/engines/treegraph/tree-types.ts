export type TreeNode = {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
};

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

export function createNode(value: number, left: TreeNode | null = null, right: TreeNode | null = null): TreeNode {
  return { value, left, right };
}

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

function doPreorder(node: TreeNode | null, result: number[], steps: TraversalStep[], path: number[]): void {
  if (!node) return;
  path.push(node.value);
  steps.push({ node: node.value, action: 'visit', path: [...path], order: 'preorder' });
  result.push(node.value);
  doPreorder(node.left, result, steps, path);
  path.pop();
  doPreorder(node.right, result, steps, path);
  path.pop();
}

function doInorder(node: TreeNode | null, result: number[], steps: TraversalStep[], path: number[]): void {
  if (!node) return;
  doInorder(node.left, result, steps, path);
  path.push(node.value);
  steps.push({ node: node.value, action: 'visit', path: [...path], order: 'inorder' });
  result.push(node.value);
  path.pop();
  doInorder(node.right, result, steps, path);
}

function doPostorder(node: TreeNode | null, result: number[], steps: TraversalStep[], path: number[]): void {
  if (!node) return;
  doPostorder(node.left, result, steps, path);
  doPostorder(node.right, result, steps, path);
  path.push(node.value);
  steps.push({ node: node.value, action: 'visit', path: [...path], order: 'postorder' });
  result.push(node.value);
  path.pop();
}

function doLevelOrder(root: TreeNode | null, result: number[], steps: TraversalStep[]): void {
  if (!root) return;
  const queue: TreeNode[] = [root];
  let depth = 0;
  while (queue.length) {
    const levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      steps.push({ node: node.value, action: 'visit', path: [depth], order: `level-${depth}` });
      result.push(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    depth++;
  }
}

export function computeTraversal(type: string, root: TreeNode | null): { result: number[]; steps: TraversalStep[] } {
  const result: number[] = [];
  const steps: TraversalStep[] = [];
  const path: number[] = [];
  switch (type) {
    case 'preorder': doPreorder(root, result, steps, path); break;
    case 'inorder': doInorder(root, result, steps, path); break;
    case 'postorder': doPostorder(root, result, steps, path); break;
    case 'level-order': doLevelOrder(root, result, steps); break;
  }
  return { result, steps };
}

export const PRESET_TREES = [
  { label: 'Balanced', arr: [8, 3, 10, 1, 6, null, 14, null, null, 4, 7, null, null, 13, null], description: 'Well-balanced BST' },
  { label: 'Skewed Left', arr: [5, 3, null, 1, null, null, null], description: 'Left-skewed tree' },
  { label: 'Full', arr: [1, 2, 3, 4, 5, 6, 7], description: 'Perfect binary tree' },
  { label: 'Small', arr: [4, 2, 6, 1, 3, 5, 7], description: 'Simple BST' },
];

export function treeToArray(root: TreeNode | null): (number | null)[] {
  if (!root) return [];
  const result: (number | null)[] = [];
  const queue: TreeNode[] = [root];
  while (queue.length) {
    const node = queue.shift()!;
    result.push(node.value);
    if (!node.left && !node.right) break;
    queue.push(node.left!);
    queue.push(node.right!);
    if (!node.left) result.push(null);
    if (!node.right) result.push(null);
  }
  while (result[result.length - 1] === null) result.pop();
  return result;
}