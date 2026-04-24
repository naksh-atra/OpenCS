import {
  type Graph,
  type GraphNodeId,
  buildAdjacencyList,
  type GraphStep,
} from './graph-types';

export type TraversalType = 'bfs' | 'dfs';

export interface TraversalResult {
  visited: GraphNodeId[];
  steps: GraphStep[];
  message: string;
}

export function computeBFS(g: Graph, startId: GraphNodeId): TraversalResult {
  const adj = buildAdjacencyList(g, false);
  const steps: GraphStep[] = [];
  const visited = new Set<GraphNodeId>();
  const queue: GraphNodeId[] = [startId];

  visited.add(startId);

  steps.push({
    action: 'discover',
    node: startId,
    visited: [...visited],
    frontier: [...queue],
    queue: [...queue],
    message: `Start BFS from ${startId}`,
  });

  while (queue.length) {
    const nodeId = queue.shift()!;

    steps.push({
      action: 'dequeue',
      node: nodeId,
      visited: [...visited],
      frontier: [...queue],
      queue: [...queue],
      message: `Dequeuing ${nodeId}`,
    });

    steps.push({
      action: 'visit',
      node: nodeId,
      visited: [...visited],
      frontier: [...queue],
      queue: [...queue],
      message: `Visiting ${nodeId}`,
    });

    const neighbors = (adj.get(nodeId) ?? []).filter(n => n.node !== nodeId);
    for (const { node: neighborId } of neighbors) {
      if (!visited.has(neighborId)) {
        visited.add(neighborId);
        queue.push(neighborId);

        steps.push({
          action: 'enqueue',
          node: neighborId,
          visited: [...visited],
          frontier: [...queue],
          queue: [...queue],
          message: `Discovered ${neighborId} from ${nodeId}`,
        });
      }
    }
  }

  const visitedArr = [...visited];
  steps.push({
    action: 'finalize',
    node: startId,
    visited: visitedArr,
    message: `BFS complete: ${visitedArr.join(' → ')}`,
  });

  return { visited: visitedArr, steps, message: steps[steps.length - 1].message };
}

export function computeDFS(g: Graph, startId: GraphNodeId): TraversalResult {
  const adj = buildAdjacencyList(g, false);
  const steps: GraphStep[] = [];
  const visited = new Set<GraphNodeId>();
  const stack: GraphNodeId[] = [startId];
  const visitedOrder: GraphNodeId[] = [];

  visited.add(startId);
  steps.push({
    action: 'discover',
    node: startId,
    visited: [...visited],
    stack: [...stack],
    message: `Start DFS from ${startId}`,
  });

  while (stack.length) {
    const nodeId = stack.pop()!;

    if (visitedOrder.includes(nodeId)) {
      const remaining = stack.filter(id => id !== nodeId);
      steps.push({
        action: 'pop',
        node: nodeId,
        visited: [...visited],
        stack: remaining,
        message: `Pop duplicate ${nodeId}`,
      });
      continue;
    }

    visitedOrder.push(nodeId);
    steps.push({
      action: 'pop',
      node: nodeId,
      visited: [...visited],
      stack: [...stack],
      message: `Pop ${nodeId} from stack`,
    });

    steps.push({
      action: 'visit',
      node: nodeId,
      visited: [...visited],
      stack: [...stack],
      message: `Visit ${nodeId}`,
    });

    const neighbors = (adj.get(nodeId) ?? []).filter(n => n.node !== nodeId);
    for (const { node: neighborId } of neighbors) {
      if (!visited.has(neighborId)) {
        visited.add(neighborId);
        stack.push(neighborId);

        steps.push({
          action: 'push',
          node: neighborId,
          visited: [...visited],
          stack: [...stack],
          message: `Push ${neighborId} from ${nodeId}`,
        });
      }
    }
  }

  steps.push({
    action: 'finalize',
    node: startId,
    visited: visitedOrder,
    message: `DFS complete: ${visitedOrder.join(' → ')}`,
  });

  return { visited: visitedOrder, steps, message: steps[steps.length - 1].message };
}

export function computeGraphTraversal(type: TraversalType, g: Graph, startId: GraphNodeId): TraversalResult {
  return type === 'bfs' ? computeBFS(g, startId) : computeDFS(g, startId);
}