import React, { useState, useEffect, useRef } from 'react';
import { VisualizerFrame } from '../../components/visualizers/VisualizerFrame';
import type { TreeNode } from './bst/types';
import { PRESET_TREES } from './bst/presets';
import { buildInitialState, computeBSTOperationWrapper } from './bst/builders';
import './bst-visualizer.css';
import { useDebugState } from '../../lib/useDebugState';

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

  // Draw edges recursively from root
  function drawEdgesRecursive(node: TreeNode | null) {
    if (!node) return;
    if (node.left) drawEdge(node, node.left);
    if (node.right) drawEdge(node, node.right);
    drawEdgesRecursive(node.left);
    drawEdgesRecursive(node.right);
  }
  drawEdgesRecursive(root);

  levels.forEach(nodes => nodes.forEach(drawNode));
}

export function BSTVisualizer() {
  const [presetIdx, setPresetIdx] = useState(0);
  const [operation, setOperation] = useState<'search' | 'insert' | 'delete'>('search');
  const [inputValue, setInputValue] = useState('');
  const [state, setState] = useState(() => buildInitialState(presetIdx));
  const [highlighted, setHighlighted] = useState<number[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useDebugState(
    'BST',
    state ? { stepCount: state.steps?.length ?? 0, currentStep: state.currentStep, message: state.message, result: state.result } : null,
    null, state?.currentStep ?? 0, state?.steps?.length ?? 0, {}, {}
  );

  const root = state.root;

  useEffect(() => {
    const newState = buildInitialState(presetIdx);
    setState(newState);
    setHighlighted([]);
  }, [presetIdx]);

  useEffect(() => {
    drawBST(canvasRef.current, state.root, highlighted);
  }, [state.root, highlighted]);

  const handleOp = () => {
    const val = inputValue ? parseInt(inputValue, 10) : Math.floor(Math.random() * 50) + 1;
    const newState = computeBSTOperationWrapper(operation, val, state.root);
    setState(newState);
    setHighlighted(newState.steps[0]?.visited || []);
    setInputValue('');
  };

  const inorder = () => state.result.join(', ');

  return (
    <VisualizerFrame
      title="BST Visualizer"
      description={`BST: [${inorder()}] — ${state.message}`}
      controls={
        <>
          <div className="bst-presets" data-testid="bst-presets">
            {PRESET_TREES.map((p, i) => (
              <button key={p.label} onClick={() => setPresetIdx(i)} className={`bst-btn ${presetIdx === i ? 'active' : ''}`}>
                {p.label}
              </button>
            ))}
          </div>
          <div className="bst-ops" data-testid="bst-ops">
            <label className="sr-only" htmlFor="bst-op-select">Operation</label>
            <select id="bst-op-select" value={operation} onChange={e => setOperation(e.target.value as 'search' | 'insert' | 'delete')} className="bst-select" aria-label="Select operation">
              <option value="search">Search</option>
              <option value="insert">Insert</option>
              <option value="delete">Delete</option>
            </select>
            <input type="number" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="Value" className="bst-input" data-testid="bst-input" />
            <button onClick={handleOp} className="bst-btn bst-btn-primary" data-testid="bst-execute">Execute</button>
          </div>
        </>
      }
      isEmpty={!state.root}
      emptyMessage="BST is empty — insert values to begin"
    >
      <div className="bst-canvas-wrap" data-testid="bst-canvas">
        <canvas ref={canvasRef} className="bst-canvas" width={560} height={300} />
      </div>
    </VisualizerFrame>
  );
}

export default BSTVisualizer;
