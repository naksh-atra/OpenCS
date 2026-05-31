import React, { useState, useMemo } from 'react';
import { VisualizerFrame } from './VisualizerFrame';
import { complexityClasses } from '../../engines/theory';

function computeValue(fn: string, n: number): number {
  switch (fn) {
    case 'o1': return 1;
    case 'ologn': return Math.log2(Math.max(n, 1));
    case 'on': return n;
    case 'onlogn': return n * Math.log2(Math.max(n, 1));
    case 'on2': return n * n;
    case 'o2n': return Math.pow(2, Math.min(n, 30)); // cap to avoid Infinity
    default: return 0;
  }
}

export function TimeComplexityVisualizer() {
  const [selected, setSelected] = useState<string[]>(['o1', 'on', 'on2']);
  const [n, setN] = useState(10);

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const active = complexityClasses.filter(c => selected.includes(c.id));

  const tableData = useMemo(() => {
    const sizes = [5, 10, 20, 50, 100];
    return sizes.map(size => {
      const row: Record<string, string | number> = { n: size };
      active.forEach(c => {
        const val = computeValue(c.id, size);
        row[c.id] = val >= 1e9 ? val.toExponential(2) : Math.round(val * 100) / 100;
      });
      return row;
    });
  }, [active]);

  const maxBarHeight = 160;

  return (
    <VisualizerFrame
      title="Complexity Growth Comparison"
      description="Select complexity classes and set input size n to compare how they scale."
      controls={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }} data-testid="tcv-controls">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }} data-testid="tcv-class-toggles">
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
              Input size (n):
            </label>
            <input
              type="range"
              min={1}
              max={100}
              value={n}
              onChange={e => setN(Number(e.target.value))}
              style={{ flex: 1, maxWidth: 300 }}
              data-testid="tcv-n-slider"
            />
            <input
              type="number"
              min={1}
              max={10000}
              value={n}
              onChange={e => setN(Math.max(1, Math.min(10000, Number(e.target.value))))}
              className="ns-value-input"
              style={{ width: 80, padding: '4px 8px', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}
              data-testid="tcv-n-input"
            />
          </div>
        </div>
      }
      isEmpty={active.length === 0}
      emptyMessage="Select at least one complexity class to visualize"
    >
      {/* Bar chart for selected n */}
      <div style={{ marginBottom: '24px' }} data-testid="tcv-chart-section">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Growth at n = {n}
        </div>
        <div className="complexity-chart" data-testid="tcv-chart" style={{ height: maxBarHeight + 40 }}>
          {active.map(c => {
            const val = computeValue(c.id, n);
            const maxVal = Math.max(...active.map(cc => computeValue(cc.id, n)), 1);
            const barHeight = Math.max((val / maxVal) * maxBarHeight, 4);
            return (
              <div key={c.id} className="complexity-bar-wrapper">
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--color-text-muted)', marginBottom: '4px', textAlign: 'center' }}>
                  {val >= 1e9 ? val.toExponential(1) : Math.round(val * 10) / 10}
                </div>
                <div
                  className={`complexity-bar tier-${c.tier}`}
                  style={{ height: `${barHeight}px` }}
                />
                <span className="complexity-label">{c.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comparison table */}
      <div data-testid="tcv-table-section">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Comparison Table
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }} data-testid="tcv-table">
            <thead>
              <tr>
                <th style={{ padding: '8px 12px', border: '1px solid var(--color-border)', background: 'var(--color-surface-alt)', fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'left' }}>n</th>
                {active.map(c => (
                  <th key={c.id} style={{ padding: '8px 12px', border: '1px solid var(--color-border)', background: 'var(--color-surface-alt)', fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'right' }}>
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={i} style={{ background: row.n === n ? 'var(--color-primary-light)' : 'transparent' }}>
                  <td style={{ padding: '6px 12px', border: '1px solid var(--color-border)', fontFamily: 'var(--font-mono)', fontWeight: row.n === n ? 600 : 400 }}>{row.n}</td>
                  {active.map(c => (
                    <td key={c.id} style={{ padding: '6px 12px', border: '1px solid var(--color-border)', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                      {row[c.id]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </VisualizerFrame>
  );
}

export default TimeComplexityVisualizer;
