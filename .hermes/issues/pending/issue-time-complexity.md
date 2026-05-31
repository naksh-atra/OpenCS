---
title: "fix(time-complexity): restore interactive n-value input in complexity growth comparison"
labels: ["bug", "high-priority"]
---

The Time Complexity Growth comparison previously had an interactive input where users could set a value for n and watch complexity classes grow with linear and log scale views.

The dev version lost this interactivity. Only filter buttons remain with no way to manipulate n or see values change.

Expected behavior:
- n-value input with preset buttons (e.g. 3, 5, 7, 20)
- Play button to animate counter from 0 to n
- Reset button
- Linear and log scale toggle
- Bar chart updating in real-time with computed values