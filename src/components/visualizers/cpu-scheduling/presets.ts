import type { SchedulingPreset } from './types';

export const SCHEDULING_PRESETS: SchedulingPreset[] = [
  {
    label: 'FCFS (same arrival)',
    algorithm: 'fcfs',
    processes: [
      { id: 'P1', arrival: 0, burst: 5 },
      { id: 'P2', arrival: 0, burst: 3 },
      { id: 'P3', arrival: 0, burst: 8 },
      { id: 'P4', arrival: 0, burst: 6 },
    ],
  },
  {
    label: 'FCFS (different arrival)',
    algorithm: 'fcfs',
    processes: [
      { id: 'P1', arrival: 0, burst: 7 },
      { id: 'P2', arrival: 2, burst: 4 },
      { id: 'P3', arrival: 4, burst: 1 },
      { id: 'P4', arrival: 5, burst: 4 },
    ],
  },
  {
    label: 'SJF',
    algorithm: 'sjf',
    processes: [
      { id: 'P1', arrival: 0, burst: 6 },
      { id: 'P2', arrival: 0, burst: 2 },
      { id: 'P3', arrival: 0, burst: 8 },
      { id: 'P4', arrival: 0, burst: 3 },
    ],
  },
  {
    label: 'Round Robin (q=2)',
    algorithm: 'round-robin',
    quantum: 2,
    processes: [
      { id: 'P1', arrival: 0, burst: 5 },
      { id: 'P2', arrival: 1, burst: 4 },
      { id: 'P3', arrival: 2, burst: 2 },
      { id: 'P4', arrival: 3, burst: 1 },
    ],
  },
  {
    label: 'Priority',
    algorithm: 'priority',
    processes: [
      { id: 'P1', arrival: 0, burst: 4, priority: 2 },
      { id: 'P2', arrival: 1, burst: 3, priority: 1 },
      { id: 'P3', arrival: 2, burst: 1, priority: 3 },
      { id: 'P4', arrival: 3, burst: 2, priority: 4 },
    ],
  },
];
