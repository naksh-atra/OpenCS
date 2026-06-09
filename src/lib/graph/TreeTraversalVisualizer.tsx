import React, { useState, useEffect, useRef, useCallback } from 'react';
import { VisualizerFrame } from '../../components/visualizers/VisualizerFrame';
import {
  type TreeNode,
  type TraversalStep,
  buildTreeFromArray,
  computeTraversal,
  PRESET_TREES,
} from '../../engines/treegraph';
import './tree-traversal-visualizer.css';
import { useDebugState } from '../../lib/useDebugState';

const TRAVERSALS = [
  { id: 'preorder', label: 'Preorder', desc: 'Root → Left → Right' },
  { id: 'inorder', label: 'Inorder', desc: 'Left → Root → Right' },
  { id: 'postorder', label: 'Postorder', desc: 'Left → Right → Root' },
  { id: 'level-order', label: 'Level-order', desc: 'Level by level, top to bottom' },
];

function drawTree(
  canvas: HTMLCanvasElement | null,
  root: TreeNode | null,
  highlighted: number[],
  order: string
) {
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
    ctx.fillText('Select a tree to visualize', w / 2, h / 2);
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

export function TreeTraversalVisualizer() {
  const [presetIdx, setPresetIdx] = useState(0);
  const [traversal, setTraversal] = useState('inorder');
  const [steps, setSteps] = useState<TraversalStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [highlighted, setHighlighted] = useState<number[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const root = buildTreeFromArray(PRESET_TREES[presetIdx].arr);

  useDebugState(
    'TreeTraversal',
    { traversalType: traversal, currentStep, totalSteps: steps.length },
    null, currentStep, steps.length, { traversalType: traversal }, {}
  );

  const runTraversal = useCallback(() => {
    const treeRoot = buildTreeFromArray(PRESET_TREES[presetIdx].arr);
    const { steps: s } = computeTraversal(traversal, treeRoot);
    setSteps(s);
    setCurrentStep(0);
    setHighlighted(s.length > 0 ? [s[0].node] : []);
  }, [presetIdx, traversal]);

  useEffect(() => { runTraversal(); }, [runTraversal]);

  useEffect(() => {
    if (steps.length === 0) return;
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) return prev;
        const next = prev + 1;
        setHighlighted([steps[next].node]);
        return next;
      });
    }, 600);
    return () => clearInterval(timer);
  }, [steps]);

  useEffect(() => {
    drawTree(canvasRef.current, root, highlighted, traversal);
  }, [root, highlighted, traversal]);

  const result = steps.length > 0 ? steps.map(s => s.node) : [];

  return (
    <VisualizerFrame
      title="Tree Traversal Visualizer"
      description={`Traversing: ${TRAVERSALS.find(t => t.id === traversal)?.desc} — Step ${currentStep + 1}/${steps.length}`}
      controls={
        <>
          <div className="ttv-presets" data-testid="ttv-presets">
            {PRESET_TREES.map((p, i) => (
              <button key={p.label} onClick={() => setPresetIdx(i)} className={`ttv-btn ${presetIdx === i ? 'active' : ''}`}>
                {p.label}
              </button>
            ))}
          </div>
          <div className="ttv-traversals" data-testid="ttv-traversals">
            {TRAVERSALS.map(t => (
              <button key={t.id} onClick={() => setTraversal(t.id)} className={`ttv-btn ${traversal === t.id ? 'active' : ''}`}>
                {t.label}
              </button>
            ))}
          </div>
        </>
      }
      isEmpty={!root}
      emptyMessage="Select a tree preset to begin"
    >
      <div className="ttv-canvas-wrap" data-testid="ttv-canvas">
        <canvas ref={canvasRef} className="ttv-canvas" width={560} height={300} />
      </div>
      <div className="ttv-result">
        <span className="ttv-result-label">Result:</span>
        <span className="ttv-result-values">{result.join(' → ')}</span>
      </div>
    </VisualizerFrame>
  );
}

export default TreeTraversalVisualizer;
