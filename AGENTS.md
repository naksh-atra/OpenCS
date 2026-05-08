# OpenCS Project Context

## Project purpose
OpenCS is an open-source educational computer science project built to visually teach algorithms, data structures, theorems, and core CS processes to students.

## Current repo status
- Active branch: `dev`
- Immediate next checkpoint: browser verification of `RecursionTreeVisualizer`
- Production-ready visualizers so far: `TimeComplexityVisualizer`, `RecursionTreeVisualizer` (refactored, requires visual verification)
- Other visualizers may work but are still more fragile or monolithic than the recursion-tree module

## Stable vs fragile areas
### Stable enough not to casually refactor
- `src/lib/recursionTree/types.ts`
- `src/lib/recursionTree/builders.ts`
- `src/styles/global.css` (verified clean; no `.rtv-*` rules)

### Clean architecture zone
- `recursionTree/` module split

### Fragile / debt areas
- Array, LinkedList, Sorting visualizers: working but not yet refactored
- Graph visualizers: may still have similar layout issues
- Older monolithic visualizer code should be treated carefully

## Architecture boundaries
Preserve this responsibility split:

- `RecursionTreeVisualizer.tsx` — orchestration only
- `recursionTree/builders.ts` — tree generation, presets, utility functions, layout config ownership
- `recursionTree/render.ts` — canvas layout and drawing
- `recursion-tree.css` — component-specific styles
- `recursionTree/types.ts` — interface/type definitions

Do not collapse these concerns back into one monolithic component.

## Visualizer invariants
These are non-negotiable for recursion-tree work:

- Root node: blue (`#3b82f6`), `type='root'`
- Internal node: dark (`#1e293b`), `type='internal'`
- Leaf node: green (`#064e3b`), `type='leaf'`
- Parent must be centered above children
- No edge crossings between child subtrees
- Canvas height formula must remain:
  `TOP_PADDING + levels * levelHeight + BOTTOM_LABEL_SPACE`

## Known fixes already applied
Do not regress these:

1. Fibonacci edge crossings fixed with subtree-width layout
2. Root clipping fixed with extra top padding
3. Wrong root colors fixed via correct level-0 type assignment
4. Binary Search horizontal compression fixed with larger node radius
5. Sublabel leakage fixed so only true base cases show `→1`

## Rendering failure definitions
Treat these as failures:

- Root clipping or top-canvas clipping
- Edge crossing or overlapping child subtree lines
- Wrong root/internal/leaf colors
- Wrong labels on terminal or base-case nodes
- Broken empty state styling
- Horizontal compression that harms readability
- Visual regressions even when build passes

## Validation workflow
Required validation sequence:

1. Run build validation
   - `npm run build`
2. Run preview/manual validation
   - `npm run preview`
3. Visually inspect the relevant visualizer in browser
4. Check invariants, layout, clipping, colors, labels, and empty states
5. Report results concisely

A task is not done until visual verification passes.

## Approval-gated actions
Always require approval before:

- Deleting files
- Deployment or production-affecting commands
- Content/schema changes
- Test edits that could hide real failures

## Git and branch rules
- Main development happens on `dev`
- Production branch is `main`
- Preferred commit style:
  `type(scope): change1 + change2 + change3`
- Example:
  `refactor: recursion tree visualizer - tidy tree layout + css extraction + bug fixes`

## Priority order
1. Browser verification of `RecursionTreeVisualizer`
2. Apply the same refactor pattern to the next visualizer (`ArrayVisualizer` is a likely next candidate)
3. Add automated visual regression coverage (Playwright screenshots)
4. Clean stale artifacts such as old `test-results/` output when appropriate

## Anti-goals
- Do not spend time on cosmetic styling refinements without user feedback
- Do not make risky “cleanup” changes in stable modules without clear need
- Do not modify tests just to make failures disappear
- Do not treat build success alone as proof of visual correctness

## Reporting expectations
When reporting progress:
- Be concise
- Include exact commands run
- Distinguish build pass/fail from visual pass/fail
- Surface blockers early
- Use Telegram only for checkpoint summaries, failed validations, risky actions, and final completion