export interface AVLNode {
  value: number;
  left: AVLNode | null;
  right: AVLNode | null;
  height: number;
}

export interface AVLStep {
  action: 'insert' | 'delete' | 'rotate' | 'balance';
  node: number;
  rotationType: 'LL' | 'RR' | 'LR' | 'RL' | null;
  path: number[];
  message: string;
}

export interface AVLState {
  root: AVLNode | null;
  steps: AVLStep[];
  currentStep: number;
  highlightNode: number | null;
  message: string;
}

export function createAVLState(): AVLState {
  return { root: null, steps: [], currentStep: -1, highlightNode: null, message: 'Empty AVL tree' };
}

function height(node: AVLNode | null): number {
  return node ? node.height : 0;
}

function updateHeight(node: AVLNode): void {
  node.height = 1 + Math.max(height(node.left), height(node.right));
}

function getBalance(node: AVLNode | null): number {
  return node ? height(node.left) - height(node.right) : 0;
}

function rotateRight(y: AVLNode): AVLNode {
  const x = y.left!;
  const T2 = x.right;
  x.right = y;
  y.left = T2;
  updateHeight(y);
  updateHeight(x);
  return x;
}

function rotateLeft(x: AVLNode): AVLNode {
  const y = x.right!;
  const T2 = y.left;
  y.left = x;
  x.right = T2;
  updateHeight(x);
  updateHeight(y);
  return y;
}

function balance(node: AVLNode, steps: AVLStep[], path: number[]): AVLNode {
  updateHeight(node);
  const bf = getBalance(node);

  if (bf > 1) {
    if (getBalance(node.left) < 0) {
      // LR rotation
      steps.push({ action: 'rotate', node: node.value, rotationType: 'LR', path: [...path], message: `LR rotation at ${node.value}` });
      node.left = rotateLeft(node.left!);
    }
    // LL rotation
    if (getBalance(node.left) >= 0) {
      steps.push({ action: 'rotate', node: node.value, rotationType: 'LL', path: [...path], message: `LL rotation at ${node.value}` });
    }
    return rotateRight(node);
  }

  if (bf < -1) {
    if (getBalance(node.right) > 0) {
      // RL rotation
      steps.push({ action: 'rotate', node: node.value, rotationType: 'RL', path: [...path], message: `RL rotation at ${node.value}` });
      node.right = rotateRight(node.right!);
    }
    // RR rotation
    if (getBalance(node.right) <= 0) {
      steps.push({ action: 'rotate', node: node.value, rotationType: 'RR', path: [...path], message: `RR rotation at ${node.value}` });
    }
    return rotateLeft(node);
  }

  return node;
}

function insertNode(node: AVLNode | null, value: number, steps: AVLStep[], path: number[]): AVLNode {
  if (!node) {
    steps.push({ action: 'insert', node: value, rotationType: null, path: [...path, value], message: `Insert ${value}` });
    return { value, left: null, right: null, height: 1 };
  }

  if (value < node.value) {
    node.left = insertNode(node.left, value, steps, [...path, node.value]);
  } else if (value > node.value) {
    node.right = insertNode(node.right, value, steps, [...path, node.value]);
  } else {
    return node; // Duplicate
  }

  return balance(node, steps, path);
}

export function avlInsert(state: AVLState, value: number): AVLState {
  const steps = [...state.steps];
  const root = insertNode(state.root, value, steps, []);
  return {
    ...state,
    root,
    steps,
    currentStep: steps.length - 1,
    highlightNode: value,
    message: `Inserted ${value}`,
  };
}

export function getTreeLevels(root: AVLNode | null): (AVLNode | null)[][] {
  if (!root) return [];
  const levels: (AVLNode | null)[][] = [];
  let queue: (AVLNode | null)[] = [root];
  while (queue.length > 0) {
    levels.push(queue);
    const next: (AVLNode | null)[] = [];
    for (const node of queue) {
      if (node) {
        next.push(node.left);
        next.push(node.right);
      }
    }
    if (next.every(n => n === null)) break;
    queue = next;
  }
  return levels;
}
