export type MemoryAlgorithm = 'fifo' | 'lru' | 'optimal';

export interface MemoryStep {
  action: 'hit' | 'fault' | 'replace';
  page: number;
  frame: number;
  victim: number | null;
  message: string;
}

export interface MemoryState {
  frames: (number | null)[];
  referenceString: number[];
  currentIndex: number;
  pageFaults: number;
  pageHits: number;
  algorithm: MemoryAlgorithm;
  highlightFrame: number | null;
  message: string;
  steps: MemoryStep[];
  history: string[];
}

export function createMemoryState(
  referenceString: number[],
  frameCount: number,
  algorithm: MemoryAlgorithm
): MemoryState {
  return {
    frames: Array(frameCount).fill(null),
    referenceString,
    currentIndex: -1,
    pageFaults: 0,
    pageHits: 0,
    algorithm,
    highlightFrame: null,
    message: `Ready — ${algorithm.toUpperCase()}, ${frameCount} frames, ${referenceString.length} references`,
    steps: [],
    history: [],
  };
}

export function stepForward(state: MemoryState): MemoryState {
  if (state.currentIndex >= state.referenceString.length - 1) {
    return { ...state, message: 'All references processed' };
  }

  const nextIdx = state.currentIndex + 1;
  const page = state.referenceString[nextIdx];
  const frames = [...state.frames];
  let pageFaults = state.pageFaults;
  let pageHits = state.pageHits;
  let victim: number | null = null;
  let action: 'hit' | 'fault' | 'replace';
  let frameIdx = -1;

  // Check if page is already in a frame
  const existingIdx = frames.indexOf(page);
  if (existingIdx !== -1) {
    // Hit
    action = 'hit';
    pageHits++;
    frameIdx = existingIdx;
  } else {
    // Fault
    pageFaults++;
    const emptyIdx = frames.indexOf(null);
    if (emptyIdx !== -1) {
      // Empty frame available
      action = 'fault';
      frames[emptyIdx] = page;
      frameIdx = emptyIdx;
    } else {
      // Need to replace
      action = 'replace';
      const replaceIdx = getVictim(state, frames, nextIdx);
      victim = frames[replaceIdx];
      frames[replaceIdx] = page;
      frameIdx = replaceIdx;
    }
  }

  const newHistory = [...state.history, `${page}: ${action}${victim !== null ? ` (replace ${victim})` : ''}`];

  return {
    ...state,
    frames,
    currentIndex: nextIdx,
    pageFaults,
    pageHits,
    highlightFrame: frameIdx,
    message: `Reference ${page}: ${action}${victim !== null ? ` — replaced ${victim}` : ''}`,
    steps: [...state.steps, { action, page, frame: frameIdx, victim, message: `${page}: ${action}` }],
    history: newHistory,
  };
}

function getVictim(
  state: MemoryState,
  frames: (number | null)[],
  currentIdx: number
): number {
  const { algorithm, referenceString } = state;

  if (algorithm === 'fifo') {
    // Replace the first loaded (track by finding which was loaded first)
    // Simple: replace the frame that was loaded earliest
    // We track this by finding the frame whose next reference is earliest in the past
    let victimIdx = 0;
    let earliest = Infinity;
    frames.forEach((page, i) => {
      if (page === null) return;
      // Find when this page was last loaded (scan history backwards)
      for (let h = state.history.length - 1; h >= 0; h--) {
        if (state.history[h].startsWith(`${page}:`)) {
          if (h < earliest) {
            earliest = h;
            victimIdx = i;
          }
          break;
        }
      }
    });
    return victimIdx;
  }

  if (algorithm === 'lru') {
    // Replace the least recently used
    let victimIdx = 0;
    let lruTime = Infinity;
    frames.forEach((page, i) => {
      if (page === null) return;
      // Find last use in history
      let lastUse = -1;
      for (let h = state.history.length - 1; h >= 0; h--) {
        if (state.history[h].startsWith(`${page}:`)) {
          lastUse = h;
          break;
        }
      }
      if (lastUse < lruTime) {
        lruTime = lastUse;
        victimIdx = i;
      }
    });
    return victimIdx;
  }

  if (algorithm === 'optimal') {
    // Replace the page that won't be used for the longest time
    let victimIdx = 0;
    let farthest = -1;
    frames.forEach((page, i) => {
      if (page === null) return;
      let nextUse = Infinity;
      for (let j = currentIdx + 1; j < referenceString.length; j++) {
        if (referenceString[j] === page) {
          nextUse = j;
          break;
        }
      }
      if (nextUse > farthest) {
        farthest = nextUse;
        victimIdx = i;
      }
    });
    return victimIdx;
  }

  return 0;
}

export function runFull(state: MemoryState): MemoryState {
  let current = { ...state };
  while (current.currentIndex < current.referenceString.length - 1) {
    current = stepForward(current);
  }
  return current;
}
