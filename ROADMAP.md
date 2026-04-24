# OpenCS Roadmap

## Overview

OpenCS follows a milestone-based release strategy. The goal is to ship a stable foundation with 4 reusable engines and 12 topic modules in v1, then expand thoughtfully based on contributor input and curriculum needs.

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
**Status: In Progress**

- [x] Theory Engine — complexity data and types
- [ ] TreeGraph Engine — tree/graph visualization primitives
- [ ] Sequence Engine — linear operations framework
- [ ] SystemProcess Engine — process simulation primitives

### Milestone 3 — First Topic Modules
**Status: Planned**

- [ ] Sorting Visualizer (Sequence Engine)
- [ ] BFS/DFS Graph Traversal (TreeGraph Engine)
- [ ] DFA/NFA Simulator (Theory Engine)
- [ ] CPU Scheduling Simulator (SystemProcess Engine)

### Milestone 4 — Remaining Topic Modules
**Status: Planned**

- [ ] Array Memory and Operations
- [ ] Stack and Queue Simulator
- [ ] Linked List Visualizer
- [ ] Tree Traversal Explorer
- [ ] BST Insert/Delete/Search
- [ ] Shortest Path and MST Explorer

## Open Technical Debt

| Item | Description | Priority |
|------|-------------|----------|
| Theme toggle | Manual light/dark toggle with localStorage (currently system-only via prefers-color-scheme) | High |
| Hardcoded button colors | Visualizer buttons still use inline hex values in some places | High |
| Canvas theme sync | RecursionTreeVisualizer canvas colors read from computed styles | Medium |

## Topic Category Map

| Category | Topics | Engine | Status |
|----------|--------|--------|--------|
| Algorithms | Time Complexity | Theory | Complete |
| Algorithms | Recursion Tree | Theory | Complete |
| Algorithms | Sorting | Sequence | Planned |
| Data Structures | Arrays | Sequence | Planned |
| Data Structures | Stacks/Queues | Sequence | Planned |
| Data Structures | Linked Lists | TreeGraph | Planned |
| Data Structures | Trees | TreeGraph | Planned |
| Data Structures | BST | TreeGraph | Planned |
| Theory | DFA/NFA | Theory | Planned |
| Systems | CPU Scheduling | SystemProcess | Planned |
| Graph | BFS/DFS | TreeGraph | Planned |
| Graph | Shortest Path/MST | TreeGraph | Planned |

## Long-term Vision

- Mobile-optimized visualizations
- Multiple programming language algorithm code tabs
- Interactive exercises with auto-grading
- Progress tracking for students
- Multi-language support (regional Indian languages)

## Contributing to Roadmap

The roadmap is maintained in GitHub Issues and this document. To propose changes:

1. Open a discussion in the repository
2. Describe the proposed feature or topic
3. Provide curriculum justification
4. Tag it for review by maintainers

---

_Last updated: 2025-04-24_