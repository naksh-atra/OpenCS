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
    background: '#FFFFFF',
    border: '1px solid #E8E6E1',
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
    color: '#1A1A1A',
  };

  const descStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    color: '#8A8A8A',
    margin: '4px 0 0 0',
    lineHeight: 1.5,
  };

  if (isLoading) {
    return (
      <div style={frameStyle}>
        <div style={headerStyle}>
          <h3 style={titleStyle}>{title}</h3>
          {description && <p style={descStyle} data-testid="vf-description">{description}</p>}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '48px', color: '#8A8A8A', fontSize: '0.875rem' }}>
          <div style={{ width: 24, height: 24, border: '2px solid #E8E6E1', borderTopColor: '#2563EB', borderRadius: '50%' }} />
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
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '16px',
          padding: '16px',
          background: '#F5F5F5',
          borderRadius: '2px',
        }}>
          {controls}
        </div>
      )}

      <div style={{
        minHeight: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FEFEFE',
      }}>
        {isEmpty ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '48px', color: '#8A8A8A', fontSize: '0.875rem' }}>
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
