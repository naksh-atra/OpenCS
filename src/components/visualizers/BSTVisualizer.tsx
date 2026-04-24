import React, { useState, useEffect, useRef } from 'react';
import { VisualizerFrame } from './VisualizerFrame';
import { buildTreeFromArray, PRESET_TREES, createBSTState, computeBSTOperation, inorderCollect } from '../../engines/treegraph';
import type { TreeNode, BSTState } from '../../engines/treegraph';

function drawBST(canvas: HTMLCanvasElement | null, root: TreeNode | null, highlighted: number[]) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.offsetWidth;
  const h = canvas.offsetHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);

  const getCS = (v: string) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  const border = getCS('--color-border') || '#e5e7eb';
  const text = getCS('--color-text') || '#1f2937';
  const primary = getCS('--color-primary') || '#2563eb';
  const surface = getCS('--color-surface') || '#ffffff';

  if (!root) {
    ctx.fillStyle = text;
    ctx.font = '14px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('BST is empty', w / 2, h / 2);
    return;
  }

  const positions: Map<TreeNode, { x: number; y: number }> = new Map();
  const levels: Map<number, TreeNode[]> = new Map();

  function collect(node: TreeNode | null, depth: number) {
    if (!node) return;
    if (!levels.has(depth)) levels.set(depth, []);
    levels.get(depth)!.push(node);
    collect(node.left, depth + 1);
    collect(node.right, depth + 1);
  }
  collect(root, 0);

  const maxLevel = Math.max(...levels.keys());
  const levelHeight = (h - 60) / (maxLevel + 1);

  levels.forEach((nodes, depth) => {
    const y = 50 + depth * levelHeight;
    const spacing = w / (nodes.length + 1);
    nodes.forEach((node, i) => {
      positions.set(node, { x: spacing * (i + 1), y });
    });
  });

  function drawEdge(parent: TreeNode | null, child: TreeNode | null) {
    if (!parent || !child) return;
    const p = positions.get(parent);
    const c = positions.get(child);
    if (!p || !c) return;
    ctx.strokeStyle = border;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(p.x, p.y + 15);
    ctx.lineTo(c.x, c.y - 15);
    ctx.stroke();
  }

  function drawNode(node: TreeNode) {
    const pos = positions.get(node);
    if (!pos) return;
    const isHighlighted = highlighted.includes(node.value);
    ctx.fillStyle = isHighlighted ? primary : surface;
    ctx.strokeStyle = isHighlighted ? primary : border;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = isHighlighted ? '#fff' : text;
    ctx.font = 'bold 12px system-ui';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(node.value), pos.x, pos.y);
  }

  collect(root.left, 0);
  collect(root.right, 0);

  levels.forEach(nodes => nodes.forEach(drawNode));
}

export function BSTVisualizer() {
  const [presetIdx, setPresetIdx] = useState(0);
  const [operation, setOperation] = useState<'search' | 'insert' | 'delete'>('search');
  const [inputValue, setInputValue] = useState('');
  const [state, setState] = useState<BSTState>(() => createBSTState(buildTreeFromArray(PRESET_TREES[presetIdx].arr)));
  const [highlighted, setHighlighted] = useState<number[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const root = buildTreeFromArray(PRESET_TREES[presetIdx].arr);

  useEffect(() => {
    const tree = buildTreeFromArray(PRESET_TREES[presetIdx].arr);
    setState(createBSTState(tree));
    setHighlighted([]);
  }, [presetIdx]);

  useEffect(() => {
    drawBST(canvasRef.current, state.root, highlighted);
  }, [state.root, highlighted]);

  const handleOp = () => {
    const val = inputValue ? parseInt(inputValue, 10) : Math.floor(Math.random() * 50) + 1;
    const newState = computeBSTOperation(operation, val, state.root);
    setState(newState);
    setHighlighted(newState.steps[0]?.visited || []);
    setInputValue('');
  };

  const inorder = () => {
    const result: number[] = [];
    inorderCollect(state.root, result);
    return result.join(', ');
  };

  return (
    <VisualizerFrame
      title="BST Visualizer"
      description={`BST: [${inorder()}] — ${state.message}`}
      controls={
        <>
          <div className="bst-presets">
            {PRESET_TREES.map((p, i) => (
              <button key={p.label} onClick={() => setPresetIdx(i)} className={`bst-btn ${presetIdx === i ? 'active' : ''}`}>
                {p.label}
              </button>
            ))}
          </div>
          <div className="bst-ops">
            <label className="sr-only" htmlFor="bst-op-select">Operation</label>
            <select id="bst-op-select" value={operation} onChange={e => setOperation(e.target.value as 'search' | 'insert' | 'delete')} className="bst-select" aria-label="Select operation">
              <option value="search">Search</option>
              <option value="insert">Insert</option>
              <option value="delete">Delete</option>
            </select>
            <input type="number" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="Value" className="bst-input" />
            <button onClick={handleOp} className="bst-btn bst-btn-primary">Execute</button>
          </div>
        </>
      }
      isEmpty={!state.root}
      emptyMessage="BST is empty — insert values to begin"
    >
      <div className="bst-canvas-wrap">
        <canvas ref={canvasRef} className="bst-canvas" width={560} height={300} />
      </div>

      <style>{`
        .bst-presets { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
        .bst-ops { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
        .bst-btn { padding: 6px 12px; border-radius: 6px; border: 1px solid var(--color-border); background: var(--color-surface); color: var(--color-text); font-size: 0.8125rem; cursor: pointer; transition: all 0.15s; }
        .bst-btn:hover { border-color: var(--color-primary); }
        .bst-btn.active { background: var(--color-primary); border-color: var(--color-primary); color: white; }
        .bst-btn-primary { background: var(--color-primary); border-color: var(--color-primary); color: white; }
        .bst-select { padding: 6px 8px; border-radius: 6px; border: 1px solid var(--color-border); background: var(--color-surface); color: var(--color-text); font-size: 0.8125rem; }
        .bst-input { padding: 6px 8px; border-radius: 6px; border: 1px solid var(--color-border); background: var(--color-surface); color: var(--color-text); font-size: 0.8125rem; width: 80px; }
        .bst-canvas-wrap { width: 100%; display: flex; justify-content: center; }
        .bst-canvas { width: 100%; max-width: 560px; height: 300px; border-radius: var(--radius-md); background: var(--color-bg); }
      `}</style>
    </VisualizerFrame>
  );
}

export default BSTVisualizer;