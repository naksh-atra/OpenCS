import { TreeNode } from './types';
import { PRESET_TREES } from './presets';
import { buildTreeFromArray } from './types';
import { createBSTState, computeBSTOperation } from './bst-ops';

export function buildInitialState(presetIndex: number) {
  const root = buildTreeFromArray(PRESET_TREES[presetIndex].arr);
  return createBSTState(root);
}

export function computeBSTOperationWrapper(operation: 'insert' | 'search' | 'delete', value: number, root: TreeNode | null) {
  return computeBSTOperation(operation, value, root);
}
