# OpenCS Roadmap

## Overview

OpenCS follows a milestone-based release strategy. The goal is to ship a stable foundation with 4 reusable engines and 20 topic modules, then expand based on contributor input and curriculum needs.

## Milestones

### Milestone 0 — Scaffold
**Status: Complete**

- [x] Astro + React + MDX initialization
- [x] Project site configuration with `/OpenCS` base path
- [x] GitHub Actions deployment workflow
- [x] Community files (LICENSE, README, CONTRIBUTING, CODE_OF_CONDUCT)
- [x] Architecture documentation

### Milestone 1 — Non-Topic Shell
**Status: Complete**

- [x] Landing page with project introduction
- [x] Topic index page with curriculum navigation
- [x] Topic layout template
- [x] Contributor pages (contribute, about, roadmap)
- [x] Route strategy and navigation
- [x] Design system tokens
- [x] VisualizerFrame API with loading/empty states
- [x] Global MDX components map
- [x] First topic page with working visualizer

### Milestone 2 — Engine Implementations
**Status: Complete**

- [x] Theory Engine — complexity data, number systems (base conversion + IEEE 754), DP (Fibonacci/LCS/Knapsack), automata (DFA/NFA)
- [x] TreeGraph Engine — BST ops, tree traversals, graph traversals (BFS/DFS), weighted graph (Dijkstra/Prim), heap ops, AVL ops, graph representations
- [x] Sequence Engine — array ops, stack/queue, linked list, sorting, hashing, expression parsing
- [x] SystemProcess Engine — CPU scheduling (FCFS/SJF/SRTF/Priority/RR), memory management (FIFO/LRU/Optimal)

### Milestone 3 — All Topic Modules
**Status: Complete**

All 20 topic pages have interactive visualizers and educational content:

| # | Topic | Engine | Status |
|---|-------|--------|--------|
| 1 | Time Complexity Growth | Theory | Complete |
| 2 | Recursion Tree Visualizer | Theory | Complete |
| 3 | Number Systems & Conversions | Theory | Complete |
| 4 | Dynamic Programming | Theory | Complete |
| 5 | DFA/NFA Simulator | Theory | Complete |
| 6 | Array Memory and Operations | Sequence | Complete |
| 7 | Stack and Queue Simulator | Sequence | Complete |
| 8 | Linked Lists | Sequence | Complete |
| 9 | Sorting Algorithms | Sequence | Complete |
| 10 | Hash Tables & Collision Resolution | Sequence | Complete |
| 11 | Expression Parsing | Sequence | Complete |
| 12 | Heaps & Priority Queues | TreeGraph | Complete |
| 13 | AVL Trees | TreeGraph | Complete |
| 14 | Binary Search Tree | TreeGraph | Complete |
| 15 | Tree Traversals | TreeGraph | Complete |
| 16 | BFS and DFS | TreeGraph | Complete |
| 17 | Shortest Path & MST | TreeGraph | Complete |
| 18 | Graph Representations | TreeGraph | Complete |
| 19 | CPU Scheduling | SystemProcess | Complete |
| 20 | Memory Management | SystemProcess | Complete |

### Milestone 4 — Visual Polish & Testing
**Status: In Progress**

- [x] Global CSS redesign (warm ivory theme, design tokens, no shadows/gradients)
- [x] Header/Footer redesign with backdrop blur and monospace logo
- [x] Homepage with hero, topic cards, feature cards, CTA
- [x] Topics index with sidebar filter pills
- [x] 47+ Playwright E2E tests passing
- [ ] Add data-testid attributes to all visualizers for richer test coverage
- [ ] Fix hardcoded button colors in visualizer CSS files (replace hex with design tokens)

### Milestone 5 — Long-term (Planned)

- Mobile-optimized visualizations
- Multiple programming language algorithm code tabs
- Interactive exercises with auto-grading
- Progress tracking for students
- Multi-language support (regional Indian languages)
- Theme toggle (light/dark with localStorage)

## Open Technical Debt

| Item | Description | Priority |
|------|-------------|----------|
| data-testid coverage | 12 of 20 visualizers still need data-testid attributes | High |
| Hardcoded button colors | Visualizer buttons still use inline hex values in some CSS | Medium |
| Canvas theme sync | Some canvas drawing reads computed styles at runtime | Medium |
| Inline style objects | 7 visualizers use style={{}} for static layout — should use CSS classes | Medium |
| ROADMAP sync | Keep ROADMAP.md updated as milestones complete | Low |

## Contributing to Roadmap

The roadmap is maintained in GitHub Issues and this document. To propose changes:

1. Open a discussion in the repository
2. Describe the proposed feature or topic
3. Provide curriculum justification
4. Tag it for review by maintainers

---

_Last updated: May 31, 2026_
