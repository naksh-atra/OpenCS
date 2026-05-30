import React, { useState } from 'react';
import { VisualizerFrame } from './VisualizerFrame';
import { complexityClasses } from '../../engines/theory';

export function TimeComplexityVisualizer() {
  const [selected, setSelected] = useState<string[]>(['o1', 'on', 'on2']);

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const active = complexityClasses.filter(c => selected.includes(c.id));

  return (
    <VisualizerFrame
      title="Complexity Growth Comparison"
      description="Select complexity classes to compare how they scale as input size increases."
      controls={
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {complexityClasses.map(c => (
            <button
              key={c.id}
              onClick={() => toggle(c.id)}
              className={`complexity-btn ${selected.includes(c.id) ? 'active' : ''} tier-${c.tier}`}
            >
              {c.label}
            </button>
          ))}
        </div>
      }
      isEmpty={active.length === 0}
      emptyMessage="Select at least one complexity class to visualize"
    >
      <div className="complexity-chart" data-testid="time-complexity-visualizer">
        {active.map(c => (
          <div key={c.id} className="complexity-bar-wrapper">
            <div className={`complexity-bar tier-${c.tier}`} style={{ height: `${c.height}%` }} />
            <span className="complexity-label">{c.label}</span>
          </div>
        ))}
      </div>
    </VisualizerFrame>
  );
}

export default TimeComplexityVisualizer;
