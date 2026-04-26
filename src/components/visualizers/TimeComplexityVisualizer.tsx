import React, { useState, useEffect } from 'react';
import { VisualizerFrame } from './VisualizerFrame';
import { complexityClasses } from '../../engines/theory';

const RAW_VALUES: Record<string, (n: number) => number> = {
  o1: () => 1,
  ologn: (n) => Math.log2(n),
  on: (n) => n,
  onlogn: (n) => n * Math.log2(n),
  on2: (n) => n * n,
  on3: (n) => n * n * n,
  o2n: (n) => Math.pow(2, n),
  onf: (n) => {
    if (n > 12) return Infinity;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  },
};

function getRawValue(complexityId: string, n: number): number {
  const fn = RAW_VALUES[complexityId];
  return fn ? fn(n) : 1;
}

function getLinearHeight(raw: number, max: number): number {
  if (max <= 0) return 3;
  return (raw / max) * 100;
}

function getLogHeight(raw: number, max: number): number {
  if (raw <= 0 || max <= 0) return 3;
  const logRaw = Math.log2(1 + raw);
  const logMax = Math.log2(1 + max);
  return 3 + (logRaw / logMax) * 92;
}

export function TimeComplexityVisualizer() {
  const [selected, setSelected] = useState<string[]>([]);
  const [n, setN] = useState<string>('');
  const [counter, setCounter] = useState(0);
  const [scaleMode, setScaleMode] = useState<'linear' | 'log'>('linear');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const nVal = parseInt(n) || 0;
    if (nVal <= 0) return;
    const step = nVal <= 100 ? 2 : nVal <= 500 ? 5 : 10;
    const interval = setInterval(() => {
      setCounter(c => {
        if (c < nVal) return Math.min(c + step, nVal);
        return c;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [n]);

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handlePlay = () => setCounter(0);
  const handleReset = () => { setN(''); setCounter(0); setIsActive(false); };
  const handleNChange = (value: string) => {
    setN(value);
    const intVal = parseInt(value);
    if (intVal > 0) { setCounter(intVal); setIsActive(true); }
  };
  const handlePreset = (value: number) => {
    setN(String(value));
    setCounter(value);
    setIsActive(true);
  };

  const active = complexityClasses.filter(c => selected.includes(c.id));
  const isAllDeselected = selected.length === 0;
  const maxRaw = active.length > 0 
    ? Math.max(...active.map(c => getRawValue(c.id, counter)).filter(v => v > 0))
    : 1;

  const displayHeight = scaleMode === 'linear' 
    ? (id: string) => getLinearHeight(getRawValue(id, counter), maxRaw)
    : (id: string) => getLogHeight(getRawValue(id, counter), maxRaw);

  return (
    <VisualizerFrame
      title="Complexity Growth Comparison"
      description={`n = ${counter}. ${scaleMode === 'linear' ? 'Raw view — linear scale, true values' : 'Compare view — log scale for readability'}`}
      controls={
        <React.Fragment>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
            {complexityClasses.map(c => {
              const isSelected = selected.includes(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => toggle(c.id)}
                  className={`complexity-btn ${isSelected ? 'active' : ''} ${isSelected ? `tier-${c.tier}` : ''}`}
                  style={!isSelected ? { background: 'var(--color-surface)', color: 'var(--color-text)' } : {}}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <label style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>n =</label>
              <input
                type="number"
                min="1"
                max="1000"
                value={n}
                onChange={e => handleNChange(parseInt(e.target.value) || 1)}
                className="complexity-input"
              />
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[3, 5, 7, 20].map(v => (
                <button 
                  key={v}
                  onClick={() => handlePreset(v)}
                  className={`complexity-btn ${n === String(v) ? 'active' : ''}`}
                  style={n === String(v) ? { background: 'var(--color-primary)', color: 'white', borderColor: 'var(--color-primary)' } : {}}
                >
                  {v}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '6px', marginLeft: '8px' }}>
              <button onClick={handlePlay} className="complexity-btn complexity-btn-primary">
                Play
              </button>
              <button onClick={handleReset} className="complexity-btn">
                Reset
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>Scale:</span>
            <button 
              onClick={() => setScaleMode('linear')}
              className={`scale-btn ${scaleMode === 'linear' ? 'active' : ''}`}
              style={scaleMode === 'linear' ? { background: 'var(--color-primary)', color: 'white', borderColor: 'var(--color-primary)' } : {}}
            >
              Raw view
            </button>
            <button 
              onClick={() => setScaleMode('log')}
              className={`scale-btn ${scaleMode === 'log' ? 'active' : ''}`}
              style={scaleMode === 'log' ? { background: 'var(--color-primary)', color: 'white', borderColor: 'var(--color-primary)' } : {}}
            >
              Compare view
            </button>
          </div>
          {isAllDeselected && (
            <div style={{ marginTop: '8px', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
              Select at least one complexity class above to visualize
            </div>
          )}
        </React.Fragment>
      }
      isEmpty={isAllDeselected || !isActive}
      emptyMessage="Select at least one complexity class"
    >
      <div className="complexity-chart">
        {active.map(c => {
          const raw = getRawValue(c.id, counter);
          const h = displayHeight(c.id);
          return (
            <div key={c.id} className="complexity-bar-wrapper">
              <div 
                className={`complexity-bar tier-${c.tier}`}
                style={{ height: `${Math.min(98, h)}%` }}
              />
              <span className="complexity-label">{c.label}</span>
              {counter > 0 && (
                <span className="complexity-value">
                  {raw >= 1000000 ? `${(raw/1000000).toFixed(1)}M` :
                   raw >= 1000 ? `${(raw/1000).toFixed(1)}K` :
                   raw >= 1 ? raw.toFixed(0) :
                   raw.toFixed(2)}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        .complexity-chart {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 10px;
          height: 400px;
          width: 100%;
          padding: 20px 12px;
          border-bottom: 3px solid var(--color-border);
        }
        .complexity-bar-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          width: 44px;
          height: 100%;
        }
        .complexity-bar {
          width: 36px;
          border-radius: 4px 4px 0 0;
          transition: height 0.05s linear;
        }
        .complexity-bar.tier-optimal { background: var(--color-complexity-optimal); }
        .complexity-bar.tier-good { background: var(--color-complexity-good); }
        .complexity-bar.tier-fair { background: var(--color-complexity-fair); }
        .complexity-bar.tier-moderate { background: var(--color-complexity-moderate); }
        .complexity-bar.tier-costly { background: var(--color-complexity-costly); }
        .complexity-bar.tier-expensive { background: var(--color-complexity-expensive); }
        .complexity-label {
          margin-top: 6px;
          font-size: 0.6rem;
          font-family: var(--font-mono);
          color: var(--color-text);
          font-weight: 600;
          white-space: nowrap;
        }
        .complexity-value {
          font-size: 0.75rem;
          font-family: var(--font-mono);
          color: var(--color-text);
          font-weight: 700;
        }
      `}</style>
    </VisualizerFrame>
  );
}

export default TimeComplexityVisualizer;