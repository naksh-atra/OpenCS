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
  const frameStyle: React.CSSProperties = {
    margin: '32px 0',
    padding: '24px',
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '2px',
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: '16px',
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: 'Georgia, serif',
    fontSize: '1.25rem',
    fontWeight: 600,
    margin: 0,
    color: 'var(--color-text)',
  };

  const descStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    color: 'var(--color-text-muted)',
    margin: '4px 0 0 0',
    lineHeight: 1.5,
  };

  const mutedTextStyle: React.CSSProperties = {
    color: 'var(--color-text-muted)',
    fontSize: '0.875rem',
  };

  const controlsStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '16px',
    padding: '16px',
    background: 'var(--color-surface-alt)',
    borderRadius: '2px',
  };

  const canvasStyle: React.CSSProperties = {
    minHeight: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--color-surface-canvas)',
  };

  if (isLoading) {
    return (
      <div style={frameStyle}>
        <div style={headerStyle}>
          <h3 style={titleStyle}>{title}</h3>
          {description && <p style={descStyle} data-testid="vf-description">{description}</p>}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '48px', ...mutedTextStyle }}>
          <div style={{ width: 24, height: 24, border: '2px solid var(--color-border)', borderTopColor: 'var(--color-primary)', borderRadius: '50%' }} />
          <span>Loading visualization...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={frameStyle}>
      <div style={headerStyle}>
        <h3 style={titleStyle}>{title}</h3>
        {description && (
          <p style={descStyle} data-testid="vf-description">{description}</p>
        )}
      </div>

      {controls && (
        <div style={controlsStyle}>
          {controls}
        </div>
      )}

      <div style={canvasStyle}>
        {isEmpty ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '48px', ...mutedTextStyle }}>
            <span style={{ fontSize: '1.5rem', opacity: 0.3 }}>◇</span>
            <span>{emptyMessage}</span>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

export default VisualizerFrame;
