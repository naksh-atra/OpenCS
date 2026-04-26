import React, { useState, useRef, useEffect } from 'react';
import { VisualizerFrame } from './VisualizerFrame';

interface TreeNode {
  label: string;
  sublabel?: string;
  type: 'root' | 'internal' | 'leaf';
  level: number;
  children: TreeNode[];
}

interface LayoutNode extends TreeNode {
  x: number;
  y: number;
}

interface LayoutConfig {
  nodeRadius: number;
  leafRadius: number;
  levelHeight: number;
  spreadFactor: number;
  minHeight: number;
  maxHeight: number;
}

const PRESETS = {
  factorial: { maxRenderDepth: 5, complexity: 'O(n)', label: 'Factorial' },
  fibonacci: { maxRenderDepth: 5, complexity: 'O(2^n)', label: 'Fibonacci' },
  'binary-search': { maxRenderDepth: 4, complexity: 'O(log n)', label: 'Binary Search', rangeSize: 16 },
} as const;

const LAYOUT: Record<string, LayoutConfig> = {
  factorial: { nodeRadius: 18, leafRadius: 16, levelHeight: 48, spreadFactor: 1.85, minHeight: 220, maxHeight: 420 },
  fibonacci: { nodeRadius: 16, leafRadius: 14, levelHeight: 58, spreadFactor: 2.0, minHeight: 260, maxHeight: 460 },
  'binary-search': { nodeRadius: 15, leafRadius: 13, levelHeight: 54, spreadFactor: 1.95, minHeight: 240, maxHeight: 400 },
};

const CAPTIONS = {
  factorial: 'One recursive call per level until the base case returns 1',
  fibonacci: 'Each call spawns two subcalls — repeated calls cause exponential growth',
  'binary-search': 'Each call halves the search range; complexity grows by depth, not breadth',
};

function getActualTreeDepth(node: TreeNode | null, currentDepth: number = 0): number {
  if (!node) return currentDepth;
  if (node.children.length === 0) return currentDepth;
  let maxChildDepth = currentDepth;
  node.children.forEach(child => {
    if (child) {
      maxChildDepth = Math.max(maxChildDepth, getActualTreeDepth(child, currentDepth + 1));
    }
  });
  return maxChildDepth;
}

function getCanvasHeight(renderedDepth: number, config: LayoutConfig): number {
  const needed = config.minHeight + (renderedDepth * config.levelHeight);
  return Math.min(Math.max(needed, config.minHeight), config.maxHeight);
}

function buildFactorialTree(n: number, level: number = 0, maxRenderDepth: number): TreeNode | null {
  if (n < 0) return null;
  if (n === 0 || level >= maxRenderDepth) {
    return { label: 'fact(0)', sublabel: '→ 1', type: 'leaf', level, children: [] };
  }
  const child = buildFactorialTree(n - 1, level + 1, maxRenderDepth);
  return { 
    label: `fact(${n})`, 
    type: level === 0 ? 'root' : 'internal',
    level,
    children: child ? [child] : [] 
  };
}

function buildFibonacciTree(n: number, level: number = 0, maxRenderDepth: number): TreeNode | null {
  if (n <= 1 || level >= maxRenderDepth) {
    return { label: `fib(${n})`, type: 'leaf', level, children: [] };
  }
  const left = buildFibonacciTree(n - 1, level + 1, maxRenderDepth);
  const right = buildFibonacciTree(n - 2, level + 1, maxRenderDepth);
  return { 
    label: `fib(${n})`, 
    type: level === 0 ? 'root' : 'internal',
    level,
    children: ([left, right].filter(Boolean) as TreeNode[])
  };
}

function buildBinarySearchTree(low: number, high: number, level: number = 0, maxRenderDepth: number): TreeNode | null {
  if (low > high || level >= maxRenderDepth) return null;
  const mid = Math.floor((low + high) / 2);
  const isLeaf = low === high;
  
  if (isLeaf) {
    return { label: `[${low}]`, sublabel: 'found', type: 'leaf', level, children: [] };
  }
  
  const range = `${low}..${high}`;
  const label = level <= 1 ? `search ${range}` : `${mid}`;
  
  return {
    label: label,
    sublabel: `mid=${mid}`,
    type: level === 0 ? 'root' : 'internal',
    level,
    children: [
      buildBinarySearchTree(low, mid - 1, level + 1, maxRenderDepth),
      buildBinarySearchTree(mid + 1, high, level + 1, maxRenderDepth)
    ].filter(Boolean) as TreeNode[]
  };
}

function computeLayout(
  node: TreeNode | null, 
  x: number, 
  y: number, 
  spread: number, 
  config: LayoutConfig,
  canvasWidth: number = 560
): LayoutNode | null {
  if (!node) return null;
  
  const layoutNode: LayoutNode = { ...node, x, y };
  
  if (node.children.length === 0) return layoutNode;
  
  const childCount = node.children.length;
  const maxSpread = canvasWidth * 0.45;
  const adjustedSpread = Math.min(Math.max(spread, 28), maxSpread);
  const childY = y + config.levelHeight;
  
  layoutNode.children = node.children.map((child, i) => {
    const childX = x - adjustedSpread + (adjustedSpread * 2 / childCount) * (i + 0.5);
    return computeLayout(child, childX, childY, spread * 0.55, config, canvasWidth);
  }) as LayoutNode[];
  
  return layoutNode;
}

function drawEdge(x1: number, y1: number, x2: number, y2: number, color: string, ctx: CanvasRenderingContext2D, radius: number): void {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x1, y1 + radius);
  ctx.lineTo(x2, y2 - radius);
  ctx.stroke();
}

function drawNode(node: LayoutNode, config: LayoutConfig, ctx: CanvasRenderingContext2D): void {
  const colors = {
    root: { fill: '#3b82f6', stroke: '#60a5fa', text: '#ffffff', subtext: '#94a3b8' },
    internal: { fill: '#1e293b', stroke: '#3b82f6', text: '#ffffff', subtext: '#94a3b8' },
    leaf: { fill: '#064e3b', stroke: '#22c55e', text: '#ffffff', subtext: '#86efac' },
  };
  const c = colors[node.type];
  const radius = node.type === 'leaf' ? config.leafRadius : config.nodeRadius;
  
  ctx.fillStyle = c.fill;
  ctx.strokeStyle = c.stroke;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  ctx.fillStyle = c.text;
  ctx.font = `bold 10px system-ui`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(node.label, node.x, node.y);
  
  if (node.sublabel) {
    ctx.fillStyle = c.subtext;
    ctx.font = '8px system-ui';
    ctx.fillText(node.sublabel, node.x, node.y + radius + 9);
  }
}

function renderLayout(layout: LayoutNode | null, config: LayoutConfig, ctx: CanvasRenderingContext2D): void {
  if (!layout) return;
  
  if (layout.children.length > 0) {
    layout.children.forEach((child) => {
      if (child) {
        drawEdge(layout.x, layout.y, child.x, child.y, '#3b82f6', ctx, config.nodeRadius);
        renderLayout(child, config, ctx);
      }
    });
  }
  
  drawNode(layout, config, ctx);
}

function RecursionTreeVisualizer() {
  const [algorithm, setAlgorithm] = useState<'factorial' | 'fibonacci' | 'binary-search'>('fibonacci');
  const [renderDepth, setRenderDepth] = useState(4);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const preset = PRESETS[algorithm];
  const layoutConfig = LAYOUT[algorithm];
  const caption = CAPTIONS[algorithm];
  const config = preset as typeof preset & { label: string; complexity: string; rangeSize?: number };

  const buildTree = (): TreeNode | null => {
    if (algorithm === 'factorial') return buildFactorialTree(renderDepth, 0, renderDepth);
    if (algorithm === 'fibonacci') return buildFibonacciTree(renderDepth, 0, renderDepth);
    if (algorithm === 'binary-search') {
      const rangeSize = (config.rangeSize || 16) - 1;
      return buildBinarySearchTree(0, rangeSize, 0, renderDepth);
    }
    return null;
  };

  const tree = buildTree();
  const actualDepth = tree ? getActualTreeDepth(tree) : 0;
  const canvasHeight = getCanvasHeight(actualDepth, layoutConfig);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const w = rect.width || 560;

    canvas.style.height = `${canvasHeight}px`;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = canvasHeight * dpr;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, canvasHeight);

    if (tree) {
      const spread = algorithm === 'fibonacci' ? w / 2.4 : w / 2.3;
      const layout = computeLayout(tree, w / 2, 30, spread, layoutConfig, w);
      renderLayout(layout, layoutConfig, ctx);
    }
  }, [algorithm, renderDepth, tree, canvasHeight, layoutConfig]);

  const handleAlgorithmChange = (newAlg: keyof typeof PRESETS) => {
    setAlgorithm(newAlg);
    const p = PRESETS[newAlg];
    setRenderDepth(Math.min(3, p.maxRenderDepth));
  };

  const handleDepthChange = (newDepth: number) => {
    setRenderDepth(newDepth);
  };

  const maxRenderDepth = preset.maxRenderDepth;

  return (
    <VisualizerFrame
      title="Recursion Tree Visualizer"
      description={`${config.label} · levels ${renderDepth} · ${config.complexity}`}
      controls={
        <div className="rtv-controls-wrapper">
          <div className="rtv-tabs">
            {Object.entries(PRESETS).map(([id, p]) => (
              <button
                key={id}
                onClick={() => handleAlgorithmChange(id as keyof typeof PRESETS)}
                className={`rtv-tab ${algorithm === id ? 'active' : ''}`}
              >
                <span className="rtv-tab-label">{(p as { label: string }).label}</span>
                <span className="rtv-tab-complexity">{(p as { complexity: string }).complexity}</span>
              </button>
            ))}
          </div>
          <div className="rtv-slider">
            <label>Levels</label>
            <input
              type="range"
              min={1}
              max={maxRenderDepth}
              value={renderDepth}
              onChange={e => handleDepthChange(Number(e.target.value))}
            />
            <span className="rtv-depth-value">{renderDepth}</span>
          </div>
        </div>
      }
      isEmpty={false}
    >
      <div className="rtv-body">
        <div className="rtv-canvas-wrapper">
          <canvas
            ref={canvasRef}
            className="rtv-canvas"
            width={560}
            height={canvasHeight}
          />
        </div>
        <div className="rtv-caption">
          {caption}
        </div>
        <div className="rtv-hint">
          <div className="rtv-hint-actions">
            <button 
              className="rtv-hint-btn"
              onClick={() => handleDepthChange(Math.max(1, renderDepth - 1))}
              disabled={renderDepth <= 1}
            >
              Fewer
            </button>
            <button 
              className="rtv-hint-btn"
              onClick={() => handleDepthChange(Math.min(maxRenderDepth, renderDepth + 1))}
              disabled={renderDepth >= maxRenderDepth}
            >
              More
            </button>
          </div>
        </div>
      </div>
    </VisualizerFrame>
  );
}

export default RecursionTreeVisualizer;