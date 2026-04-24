import React, { useState } from 'react';
import { VisualizerFrame } from './VisualizerFrame';

const complexityData = [
  { id: 'o1', label: 'O(1)', height: 15, tier: 'optimal' },
  { id: 'ologn', label: 'O(log n)', height: 30, tier: 'good' },
  { id: 'on', label: 'O(n)', height: 50, tier: 'fair' },
  { id: 'onlogn', label: 'O(n log n)', height: 65, tier: 'moderate' },
  { id: 'on2', label: 'O(n²)', height: 80, tier: 'costly' },
  { id: 'o2n', label: 'O(2ⁿ)', height: 100, tier: 'expensive' },
];

export function TimeComplexityVisualizer() {
  const [selected, setSelected] = useState<string[]>(['o1', 'on', 'on2']);

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const active = complexityData.filter(c => selected.includes(c.id));

  return (
    <VisualizerFrame
      title="Complexity Growth Comparison"
      description="Select complexity classes to compare how they scale as input size increases."
      controls={
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {complexityData.map(c => (
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

        .complexity-btn.active.tier-optimal { background: #22c55e; border-color: #22c55e; color: white; }
        .complexity-btn.active.tier-good { background: #84cc16; border-color: #84cc16; color: white; }
        .complexity-btn.active.tier-fair { background: #eab308; border-color: #eab308; color: white; }
        .complexity-btn.active.tier-moderate { background: #f97316; border-color: #f97316; color: white; }
        .complexity-btn.active.tier-costly { background: #ef4444; border-color: #ef4444; color: white; }
        .complexity-btn.active.tier-expensive { background: #dc2626; border-color: #dc2626; color: white; }

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

        .complexity-bar.tier-optimal { background: var(--color-complexity-optimal, #22c55e); }
        .complexity-bar.tier-good { background: var(--color-complexity-good, #84cc16); }
        .complexity-bar.tier-fair { background: var(--color-complexity-fair, #eab308); }
        .complexity-bar.tier-moderate { background: var(--color-complexity-moderate, #f97316); }
        .complexity-bar.tier-costly { background: var(--color-complexity-costly, #ef4444); }
        .complexity-bar.tier-expensive { background: var(--color-complexity-expensive, #dc2626); }

        .complexity-label {
          font-size: 0.75rem;
          font-family: var(--font-mono);
          color: var(--color-text-muted);
        }

        @media (prefers-color-scheme: dark) {
          .complexity-bar.tier-optimal { background: #4ade80; }
          .complexity-bar.tier-good { background: #a3e635; }
          .complexity-bar.tier-fair { background: #facc15; }
          .complexity-bar.tier-moderate { background: #fb923c; }
          .complexity-bar.tier-costly { background: #f87171; }
          .complexity-bar.tier-expensive { background: #f87171; }
        }
      `}</style>
    </VisualizerFrame>
  );
}

export default TimeComplexityVisualizer;