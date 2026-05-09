import { TreeNode } from './types';

export const PRESET_TREES = [
  {
    label: 'Balanced',
    arr: [8, 3, 10, 1, 6, null, 14, null, null, 4, 7, null, null, 13, null],
    description: 'Well-balanced BST',
  },
  {
    label: 'Skewed Left',
    arr: [5, 3, null, 1, null, null, null],
    description: 'Left-skewed tree',
  },
  {
    label: 'Full',
    arr: [1, 2, 3, 4, 5, 6, 7],
    description: 'Perfect binary tree',
  },
  {
    label: 'Small',
    arr: [4, 2, 6, 1, 3, 5, 7],
    description: 'Simple BST',
  },
];
