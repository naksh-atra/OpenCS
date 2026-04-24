export interface LLNode {
  value: number;
  next: LLNode | null;
}

export type LLAction = 'traverse' | 'visit' | 'insert' | 'delete' | 'compare' | 'found' | 'not-found';

export interface LLStep {
  action: LLAction;
  nodeValue: number;
  position: number;
  visited: number[];
  highlight: number[];
  array: number[];
  message: string;
}

export interface LLState {
  head: LLNode | null;
  steps: LLStep[];
  result: number[];
  message: string;
}

export function createLLNode(value: number, next: LLNode | null = null): LLNode {
  return { value, next };
}

export function buildLLFromArray(arr: number[]): LLNode | null {
  if (!arr.length) return null;
  const head = createLLNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = createLLNode(arr[i]);
    current = current.next;
  }
  return head;
}

export function llToArray(head: LLNode | null): number[] {
  const result: number[] = [];
  let current = head;
  while (current) {
    result.push(current.value);
    current = current.next;
  }
  return result;
}

function traverseLL(head: LLNode | null, arr: number[]): LLStep[] {
  const steps: LLStep[] = [];
  const visited: number[] = [];
  let current = head;
  let pos = 0;
  while (current) {
    visited.push(current.value);
    steps.push({
      action: 'visit',
      nodeValue: current.value,
      position: pos,
      visited: [...visited],
      highlight: [pos],
      array: [...arr],
      message: `Visit node ${pos}: value ${current.value}`,
    });
    current = current.next;
    pos++;
  }
  return steps;
}

function searchLL(head: LLNode | null, value: number, arr: number[]): LLStep[] {
  const steps: LLStep[] = [];
  const visited: number[] = [];
  let current = head;
  let pos = 0;
  while (current) {
    visited.push(current.value);
    steps.push({
      action: 'traverse',
      nodeValue: current.value,
      position: pos,
      visited: [...visited],
      highlight: [pos],
      array: [...arr],
      message: `Traverse node ${pos}: ${current.value} (looking for ${value})`,
    });
    if (current.value === value) {
      steps.push({
        action: 'found',
        nodeValue: current.value,
        position: pos,
        visited: [...visited],
        highlight: [pos],
        array: [...arr],
        message: `Found ${value} at position ${pos}`,
      });
      return steps;
    }
    current = current.next;
    pos++;
  }
  steps.push({
    action: 'not-found',
    nodeValue: value,
    position: -1,
    visited: [...visited],
    highlight: [],
    array: [...arr],
    message: `${value} not found in list`,
  });
  return steps;
}

function insertAt(head: LLNode | null, index: number, value: number, arr: number[]): { head: LLNode | null; steps: LLStep[] } {
  const steps: LLStep[] = [];
  if (index === 0) {
    const newHead = createLLNode(value, head);
    steps.push({
      action: 'insert',
      nodeValue: value,
      position: 0,
      visited: [],
      highlight: [0],
      array: [value, ...arr],
      message: `Insert ${value} at head`,
    });
    return { head: newHead, steps };
  }
  let current = head;
  let pos = 0;
  while (current && pos < index - 1) {
    steps.push({
      action: 'traverse',
      nodeValue: current.value,
      position: pos,
      visited: [value],
      highlight: [pos],
      array: [...arr],
      message: `Traverse to position ${pos}`,
    });
    current = current.next;
    pos++;
  }
  if (current) {
    const newNode = createLLNode(value, current.next);
    current.next = newNode;
    const newArr = [...arr];
    newArr.splice(index, 0, value);
    steps.push({
      action: 'insert',
      nodeValue: value,
      position: index,
      visited: [],
      highlight: [index],
      array: newArr,
      message: `Insert ${value} at position ${index}`,
    });
  }
  return { head, steps };
}

function deleteAt(head: LLNode | null, index: number, arr: number[]): { head: LLNode | null; steps: LLStep[]; deletedValue: number } {
  const steps: LLStep[] = [];
  if (!head) return { head: null, steps, deletedValue: -1 };
  if (index === 0) {
    const deletedValue = head.value;
    steps.push({
      action: 'delete',
      nodeValue: deletedValue,
      position: 0,
      visited: [],
      highlight: [],
      array: arr.slice(1),
      message: `Delete ${deletedValue} from head`,
    });
    return { head: head.next, steps, deletedValue };
  }
  let current = head;
  let pos = 0;
  while (current && pos < index - 1) {
    steps.push({
      action: 'traverse',
      nodeValue: current.value,
      position: pos,
      visited: [],
      highlight: [pos],
      array: [...arr],
      message: `Traverse to position ${pos}`,
    });
    current = current.next;
    pos++;
  }
  if (current && current.next) {
    const deletedValue = current.next.value;
    current.next = current.next.next;
    const newArr = [...arr];
    newArr.splice(index, 1);
    steps.push({
      action: 'delete',
      nodeValue: deletedValue,
      position: index,
      visited: [],
      highlight: [],
      array: newArr,
      message: `Delete ${deletedValue} from position ${index}`,
    });
    return { head, steps, deletedValue };
  }
  return { head, steps, deletedValue: -1 };
}

export function computeLLTraverse(head: LLNode | null): LLState {
  const arr = llToArray(head);
  const steps = head ? traverseLL(head, arr) : [];
  const message = steps.length ? steps[steps.length - 1].message : 'List is empty';
  return { head, steps, result: arr, message };
}

export function computeLLSearch(head: LLNode | null, value: number): LLState {
  const arr = llToArray(head);
  const steps = head ? searchLL(head, value, arr) : [];
  const message = steps.length ? steps[steps.length - 1].message : 'List is empty';
  return { head, steps, result: arr, message };
}

export function computeLLInsert(head: LLNode | null, index: number, value: number): LLState {
  const arr = llToArray(head);
  const { head: newHead, steps } = insertAt(head, index, value, arr);
  const result = llToArray(newHead);
  const message = steps.length ? steps[steps.length - 1].message : `Inserted ${value}`;
  return { head: newHead, steps, result, message };
}

export function computeLLDelete(head: LLNode | null, index: number): LLState {
  const arr = llToArray(head);
  const { head: newHead, steps } = deleteAt(head, index, arr);
  const result = llToArray(newHead);
  const message = steps.length ? steps[steps.length - 1].message : `Deleted at ${index}`;
  return { head: newHead, steps, result, message };
}

export function createLLState(arr: number[] = [4, 2, 7, 1, 5]): LLState {
  const head = buildLLFromArray(arr);
  return { head, steps: [], result: arr, message: `List: [${arr.join(', ')}]` };
}

export type LLOperation = 'traverse' | 'search' | 'insert' | 'delete';

export const LL_PRESETS = [
  { label: 'Default', arr: [4, 2, 7, 1, 5] },
  { label: 'Reversed', arr: [5, 4, 3, 2, 1] },
  { label: 'Nearly Sorted', arr: [1, 2, 4, 3, 5, 6] },
  { label: 'Random', arr: [8, 3, 9, 1, 6, 2] },
];