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

### With data-testid (8)
- TimeComplexityVisualizer (Theory) — also has inline style={{}} to fix
- RecursionTreeVisualizer (Theory)
- SortingVisualizer (Sequence)
- ArrayVisualizer (Sequence)
- BSTVisualizer (TreeGraph)
- GraphTraversalVisualizer (TreeGraph)
- ShortestPathMSTVisualizer (TreeGraph)
- TreeTraversalVisualizer (TreeGraph)

### Need data-testid (12)
- LinkedListVisualizer (Sequence)
- StackQueueVisualizer (Sequence)
- HashingVisualizer (Sequence)
- ExpressionVisualizer (Sequence)
- NumberSystemsVisualizer (Theory) — also has inline style={{}}
- DPVisualizer (Theory) — also has inline style={{}}
- AutomataVisualizer (Theory) — also has inline style={{}}
- AVLVisualizer (TreeGraph) — also has inline style={{}}
- HeapVisualizer (TreeGraph) — also has inline style={{}}
- CPUSchedulingVisualizer (SystemProcess) — also has inline style={{}}
- MemoryVisualizer (SystemProcess) — also has inline style={{}}
- GraphRepVisualizer (TreeGraph) — also has inline style={{}}

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
1. Add `data-testid` attributes to all 12 remaining visualizers
2. Fix inline `style={{}}` objects in 7 visualizers (move to CSS classes)
3. Replace hardcoded hex colors with design token variables
4. Merge `dev` → `main` for production release
5. Mobile-optimized visualizations (long-term)
6. Interactive exercises with auto-grading (long-term)

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
