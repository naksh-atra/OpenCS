import type { TreeNode } from './tree-types';
import { buildTreeFromArray, inorderCollect } from './tree-types';

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

function insert(root: TreeNode | null, value: number): TreeNode {
  if (!root) return { value, left: null, right: null };
  if (value < root.value) root.left = insert(root.left, value);
  else if (value > root.value) root.right = insert(root.right, value);
  return root;
}

function search(node: TreeNode | null, value: number, visited: number[]): { found: boolean; visited: number[] } {
  let current = node;
  while (current) {
    visited.push(current.value);
    if (value === current.value) return { found: true, visited };
    current = value < current.value ? current.left : current.right;
  }
  return { found: false, visited };
}

function findMin(node: TreeNode): TreeNode {
  while (node.left) node = node.left;
  return node;
}

function deleteNode(node: TreeNode | null, value: number): TreeNode | null {
  if (!node) return null;
  if (value < node.value) node.left = deleteNode(node.left, value);
  else if (value > node.value) node.right = deleteNode(node.right, value);
  else {
    if (!node.left) return node.right;
    if (!node.right) return node.left;
    const successor = findMin(node.right);
    node.value = successor.value;
    node.right = deleteNode(node.right, successor.value);
  }
  return node;
}

function collectSearchPath(root: TreeNode | null, value: number): BSTStep[] {
  const steps: BSTStep[] = [];
  let current = root;
  while (current) {
    steps.push({
      node: current.value,
      action: 'search',
      visited: steps.map(s => s.node),
      highlighted: [],
      message:
        current.value === value
          ? `Found ${value}`
          : value < current.value ? `Go left from ${current.value}` : `Go right from ${current.value}`,
    });
    if (current.value === value) break;
    current = value < current.value ? current.left : current.right;
  }
  return steps;
}

export function computeBSTOperation(op: BSTOperation, value: number, root: TreeNode | null): BSTState {
  const steps: BSTStep[] = [];
  let newRoot = root;

  if (op === 'search') {
    const { found, visited } = search(root, value, []);
    const result: number[] = [];
    inorderCollect(root, result);
    steps.push({
      node: value,
      action: found ? 'found' : 'not-found',
      visited,
      highlighted: found ? [value] : [],
      message: found ? `Found ${value}` : `${value} not in tree`,
    });
    return { root, steps, currentStep: 0, result, message: steps[0].message };
  }

  const searchSteps = collectSearchPath(root, value);
  steps.push(...searchSteps);

  if (op === 'insert') {
    newRoot = insert(root, value);
    const result: number[] = [];
    inorderCollect(newRoot, result);
    steps.push({ node: value, action: 'insert', visited: [], highlighted: [], message: `Inserted ${value}` });
    return { root: newRoot, steps, currentStep: steps.length - 1, result, message: `Inserted ${value}` };
  }

  if (op === 'delete') {
    newRoot = deleteNode(root, value);
    const result: number[] = [];
    inorderCollect(newRoot, result);
    steps.push({ node: value, action: 'delete', visited: [], highlighted: [], message: `Deleted ${value}` });
    return { root: newRoot, steps, currentStep: steps.length - 1, result, message: `Deleted ${value}` };
  }

  return { root, steps, currentStep: 0, result: [], message: 'No operation' };
}

export function createBSTState(root: TreeNode | null = null): BSTState {
  const result: number[] = [];
  inorderCollect(root, result);
  return { root, steps: [], currentStep: 0, result, message: root ? 'BST ready' : 'Tree is empty' };
}