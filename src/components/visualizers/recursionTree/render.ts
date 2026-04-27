import { TreeNode, LayoutNode, LayoutConfig } from './types';

interface TidyNode extends TreeNode {
  prelim: number;
  modifier: number;
  y: number;
  children: TidyNode[];
}

function getSubtreeWidth(node: TidyNode, config: LayoutConfig): number {
  if (node.children.length === 0) return config.nodeRadius * 2;
  const sep = config.nodeRadius * 2 + 8;
  const childWidths = node.children.map(c => getSubtreeWidth(c, config));
  const total = childWidths.reduce((a, b) => a + b, 0);
  return total + sep * (node.children.length - 1);
}

function firstPass(node: TreeNode | null, level: number, config: LayoutConfig): TidyNode | null {
  if (!node) return null;

  const tidyNode: TidyNode = {
    ...node,
    prelim: 0,
    modifier: 0,
    y: level * config.levelHeight + 30,
    children: []
  };

  if (node.children.length === 0) {
    return tidyNode;
  }

  const processedChildren = node.children.map(child => firstPass(child, level + 1, config));
  tidyNode.children = processedChildren as TidyNode[];

  return tidyNode;
}

function assignPositions(node: TidyNode, leftEdge: number, config: LayoutConfig): void {
  const width = getSubtreeWidth(node, config);
  node.prelim = leftEdge + width / 2;
  if (node.children.length === 0) return;
  const sep = config.nodeRadius * 2 + 8;
  let cursor = leftEdge;
  node.children.forEach(child => {
    const childWidth = getSubtreeWidth(child, config);
    assignPositions(child, cursor, config);
    cursor += childWidth + sep;
  });
}

function secondPass(
  node: TidyNode | null,
  shift: number,
  canvasWidth: number,
  nodeRadius: number
): LayoutNode | null {
  if (!node) return null;
  const minX = nodeRadius + 4;
  const maxX = canvasWidth - nodeRadius - 4;
  return {
    label: node.label,
    sublabel: node.sublabel,
    type: node.type,
    level: node.level,
    x: Math.max(minX, Math.min(maxX, node.prelim + shift)),
    y: node.y,
    children: node.children
      .map(c => secondPass(c, shift, canvasWidth, nodeRadius))
      .filter(Boolean) as LayoutNode[],
  };
}

export function computeLayout(
  node: TreeNode | null,
  _x: number, _y: number, _spread: number,
  config: LayoutConfig,
  canvasWidth: number
): LayoutNode | null {
  const tidyRoot = firstPass(node, 0, config);
  if (!tidyRoot) return null;
  assignPositions(tidyRoot, 0, config);
  const shift = canvasWidth / 2 - tidyRoot.prelim;
  return secondPass(tidyRoot, shift, canvasWidth, config.nodeRadius);
}

export function drawEdge(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string,
  ctx: CanvasRenderingContext2D,
  radius: number
): void {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x1, y1 + radius);
  ctx.lineTo(x2, y2 - radius);
  ctx.stroke();
}

export function drawNode(
  node: LayoutNode,
  cfg: LayoutConfig,
  ctx: CanvasRenderingContext2D
): void {
  const colors = {
    root: { fill: '#3b82f6', stroke: '#60a5fa', text: '#ffffff', subtext: '#94a3b8' },
    internal: { fill: '#1e293b', stroke: '#3b82f6', text: '#ffffff', subtext: '#94a3b8' },
    leaf: { fill: '#064e3b', stroke: '#22c55e', text: '#ffffff', subtext: '#86efac' },
  };
  const c = colors[node.type];
  const radius = node.type === 'leaf' ? cfg.leafRadius : cfg.nodeRadius;
  
  ctx.fillStyle = c.fill;
  ctx.strokeStyle = c.stroke;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  ctx.fillStyle = c.text;
  ctx.font = node.label.length > 4 ? `bold 8px system-ui` : `bold 10px system-ui`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(node.label, node.x, node.y);
  
  if (node.sublabel) {
    ctx.fillStyle = c.subtext;
    ctx.font = '7px system-ui';
    ctx.fillText(node.sublabel, node.x, node.y + radius + 8);
  }
}

export function renderLayout(
  layout: LayoutNode | null,
  cfg: LayoutConfig,
  ctx: CanvasRenderingContext2D
): void {
  if (!layout) return;
  
  if (layout.children.length > 0) {
    layout.children.forEach((child) => {
      if (child) {
        drawEdge(layout.x, layout.y, child.x, child.y, '#3b82f6', ctx, cfg.nodeRadius);
        renderLayout(child, cfg, ctx);
      }
    });
  }
  
  drawNode(layout, cfg, ctx);
}