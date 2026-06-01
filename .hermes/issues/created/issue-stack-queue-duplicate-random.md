---
title: "fix(stack-queue): remove duplicate Random button from stack presets"
labels: ["bug"]
---

The Stack and Queue Simulator has two "Random" options. The first one is a preset that loads a fixed set of random-looking values. The second one actually generates fresh random values each time it is clicked. Remove the first duplicate to avoid confusion. Keep only the working random button.