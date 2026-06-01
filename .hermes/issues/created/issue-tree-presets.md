---
title: "fix(tree-visualizer): Skewed Left preset shows no difference from Full and Small"
labels: ["bug"]
---

In the Tree visualizer, the Skewed Left preset displays a vertical tree of 3 elements with no visible left skew. Full and Small presets also show the same pattern with no visual difference between them.

Each preset should produce a distinctly different tree shape:
- Full: a complete/balanced tree
- Small: a minimal tree
- Skewed Left: a tree leaning heavily to the left

Investigate the tree generation logic and fix the layout so each preset is visually distinct.