---
title: "fix(time-complexity): restore interactive n-value input in Visual Interaction section"
labels: ["bug", "high-priority"]
---

The Time Complexity Growth comparison chart previously had an interactive input where users could set a value for n and watch all complexity classes grow in comparison, with both linear and log scale views. This was powered by a counter animation that stepped through values up to n.

The current dev version lost this interactivity -- no n-value input, no play/reset, no scale toggle. Only the complexity class filter buttons remain.

Restore the interactive controls:
- n-value input field with preset buttons (3, 5, 7, 20)
- Play button to animate the counter from 0 to n
- Reset button
- Linear/Log scale toggle
- Bar chart that updates in real-time showing actual computed values for each complexity class at the current counter value
