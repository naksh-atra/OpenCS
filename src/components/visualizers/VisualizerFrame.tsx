import React from 'react';

interface VisualizerFrameProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  controls?: React.ReactNode;
  isLoading?: boolean;
  isEmpty?: boolean;
  emptyMessage?: string;
}

export function VisualizerFrame({
  title,
  description,
  children,
  controls,
  isLoading = false,
  isEmpty = false,
  emptyMessage = 'No data to display',
}: VisualizerFrameProps) {
  if (isLoading) {
    return (
      <div className="vf-container">
        <div className="vf-header">
          <h3 className="vf-title">{title}</h3>
          {description && <p className="vf-description" data-testid="vf-description">{description}</p>}
        </div>
        <div className="vf-loading">
          <div className="vf-spinner" />
          <span>Loading visualization...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="vf-container">
      <div className="vf-header">
        <h3 className="vf-title">{title}</h3>
        {description && <p className="vf-description" data-testid="vf-description">{description}</p>}
      </div>

      {controls && <div className="vf-controls">{controls}</div>}

      <div className="vf-canvas">
        {isEmpty ? (
          <div className="vf-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 12h18M3 6h18M3 18h18" opacity="0.3"/>
            </svg>
            <span>{emptyMessage}</span>
          </div>
        ) : (
          children
        )}
      </div>

      <style>{`
        .vf-container {
          margin: var(--space-6) 0;
          padding: var(--space-6);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
        }

        .vf-header {
          margin-bottom: var(--space-4);
          padding-bottom: var(--space-4);
          border-bottom: 1px solid var(--color-border);
        }

        .vf-title {
          font-size: var(--text-lg);
          font-weight: 600;
          margin: 0 0 var(--space-2) 0;
          color: var(--color-text);
        }

        .vf-description {
          font-size: var(--text-sm);
          color: var(--color-text-muted);
          margin: 0;
          line-height: 1.5;
        }

        .vf-controls {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
          margin-bottom: var(--space-4);
          padding: var(--space-3);
          background: var(--color-bg);
          border-radius: var(--radius-md);
        }

        .vf-canvas {
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .vf-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-8);
          color: var(--color-text-muted);
        }

        .vf-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid var(--color-border);
          border-top-color: var(--color-primary);
          border-radius: 50%;
          animation: vf-spin 1s linear infinite;
        }

        .vf-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-8);
          color: var(--color-text-muted);
          font-size: var(--text-sm);
        }

        .vf-empty svg {
          opacity: 0.5;
        }

        @keyframes vf-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default VisualizerFrame;