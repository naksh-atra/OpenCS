/**
 * Shared theme color utility for canvas-based visualizers.
 * Import and use in render.ts files to support dark mode.
 *
 * Usage:
 *   import { themeColor } from '../../lib/theme-colors';
 *   ctx.fillStyle = themeColor('primary');
 *   ctx.strokeStyle = themeColor('border');
 *   ctx.fillStyle = themeColor('surface');
 */

export type ThemeToken =
  | 'bg' | 'surface' | 'surface-alt' | 'border'
  | 'text' | 'text-muted' | 'primary' | 'error'
  | 'highlight' | 'success' | 'info'
  | 'deleted-bg' | 'deleted-border'
  | 'chain' | 'chain-arrow'
  | 'canvas-bg';

const LIGHT: Record<ThemeToken, string> = {
  bg: '#FAF9F6',
  surface: '#FFFFFF',
  'surface-alt': '#F5F5F5',
  border: '#E8E6E1',
  text: '#1A1A1A',
  'text-muted': '#8A8A8A',
  primary: '#2563EB',
  error: '#DC2626',
  highlight: '#F6AD55',
  success: '#16a34a',
  info: '#1d4ed8',
  'deleted-bg': '#fef2f2',
  'deleted-border': '#fecaca',
  chain: '#2563EB',
  'chain-arrow': '#94a3b8',
  'canvas-bg': '#0f172a',
};

const DARK: Record<ThemeToken, string> = {
  bg: '#0F1419',
  surface: '#1A1F26',
  'surface-alt': '#242B33',
  border: '#2D3748',
  text: '#E2E8F0',
  'text-muted': '#718096',
  primary: '#63B3ED',
  error: '#FC8181',
  highlight: '#F6AD55',
  success: '#68D391',
  info: '#93c5fd',
  'deleted-bg': '#451a1a',
  'deleted-border': '#7f1d1d',
  chain: '#63B3ED',
  'chain-arrow': '#718096',
  'canvas-bg': '#0f172a',
};

function isDark(): boolean {
  try {
    return document.documentElement.getAttribute('theme') === 'dark';
  } catch {
    return false;
  }
}

export function themeColor(token: ThemeToken): string {
  return isDark() ? DARK[token] : LIGHT[token];
}

/**
 * Call this at the start of a render frame to get a snapshot of all colors
 * so you don't query the DOM mid-draw.
 */
export function getAllColors() {
  const dark = isDark();
  return dark ? { ...DARK, _dark: true } : { ...LIGHT, _dark: false };
}
