# OpenCS Project Context

## Project purpose
OpenCS is an open-source educational computer science project built to visually teach algorithms, data structures, theorems, and core CS processes to students.

## Current repo status
- Active branch: `dev`, production branch: `main`
- 25 topic pages, 47 Playwright smoke tests passing
- All 10 planned visualizers from IMPLEMENTATION_PLAN.md are complete

## Engines
- **Sequence Engine** (`src/engines/sequence/`): Array ops, Stack/Queue, Linked List, Sorting, Hashing, Expression Parsing
- **TreeGraph Engine** (`src/engines/treegraph/`): BST, Graph traversals, Weighted graph (Dijkstra/Prim), Heap ops, AVL ops
- **Theory Engine** (`src/engines/theory/`): Complexity classes, Number systems (base conversion + IEEE 754), DP (Fibonacci/LCS/Knapsack), Automata (DFA/NFA)
- **SystemProcess Engine** (`src/engines/system-process/`): CPU scheduling (FCFS/SJF/SRTF/Priority/RR), Memory management (FIFO/LRU/Optimal)

## Visualizer inventory (25 topics)

### Stable / Production-ready
- TimeComplexityVisualizer (Theory)
- RecursionTreeVisualizer (Theory)
- NumberSystemsVisualizer (Theory) — new
- HashingVisualizer (Sequence) — new
- DPVisualizer (Theory) — new
- ExpressionVisualizer (Sequence) — new
- CPUSchedulingVisualizer (SystemProcess) — new
- MemoryVisualizer (SystemProcess) — new
- AutomataVisualizer (Theory) — new
- GraphRepVisualizer (TreeGraph) — new

### Refactored (modular structure)
- ArrayVisualizer (Sequence) — types/presets/CSS split
- LinkedListVisualizer (Sequence) — types/presets/CSS split
- SortingVisualizer (Sequence) — types/presets/render/CSS split
- StackQueueVisualizer (Sequence) — types/presets/CSS split
- HeapVisualizer (TreeGraph) — types/presets/render/CSS split
- AVLVisualizer (TreeGraph) — types/presets/render/CSS split

### Canvas-based (src/lib/graph/)
- BSTVisualizer — canvas tree with edge drawing fixed
- TreeTraversalVisualizer — canvas tree with step animation
- GraphTraversalVisualizer — canvas state diagram (BFS/DFS)
- ShortestPathMSTVisualizer — canvas graph (Dijkstra/Prim)

## Architecture boundaries
Preserve this responsibility split for all visualizers:

- `<Topic>Visualizer.tsx` — orchestration ONLY (state, handlers, JSX)
- `<topic>/types.ts` — all exported interfaces/types
- `<topic>/presets.ts` — preset data
- `<topic>/render.ts` — canvas drawing functions (if applicable)
- `<topic>/<topic>-visualizer.css` — component-specific styles
- Engine ops in `src/engines/<engine>/<topic>-ops.ts`

## Component rules
1. NO inline `<style>` blocks in components
2. NO inline style objects for static styling
3. Use `VisualizerFrame` wrapper for consistent layout
4. Use `data-testid` attributes on key elements for testing

## Validation workflow
Required validation sequence:
1. `npm run build` — must pass with zero errors/warnings
2. `npx astro preview --port 4321` + browser inspection
3. Visually inspect the relevant visualizer in browser
4. `npx playwright test` — all smoke tests must pass

## Git and branch rules
- Main development happens on `dev`
- Production branch is `main`
- Preferred commit style: `type(scope): change1 + change2 + change3`

## Priority order (next steps)
1. Add `data-testid` attributes to all new visualizers for richer test coverage
2. Update ROADMAP.md to reflect completed milestones
3. Add interactive exercises with auto-grading (long-term)
4. Mobile-optimized visualizations (long-term)

## Anti-goals
- Do not spend time on cosmetic styling refinements without user feedback
- Do not make risky "cleanup" changes in stable modules without clear need
- Do not modify tests just to make failures disappear
- Do not store screenshot snapshots in git (use page-load smoke tests instead)

## Test infrastructure
- Tests in `tests/e2e/*.spec.ts`
- Config: `playwright.config.js` — testDir is `tests/e2e`
- NO screenshot-based tests (too fragile across refactors)
- Smoke tests verify page loads + no JS errors
- Run: `npx playwright test`
