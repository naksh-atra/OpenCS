import React, { useState, useEffect, useRef } from 'react';
import { VisualizerFrame } from './VisualizerFrame';
import {
  type LLNode,
  type LLStep,
  type LLState,
  type LLOperation,
  buildLLFromArray,
  computeLLTraverse,
  computeLLSearch,
  computeLLInsert,
  computeLLDelete,
  LL_PRESETS,
} from '../../engines/sequence';

function drawList(container: HTMLDivElement, head: LLNode | null, step: LLStep | null) {
  container.innerHTML = '';
  const getCS = (v: string) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  const border = getCS('--color-border') || '#e5e7eb';
  const text = getCS('--color-text') || '#1f2937';
  const surface = getCS('--color-surface') || '#ffffff';
  const visited = '#16a34a';
  const highlight = '#d97706';

  const nodes: number[] = [];
  let current = head;
  while (current) {
    nodes.push(current.value);
    current = current.next;
  }

  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'display:flex;align-items:center;gap:0;padding:16px;overflow-x:auto;flex-wrap:wrap;';

  if (!nodes.length) {
    const empty = document.createElement('span');
    empty.style.cssText = 'color:#9ca3af;font-size:14px;';
    empty.textContent = 'Empty list';
    wrapper.appendChild(empty);
    container.appendChild(wrapper);
    return;
  }

  nodes.forEach((value, i) => {
    const isVisited = step?.visited.includes(value) ?? false;
    const isHighlight = step?.highlight.includes(i) ?? false;

    const row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;';

    const box = document.createElement('div');
    box.style.cssText = [
      `width:48px;height:48px;`,
      `border:2px solid ${isVisited ? visited : isHighlight ? highlight : border};`,
      `background:${surface};`,
      `display:flex;flex-direction:column;align-items:center;justify-content:center;`,
      `border-radius:6px;`,
    ].join('');
    if (isVisited) box.style.background = visited;
    else if (isHighlight) box.style.background = highlight;

    const num = document.createElement('span');
    num.style.cssText = `font-weight:600;font-size:14px;color:${isVisited || isHighlight ? '#ffffff' : text};`;
    num.textContent = String(value);

    const lbl = document.createElement('span');
    lbl.style.cssText = `font-size:9px;margin-top:2px;opacity:0.7;color:${isVisited || isHighlight ? '#ffffff' : text};`;
    lbl.textContent = String(i);

    box.appendChild(num);
    box.appendChild(lbl);
    row.appendChild(box);

    if (i < nodes.length - 1) {
      const arrow = document.createElement('span');
      arrow.style.cssText = 'padding:0 4px;color:#9ca3af;font-size:18px;';
      arrow.innerHTML = '&rarr;';
      row.appendChild(arrow);
    }

    wrapper.appendChild(row);
  });

  const nullBox = document.createElement('div');
  nullBox.style.cssText = [
    `width:32px;height:32px;`,
    `border:2px dashed ${border};`,
    `display:flex;align-items:center;justify-content:center;`,
    `border-radius:6px;font-size:10px;color:#9ca3af;margin-left:4px;`,
  ].join('');
  nullBox.textContent = 'null';
  wrapper.appendChild(nullBox);

  container.appendChild(wrapper);
}

export function LinkedListVisualizer() {
  const [presetIdx, setPresetIdx] = useState(0);
  const [operation, setOperation] = useState<LLOperation>('traverse');
  const [value, setValue] = useState('');
  const [index, setIndex] = useState('');
  const [state, setState] = useState<LLState | null>(null);
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const arr = LL_PRESETS[presetIdx].arr;

  useEffect(() => {
    setStepIdx(0);
    setIsPlaying(false);
    const head = buildLLFromArray(arr);
    let s: LLState;
    switch (operation) {
      case 'search': s = computeLLSearch(head, parseInt(value) || arr[0]); break;
      case 'insert': s = computeLLInsert(head, parseInt(index) || 0, parseInt(value) || arr[0]); break;
      case 'delete': s = computeLLDelete(head, parseInt(index) || 0); break;
      default: s = computeLLTraverse(head);
    }
    setState(s);
  }, [presetIdx, operation, value, index]);

  useEffect(() => {
    if (!state || !listRef.current) return;
    const step = stepIdx > 0 && stepIdx <= state.steps.length ? state.steps[stepIdx - 1] : null;
    drawList(listRef.current, state.head, step);
  }, [state, stepIdx]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (isPlaying && state && stepIdx < state.steps.length) {
      timerRef.current = setTimeout(() => setStepIdx(i => i + 1), 700);
    } else if (state && stepIdx >= state.steps.length) {
      setIsPlaying(false);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [isPlaying, stepIdx, state]);

  const handlePlay = () => {
    if (!state) return;
    if (stepIdx >= state.steps.length) setStepIdx(0);
    setIsPlaying(true);
  };

  const handleStep = () => {
    if (!state) return;
    if (stepIdx >= state.steps.length) setStepIdx(0);
    else setStepIdx(i => i + 1);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setStepIdx(0);
  };

  const message = state && stepIdx > 0 && stepIdx <= state.steps.length
    ? state.steps[stepIdx - 1].message
    : state?.message ?? 'Press play to start';

  return (
    <VisualizerFrame
      title="Linked List"
      description={message}
      controls={
        <>
          <div className="llv-presets">
            {LL_PRESETS.map((p, i) => (
              <button key={p.label} onClick={() => setPresetIdx(i)} className={`llv-btn ${presetIdx === i ? 'active' : ''}`}>
                {p.label}
              </button>
            ))}
          </div>
          <div className="llv-controls">
            <div className="llv-op">
              <button onClick={() => setOperation('traverse')} className={`llv-btn ${operation === 'traverse' ? 'active' : ''}`}>Traverse</button>
              <button onClick={() => setOperation('search')} className={`llv-btn ${operation === 'search' ? 'active' : ''}`}>Search</button>
              <button onClick={() => setOperation('insert')} className={`llv-btn ${operation === 'insert' ? 'active' : ''}`}>Insert</button>
              <button onClick={() => setOperation('delete')} className={`llv-btn ${operation === 'delete' ? 'active' : ''}`}>Delete</button>
            </div>
            <div className="llv-inputs">
              {(operation === 'search' || operation === 'insert') && (
                <input type="number" value={value} onChange={e => setValue(e.target.value)} placeholder="Value" className="llv-input" />
              )}
              {(operation === 'insert' || operation === 'delete') && (
                <input type="number" value={index} onChange={e => setIndex(e.target.value)} placeholder="Index" className="llv-input" />
              )}
              <button onClick={handleReset} className="llv-btn">Reset</button>
              <button onClick={handleStep} className="llv-btn">Step</button>
              <button onClick={handlePlay} className="llv-btn llv-btn-primary">{isPlaying ? 'Pause' : 'Play'}</button>
            </div>
          </div>
        </>
      }
      isEmpty={false}
    >
      <div className="llv-list-wrap">
        <div ref={listRef} className="ll-list-container" />
      </div>
      <div className="llv-legend">
        <span className="llv-legend-item llv-legend-visited">Visited</span>
        <span className="llv-legend-item llv-legend-current">Current</span>
      </div>

      <style>{`
        .llv-presets { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
        .llv-controls { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; justify-content: space-between; }
        .llv-op { display: flex; gap: 8px; flex-wrap: wrap; }
        .llv-inputs { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
        .llv-btn { padding: 6px 12px; border-radius: 6px; border: 1px solid var(--color-border); background: var(--color-surface); color: var(--color-text); font-size: 0.8125rem; cursor: pointer; transition: all 0.15s; }
        .llv-btn:hover { border-color: var(--color-primary); }
        .llv-btn.active { background: var(--color-primary); border-color: var(--color-primary); color: white; }
        .llv-btn-primary { background: var(--color-primary); border-color: var(--color-primary); color: white; }
        .llv-input { padding: 6px 8px; border-radius: 6px; border: 1px solid var(--color-border); background: var(--color-surface); color: var(--color-text); font-size: 0.8125rem; width: 72px; }
        .llv-list-wrap { width: 100%; overflow-x: auto; padding: 8px 0; }
        .ll-list-container { min-height: 80px; }
        .llv-legend { display: flex; gap: 16px; justify-content: center; margin-top: 8px; font-size: 0.75rem; color: var(--color-text); }
        .llv-legend-item::before { content: '■'; margin-right: 4px; }
        .llv-legend-visited::before { color: #16a34a; }
        .llv-legend-current::before { color: #d97706; }
      `}</style>
    </VisualizerFrame>
  );
}

export default LinkedListVisualizer;