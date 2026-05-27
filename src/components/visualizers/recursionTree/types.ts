export interface TreeNode {
  label: string;
  sublabel?: string;
  type: 'root' | 'internal' | 'leaf';
  level: number;
  children: TreeNode[];
}

export interface LayoutNode extends TreeNode {
  x: number;
  y: number;
  children: LayoutNode[];
}

export interface LayoutConfig {
  nodeRadius: number;
  leafRadius: number;
  levelHeight: number;
  minHeight: number;
  maxHeight: number;
}