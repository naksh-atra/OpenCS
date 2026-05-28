export type SchedulingAlgorithm = 'fcfs' | 'sjf' | 'srtf' | 'priority' | 'round-robin';

export interface Process {
  id: string;
  arrivalTime: number;
  burstTime: number;
  priority: number;
  remainingTime: number;
  startTime: number | null;
  completionTime: number | null;
  waitingTime: number;
  turnaroundTime: number;
}

export interface GanttEntry {
  processId: string;
  startTime: number;
  endTime: number;
}

export interface SchedulingState {
  processes: Process[];
  algorithm: SchedulingAlgorithm;
  timeQuantum: number;
  currentTime: number;
  readyQueue: string[];
  ganttChart: GanttEntry[];
  completed: string[];
  message: string;
}

export function createProcess(id: string, arrival: number, burst: number, priority: number = 0): Process {
  return {
    id, arrivalTime: arrival, burstTime: burst, priority,
    remainingTime: burst, startTime: null, completionTime: null,
    waitingTime: 0, turnaroundTime: 0,
  };
}

export function createSchedulingState(
  processes: Process[],
  algorithm: SchedulingAlgorithm,
  quantum: number = 2
): SchedulingState {
  return {
    processes: processes.map(p => ({ ...p, remainingTime: p.burstTime, startTime: null, completionTime: null, waitingTime: 0, turnaroundTime: 0 })),
    algorithm,
    timeQuantum: quantum,
    currentTime: 0,
    readyQueue: [],
    ganttChart: [],
    completed: [],
    message: `Ready to simulate ${algorithm.toUpperCase()}`,
  };
}

export function computeSchedule(state: SchedulingState): SchedulingState {
  const procs = state.processes.map(p => ({ ...p, remainingTime: p.burstTime, startTime: null, completionTime: null, waitingTime: 0, turnaroundTime: 0 }));
  const gantt: GanttEntry[] = [];
  let time = 0;
  const completed: string[] = [];
  const n = procs.length;

  if (state.algorithm === 'fcfs') {
    const sorted = [...procs].sort((a, b) => a.arrivalTime - b.arrivalTime);
    for (const p of sorted) {
      if (time < p.arrivalTime) time = p.arrivalTime;
      p.startTime = time;
      gantt.push({ processId: p.id, startTime: time, endTime: time + p.burstTime });
      time += p.burstTime;
      p.completionTime = time;
      p.turnaroundTime = p.completionTime - p.arrivalTime;
      p.waitingTime = p.turnaroundTime - p.burstTime;
      completed.push(p.id);
    }
  } else if (state.algorithm === 'sjf') {
    let remaining = [...procs];
    while (completed.length < n) {
      const available = remaining.filter(p => p.arrivalTime <= time && !completed.includes(p.id));
      if (available.length === 0) { time++; continue; }
      const shortest = available.sort((a, b) => a.burstTime - b.burstTime)[0];
      shortest.startTime = time;
      gantt.push({ processId: shortest.id, startTime: time, endTime: time + shortest.burstTime });
      time += shortest.burstTime;
      shortest.completionTime = time;
      shortest.turnaroundTime = shortest.completionTime - shortest.arrivalTime;
      shortest.waitingTime = shortest.turnaroundTime - shortest.burstTime;
      completed.push(shortest.id);
    }
  } else if (state.algorithm === 'round-robin') {
    const queue: string[] = [];
    let remaining = procs.map(p => ({ ...p }));
    while (completed.length < n) {
      // Add newly arrived processes
      for (const p of remaining) {
        if (p.arrivalTime <= time && !queue.includes(p.id) && !completed.includes(p.id)) {
          queue.push(p.id);
        }
      }
      if (queue.length === 0) { time++; continue; }
      const pid = queue.shift()!;
      const proc = remaining.find(p => p.id === pid)!;
      if (proc.startTime === null) proc.startTime = time;
      const execTime = Math.min(state.timeQuantum, proc.remainingTime);
      gantt.push({ processId: pid, startTime: time, endTime: time + execTime });
      time += execTime;
      proc.remainingTime -= execTime;
      // Add newly arrived during execution
      for (const p of remaining) {
        if (p.arrivalTime <= time && !queue.includes(p.id) && !completed.includes(p.id) && p.id !== pid) {
          queue.push(p.id);
        }
      }
      if (proc.remainingTime === 0) {
        proc.completionTime = time;
        proc.turnaroundTime = proc.completionTime - proc.arrivalTime;
        proc.waitingTime = proc.turnaroundTime - proc.burstTime;
        completed.push(pid);
      } else {
        queue.push(pid);
      }
    }
  } else if (state.algorithm === 'priority') {
    let remaining = [...procs];
    while (completed.length < n) {
      const available = remaining.filter(p => p.arrivalTime <= time && !completed.includes(p.id));
      if (available.length === 0) { time++; continue; }
      const highest = available.sort((a, b) => a.priority - b.priority)[0];
      highest.startTime = time;
      gantt.push({ processId: highest.id, startTime: time, endTime: time + highest.burstTime });
      time += highest.burstTime;
      highest.completionTime = time;
      highest.turnaroundTime = highest.completionTime - highest.arrivalTime;
      highest.waitingTime = highest.turnaroundTime - highest.burstTime;
      completed.push(highest.id);
    }
  } else if (state.algorithm === 'srtf') {
    let remaining = procs.map(p => ({ ...p }));
    let lastPid = '';
    while (completed.length < n) {
      const available = remaining.filter(p => p.arrivalTime <= time && p.remainingTime > 0);
      if (available.length === 0) { time++; continue; }
      const shortest = available.sort((a, b) => a.remainingTime - b.remainingTime)[0];
      if (shortest.id !== lastPid) {
        if (lastPid && gantt.length > 0) {
          gantt[gantt.length - 1].endTime = time;
        }
        gantt.push({ processId: shortest.id, startTime: time, endTime: time + 1 });
        lastPid = shortest.id;
      } else {
        gantt[gantt.length - 1].endTime = time + 1;
      }
      if (shortest.startTime === null) shortest.startTime = time;
      shortest.remainingTime--;
      time++;
      if (shortest.remainingTime === 0) {
        shortest.completionTime = time;
        shortest.turnaroundTime = shortest.completionTime - shortest.arrivalTime;
        shortest.waitingTime = shortest.turnaroundTime - shortest.burstTime;
        completed.push(shortest.id);
        lastPid = '';
      }
    }
  }

  // Calculate averages
  const avgWait = completed.length > 0
    ? procs.filter(p => completed.includes(p.id)).reduce((s, p) => s + p.waitingTime, 0) / completed.length
    : 0;
  const avgTurn = completed.length > 0
    ? procs.filter(p => completed.includes(p.id)).reduce((s, p) => s + p.turnaroundTime, 0) / completed.length
    : 0;

  return {
    ...state,
    processes: procs,
    ganttChart: gantt,
    completed,
    currentTime: time,
    message: `Complete — Avg Wait: ${avgWait.toFixed(1)}, Avg Turnaround: ${avgTurn.toFixed(1)}`,
  };
}
