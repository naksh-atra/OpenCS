export interface GraphPreset {
  label: string;
  nodes: { id: string; label: string }[];
  edges: { source: string; target: string }[];
}
