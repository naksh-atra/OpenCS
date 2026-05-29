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
      <div class="vf">
        <div class="vf-header">
          <h3 class="vf-title">{title}</h3>
          {description && <p class="vf-desc" data-testid="vf-description">{description}</p>}
        </div>
        <div class="vf-loading">
          <div class="vf-spinner" />
          <span>Loading visualization...</span>
        </div>
      </div>
    );
  }

  return (
    <div class="vf">
      <div class="vf-header">
        <h3 class="vf-title">{title}</h3>
        {description && <p class="vf-desc" data-testid="vf-description">{description}</p>}
      </div>

      {controls && <div class="vf-controls">{controls}</div>}

      <div class="vf-canvas">
        {isEmpty ? (
          <div class="vf-empty">
            <span class="vf-empty-icon">◇</span>
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
