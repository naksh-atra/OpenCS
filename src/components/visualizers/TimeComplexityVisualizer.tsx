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
      <div className="complexity-chart">
        {active.map(c => (
          <div key={c.id} className="complexity-bar-wrapper">
            <div className={`complexity-bar tier-${c.tier}`} style={{ height: `${c.height}%` }} />
            <span className="complexity-label">{c.label}</span>
          </div>
        ))}
      </div>

      <style>{`
        .complexity-btn {
          padding: 6px 12px;
          border-radius: 6px;
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          color: var(--color-text);
          font-size: 0.8125rem;
          font-family: var(--font-mono);
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .complexity-btn:hover {
          border-color: var(--color-primary);
        }

        .complexity-btn.active.tier-optimal { background: var(--color-complexity-optimal); border-color: var(--color-complexity-optimal); color: white; }
        .complexity-btn.active.tier-good { background: var(--color-complexity-good); border-color: var(--color-complexity-good); color: white; }
        .complexity-btn.active.tier-fair { background: var(--color-complexity-fair); border-color: var(--color-complexity-fair); color: white; }
        .complexity-btn.active.tier-moderate { background: var(--color-complexity-moderate); border-color: var(--color-complexity-moderate); color: white; }
        .complexity-btn.active.tier-costly { background: var(--color-complexity-costly); border-color: var(--color-complexity-costly); color: white; }
        .complexity-btn.active.tier-expensive { background: var(--color-complexity-expensive); border-color: var(--color-complexity-expensive); color: white; }

        .complexity-chart {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 16px;
          height: 180px;
          width: 100%;
          padding: 16px 0;
        }

        .complexity-bar-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .complexity-bar {
          width: 48px;
          border-radius: 4px 4px 0 0;
          transition: height 0.3s ease;
        }

        .complexity-bar.tier-optimal { background: var(--color-complexity-optimal); }
        .complexity-bar.tier-good { background: var(--color-complexity-good); }
        .complexity-bar.tier-fair { background: var(--color-complexity-fair); }
        .complexity-bar.tier-moderate { background: var(--color-complexity-moderate); }
        .complexity-bar.tier-costly { background: var(--color-complexity-costly); }
        .complexity-bar.tier-expensive { background: var(--color-complexity-expensive); }

.complexity-label {
          font-size: 0.75rem;
          font-family: var(--font-mono);
          color: var(--color-text-muted);
        }
      `}</style>
    </VisualizerFrame>
  );
}

export default TimeComplexityVisualizer;