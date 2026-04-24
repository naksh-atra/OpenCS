import React, { useState, useEffect, useRef, useCallback } from 'react';
import { VisualizerFrame } from './VisualizerFrame';
import { buildTreeFromArray, computeTraversal, PRESET_TREES, type TreeNode, type TraversalStep } from '../../engines/treegraph';

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
  const levelWidth = w / (levels.get(0)?.length || 1);

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

  if (root.left) drawEdge(root, root.left);
  if (root.right) drawEdge(root, root.right);
  collect(root.left, 0);
  collect(root.right, 0);

  function collect(n: TreeNode | null, d: number) {
    if (!n) return;
    if (n.left) drawEdge(n, n.left);
    if (n.right) drawEdge(n, n.right);
    collect(n.left, d + 1);
    collect(n.right, d + 1);
  }
  collect(root.left, 0);
  collect(root.right, 0);

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
          <div className="ttv-presets">
            {PRESET_TREES.map((p, i) => (
              <button key={p.label} onClick={() => setPresetIdx(i)} className={`ttv-btn ${presetIdx === i ? 'active' : ''}`}>
                {p.label}
              </button>
            ))}
          </div>
          <div className="ttv-traversals">
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
      <div className="ttv-canvas-wrap">
        <canvas ref={canvasRef} className="ttv-canvas" width={560} height={300} />
      </div>
      <div className="ttv-result">
        <span className="ttv-result-label">Result:</span>
        <span className="ttv-result-values">{result.join(' → ')}</span>
      </div>

      <style>{`
        .ttv-presets, .ttv-traversals { display: flex; gap: 8px; flex-wrap: wrap; }
        .ttv-btn { padding: 6px 12px; border-radius: 6px; border: 1px solid var(--color-border); background: var(--color-surface); color: var(--color-text); font-size: 0.8125rem; cursor: pointer; transition: all 0.15s; }
        .ttv-btn:hover { border-color: var(--color-primary); }
        .ttv-btn.active { background: var(--color-primary); border-color: var(--color-primary); color: white; }
        .ttv-canvas-wrap { width: 100%; display: flex; justify-content: center; }
        .ttv-canvas { width: 100%; max-width: 560px; height: 300px; border-radius: var(--radius-md); background: var(--color-bg); }
        .ttv-result { margin-top: 16px; padding: 12px; background: var(--color-bg); border-radius: var(--radius-md); text-align: center; }
        .ttv-result-label { font-size: 0.75rem; color: var(--color-text-muted); margin-right: 8px; }
        .ttv-result-values { font-family: var(--font-mono); font-size: 0.875rem; color: var(--color-text); }
      `}</style>
    </VisualizerFrame>
  );
}

export default TreeTraversalVisualizer;