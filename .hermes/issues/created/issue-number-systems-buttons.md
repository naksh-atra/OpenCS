---
title: "fix(number-systems): use base names in conversion buttons and fix swap button"
labels: ["bug"]
---

Two issues in the Number Systems and Conversions visualizer:

1. Button labels show the example value instead of the source base. For example, the first column shows "25 -> Binary" but it should say "Decimal -> Binary". Other columns have the same pattern. Button labels should use base names (Decimal, Binary, Octal, Hexadecimal) while the example values in the columns below stay as they are.

2. The exchange/swap button between "FROM BASE" and "TO BASE" does not work. It should swap the selected source and target bases when clicked.

Fix:
- Change button labels from "{value} -> {target}" to "{source base} -> {target base}"
- Fix the swap button handler to actually interchange the fromBase and toBase values