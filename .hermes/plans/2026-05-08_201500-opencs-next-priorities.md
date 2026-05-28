# OpenCS Next Priorities Plan

## Goal
Complete remaining refactoring of Graph visualizers, fix layout issues, expand test coverage, and perform full visual verification to bring all visualizers to production-ready state.

## Current Context / Assumptions
- Active branch: `dev`
- Build passes consistently after each refactor
- 22 Playwright tests passing (10 UI interaction + 12 visual regression)
- Graph visualizer directory structure exists (`src/components/visualizers/graph/` with `types.ts`, `presets.ts`)
- LinkedList, Sorting visualizers follow clean types/presets split pattern
- Known Graph visualizer layout issues noted in AGENTS.md
- Preview server runs via `npm run preview` (serves at `http://localhost:4321/OpenCS`)

## Proposed Approach
Follow the established refactoring pattern (types/presets split) for Graph visualizers, fix layout issues using RecursionTree visualizer layout patterns, expand Playwright tests with edge cases, and perform thorough browser verification.

## Step-by-Step Plan

### 1. Complete Graph Visualizer Refactoring
Update all Graph visualizers to use the new `graph/` directory structure, matching the pattern used for LinkedList/Sorting refactoring.
- **Files to change**:
  - `src/components/visualizers/BSTVisualizer.tsx`
  - `src/components/visualizers/GraphTraversalVisualizer.tsx`
  - `src/components/visualizers/graph/presets.ts` (verify preset structure matches visualizer expectations)
- **Tasks**:
  1. Update BSTVisualizer.tsx imports: replace engine imports with `graph/types.ts` (GraphPreset) and `graph/presets.ts` (GRAPH_PRESETS)
  2. Update GraphTraversalVisualizer.tsx similarly
  3. Verify `GRAPH_PRESETS` in `graph/presets.ts` matches the preset structure expected by the visualizers (check existing engine code for preset shape)
  4. Run `npm run build` after each update to catch errors early
  5. Run `npm run test:visual` to ensure no regressions

### 2. Fix Graph Visualizer Layout Issues
Address known layout issues (node overlap, edge crossing, clipping) noted in AGENTS.md.
- **Files to change**:
  - `src/components/visualizers/BSTVisualizer.tsx` (layout logic)
  - `src/components/visualizers/GraphTraversalVisualizer.tsx` (layout logic)
  - Possibly `src/components/visualizers/graph/render.ts` (if extracted, else inline layout code)
- **Tasks**:
  1. Start preview server: `npm run preview`
  2. Navigate to BST and Graph Traversal visualizer pages
  3. Inspect layout issues (use browser_vision or browser_snapshot to identify problems)
  4. Apply fixes using RecursionTree visualizer layout patterns (subtree-width layout, padding adjustments, root centering)
  5. Verify fixes via browser visual inspection and update Playwright snapshots

### 3. Full Visual Verification
Perform thorough browser verification for all refactored visualizers (LinkedList, Sorting, Graph) to ensure no visual regressions.
- **Tasks**:
  1. Navigate to each visualizer page in preview server
  2. Verify presets load correctly, interactions (play, reset, preset switch) work without errors
  3. Check visual invariants per AGENTS.md:
     - Correct colors (root: blue `#3b82f6`, internal: dark `#1e293b`, leaf: green `#064e3b`)
     - No edge crossings, parent centered above children
     - No clipping, correct canvas height formula
  4. Update Playwright visual snapshots if needed: `npx playwright test tests/visual/ --update-snapshots`

### 4. Expand UI Test Coverage
Add edge case tests to the Playwright suite to improve coverage.
- **Files to change**:
  - `tests/visual/all-visualizers-ui.spec.js` (add edge cases)
  - New test files for error states, mobile view
- **Tasks**:
  1. Add error state tests: invalid inputs, empty arrays, maximum size inputs
  2. Add mobile viewport tests: run tests with `viewport: { width: 375, height: 667 }` to check responsive layout
  3. Add tests for all preset combinations per visualizer
  4. Run `npm run test:visual` to ensure new tests pass
  5. Target: Increase test count from 22 to 30+

## Validation Steps
- **Build validation**: `npm run build` passes after each change
- **Test validation**: `npm run test:visual` all tests pass
- **Visual validation**: Browser inspection of all visualizers meets AGENTS.md invariants
- **Regression check**: No new warnings/errors in build or test output

## Risks & Tradeoffs
- **Risk**: Graph visualizer layout fixes may require significant changes to existing layout logic. **Mitigation**: Follow RecursionTree layout patterns which are proven.
- **Risk**: Preset structure mismatch between `graph/presets.ts` and visualizer expectations. **Mitigation**: Check existing engine code for preset shape before updating imports.
- **Tradeoff**: Expanding tests adds coverage but increases test runtime. **Mitigation**: Prioritize high-impact edge cases first.

## Open Questions
- Are there other Graph visualizers beyond BST and GraphTraversal that need refactoring?
- What specific layout issues exist in Graph visualizers (need browser inspection to confirm)?
