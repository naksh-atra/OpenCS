---
title: "refactor(styles): replace hardcoded inline hex colors with CSS variables"
labels: ["refactor", "high-priority"]
---

Some visualizer buttons and elements still use inline hex color values. These should be replaced with the existing CSS custom properties (design tokens) from global.css for consistency and easier theming.

Steps:
- Audit all components for inline hex colors (#3b82f6, #1e293b, etc.)
- Replace with var(--color-*) equivalents
- Verify dark mode still works after changes
