export interface SchedulingPreset {
  label: string;
  processes: Array<{ id: string; arrival: number; burst: number; priority?: number }>;
  algorithm: 'fcfs' | 'sjf' | 'srtf' | 'priority' | 'round-robin';
  quantum?: number;
}
