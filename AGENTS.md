# OpenCS Project Context

## Project purpose
OpenCS is an open-source educational computer science project built to visually teach algorithms, data structures, theorems, and core CS processes to students.

## Current repo status
- Active branch: `dev`, production branch: `main`
- 25 built pages (index, about, contribute, roadmap, topics index, 20 topic pages)
- 20 interactive visualizers, all with `client:load` hydration
- 53 Playwright E2E tests passing (smoke, hydration, render, quality, fix-verification)
- All 4 engines complete with full operation suites

## Engines
- **Sequence Engine** (`src/engines/sequence/`): Array ops, Stack/Queue, Linked List, Sorting, Hashing, Expression Parsing
- **TreeGraph Engine** (`src/engines/treegraph/`): BST, Graph traversals, Weighted graph (Dijkstra/Prim), Heap ops, AVL ops, Graph representations
- **Theory Engine** (`src/engines/theory/`): Complexity classes, Number systems (base conversion + IEEE 754), DP (Fibonacci/LCS/Knapsack), Automata (DFA/NFA)
- **SystemProcess Engine** (`src/engines/system-process/`): CPU scheduling (FCFS/SJF/SRTF/Priority/RR), Memory management (FIFO/LRU/Optimal)

## Visualizer inventory (20 topics)

### With data-testid (20 — all visualizers)
All 20 visualizers now have data-testid attributes on key interactive elements:
- TimeComplexityVisualizer (Theory) — tcv-controls, tcv-class-toggles, tcv-n-slider, tcv-n-input, tcv-chart, tcv-table
- RecursionTreeVisualizer (Theory) — rtv-controls, rtv-algo-tabs, rtv-depth-slider, rtv-canvas, rtv-caption
- SortingVisualizer (Sequence) — sv-presets, sv-controls, sv-algo, sv-playback, sv-canvas
- ArrayVisualizer (Sequence) — av-presets, av-ops, av-op-controls, av-chart
- LinkedListVisualizer (Sequence) — llv-presets, llv-controls, llv-ops, llv-inputs, llv-list (dataset)
- StackQueueVisualizer (Sequence) — sqv-mode-tabs, sqv-presets, sqv-ops, sqv-input (×2), sqv-canvas (dataset)
- HashingVisualizer (Sequence) — hsv-presets, hsv-method-selector, hs-controls, hs-input, hs-load-factor, hs-table, hs-history
- ExpressionVisualizer (Sequence) — exv-presets, exv-controls, exv-type, exv-input, exv-output, exv-steps, exv-stack
- NumberSystemsVisualizer (Theory) — nsv-presets, nsv-input, nsv-from-base, nsv-to-base, nsv-swap, nsv-result, nsv-ieee
- DPVisualizer (Theory) — dpv-presets, dpv-controls, dpv-input, dpv-table, dpv-backtrack
- AutomataVisualizer (Theory) — atv-presets, atv-input, atv-controls, atv-canvas, atv-table, atv-result
- AVLVisualizer (TreeGraph) — avlv-presets, avlv-controls, avlv-input, avlv-canvas, avlv-steps
- HeapVisualizer (TreeGraph) — hpv-presets, hpv-controls, hpv-input, hpv-tree, hpv-array, hpv-steps
- CPUSchedulingVisualizer (SystemProcess) — csv-presets, csv-algo, csv-controls, csv-gantt, csv-table, csv-metrics
- MemoryVisualizer (SystemProcess) — mmv-presets, mmv-algo, mmv-frames, mmv-controls, mmv-table, mmv-faults
- GraphRepVisualizer (TreeGraph) — grv-presets, grv-rep-type, grv-matrix, grv-list, grv-graph
- BSTVisualizer (TreeGraph) — bst-presets, bst-ops, bst-input, bst-canvas
- GraphTraversalVisualizer (TreeGraph) — gtv-presets, gtv-traversal, gtv-controls, gtv-canvas, gtv-queue, gtv-result
- ShortestPathMSTVisualizer (TreeGraph) — spmst-presets, spmst-algo, spmst-controls, spmst-canvas, spmst-table, spmst-result
- TreeTraversalVisualizer (TreeGraph) — ttv-presets, ttv-traversals, ttv-canvas, ttv-result
Preserve this responsibility split for all visualizers:

- `<Topic>Visualizer.tsx` — orchestration ONLY (state, handlers, JSX)
- `<topic>/types.ts` — all exported interfaces/types
- `<topic>/presets.ts` — preset data
- `<topic>/render.ts` — canvas drawing functions (if applicable)
- `<topic>/<topic>-visualizer.css` — component-specific styles
- Engine ops in `src/engines/<engine>/<topic>-ops.ts`

## Component rules
1. NO inline `<style>` blocks in components
2. NO inline style objects for static styling — use CSS classes
3. Use `VisualizerFrame` wrapper for consistent layout
4. Use `data-testid` attributes on key elements for testing
5. NO hardcoded hex colors in CSS — use design token variables (`--color-*`, `--color-complexity-*`)

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
- Never use "auto" as type (use feat/fix/refactor/test/chore/docs/content)
- Always split unrelated changes into separate commits
- Author must be set explicitly with `-c` flags in cron/automated contexts

## Priority order (next steps)
1. ~~Add `data-testid` attributes to all 12 remaining visualizers~~ ✅ Complete (May 31)
2. ~~Fix inline `style={{}}` objects in 7 visualizers~~ ✅ Complete (June 6)
3. ~~Replace hardcoded hex colors with design token variables~~ ✅ Complete (June 6)
4. ~~Merge `dev` → `main` for production release~~ ✅ Complete (May 31)
5. ~~Dark mode theme toggle~~ ✅ Complete (June 6)
6. ~~Copy code buttons, scroll progress, breadcrumb nav~~ ✅ Complete (June 6)
7. Mobile-optimized visualizations (long-term)
8. Interactive exercises with auto-grading (long-term)

## Anti-goals
- Do not spend time on cosmetic styling refinements without user feedback
- Do not make risky "cleanup" changes in stable modules without clear need
- Do not modify tests just to make failures disappear
- Do not store screenshot snapshots in git (use page-load smoke tests instead)

## Test infrastructure
- Tests in `tests/e2e/*.spec.ts`
- Config: `playwright.config.ts` — testDir is `tests/e2e`
- NO screenshot-based tests (too fragile across refactors)
- Smoke tests verify page loads + no JS errors
- Run: `npx playwright test`
