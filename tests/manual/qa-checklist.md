# OpenCS Manual QA Checklist

Run through these steps after automated tests pass. Use this for human verification that automation cannot cover.

## Desktop Review (1280px)

### Homepage
- [ ] Hero section loads with title and description
- [ ] Topic cards render in grid (10 cards)
- [ ] Category quick-links work
- [ ] Progress bar shows correct count

### Topics Discovery (/topics)
- [ ] All 10 topic cards render
- [ ] Filter tabs (Category, Engine, Difficulty, Status) visible
- [ ] Clicking "Algorithms" filters to 5 topics
- [ ] Clicking "Data Structures" filters to 5 topics
- [ ] "Clear filters" link works

### Topic Pages
- [ ] Prev/Next navigation works
- [ ] Engine badge renders
- [ ] Status badge renders
- [ ] Learning objectives block visible

### Visualizers

#### BFS/DFS (/topics/bfs-dfs)
- [ ] Graph canvas renders (560x320)
- [ ] Legend shows Pending/Frontier/Visited/Current
- [ ] Play button starts animation
- [ ] Step button advances one step
- [ ] Reset button returns to initial

#### Shortest Path & MST (/topics/shortest-path-mst)
- [ ] Graph canvas renders
- [ ] Legend shows In PQ/Settled/MST Edge/Current
- [ ] Dijkstra/Prim toggle works
- [ ] Play button starts animation

#### Linked Lists (/topics/linked-lists)
- [ ] Node list renders (DOM-based)
- [ ] Traverse/Search/Insert/Delete controls work
- [ ] Insert adds node to list
- [ ] Delete removes node from list

#### Sorting (/topics/sorting)
- [ ] Bar canvas renders
- [ ] Bubble/Insertion/Merge toggle works
- [ ] Play starts sort animation
- [ ] Colors indicate compare/swap/sorted

## Mobile Review (390px)

### Homepage
- [ ] Layout adapts without horizontal scroll
- [ ] Topic cards stack vertically
- [ ] Navigation menu works

### Topics Discovery (/topics)
- [ ] Filter bar scrolls horizontally or stacks
- [ ] Topic cards single-column
- [ ] Sticky filter does not dominate viewport

### Visualizers
- [ ] Canvas fits within viewport
- [ ] Controls are tappable

## Theme Checks

### Light Mode
- [ ] All pages render with light backgrounds
- [ ] Text is readable
- [ ] Canvas renders correctly

### Dark Mode / System Dark
- [ ] Toggle to dark mode works
- [ ] All pages adapt
- [ ] Canvas colors work on dark

## Graph Fit Checks

### Canvas Bounding Box
- [ ] Graph stays within canvas bounds
- [ ] Nodes/edges fully visible
- [ ] Labels not clipped

### Responsive Canvas
- [ ] Canvas resizes on window resize
- [ ] No overflow or clipping

## Interaction Checks

### Play/Step/Reset
- [ ] Play starts auto-advance
- [ ] Pause stops auto-advance
- [ ] Step advances one step
- [ ] Reset returns to start state

### Sticky Controls
- [ ] Filter bar sticks on scroll
- [ ] Does not cover content
- [ ] Does not block navigation

### Navigation
- [ ] Prev/Next links work
- [ ] Topic order is correct
- [ ] No broken links

## Visual Checks

### Clipped Labels
- [ ] Node labels fully visible
- [ ] No text truncation
- [ ] Tooltips on hover (if applicable)

### Topic Metadata
- [ ] Title renders
- [ ] Description visible
- [ ] Difficulty badge correct
- [ ] Estimated time shown

---

## Bugs Found

| Date | Issue | Severity | Status |
|------|-------|---------|--------|
|      |       |         |        |

---

_Last updated: 2025-04-24_