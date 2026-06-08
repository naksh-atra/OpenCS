# OpenCS — Complete Tech Stack & Rendering Architecture

## Core Frameworks & Tools

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Meta-framework** | Astro | 5.2.5 | Static site generation, routing, content collections, build orchestration |
| **UI Library** | React | 19.0.0 | Interactive components (visualizers), hydrated as "islands" on static HTML |
| **Content** | MDX | via @astrojs/mdx 4.0.8 | Topic pages with embedded JSX visualizers |
| **Styling** | Plain CSS | — | 781-line global.css + 21 component-specific CSS files, all using CSS custom properties (design tokens) |
| **Language** | TypeScript | 5.7.3 | Strict mode, engine ops, types |
| **Build** | Vite (via Astro) | — | Bundling, dev server, HMR |
| **Testing** | Playwright | 1.59.1 | 90 E2E tests (Chromium, headless, 1280×720) |
| **Deployment** | GitHub Actions | — | Builds on push to main, deploys to GitHub Pages |
| **Hosting** | GitHub Pages | — | Static hosting at naksh-atra.github.io/OpenCS |
| **CSS-in-JS** | None | — | No styled-components, no Tailwind. Pure CSS variables for theming |

## Build Pipeline

```
npm run build
  → Astro reads src/content/topics/*.mdx (content collection)
  → Astro processes src/pages/**/*.astro (routing)
  → React components hydrate as "islands" (client:load)
  → MDX content rendered with Astro's content API
  → CSS bundled into hashed files in dist/_astro/
  → Static HTML output to dist/
  → GitHub Actions: npm ci → npm run build → upload-pages-artifact → deploy-pages
```

## Rendering Technology — By Visualization Type

Every visualizer uses one of three rendering approaches:

### 1. Canvas 2D API (14 visualizers)

Uses `canvas.getContext('2d')` with manual draw calls. All canvas renderers share a common pattern:

```typescript
const canvas = useRef<HTMLCanvasElement>(null);
useEffect(() => {
  if (!canvas.current) return;
  const ctx = canvas.current.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.current.offsetWidth;
  const h = canvas.current.offsetHeight;
  canvas.current.width = w * dpr;
  canvas.current.height = h * dpr;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);
  // Draw operations...
}, [state]);
```

**Canvas draw operations used across all renderers:**

| Operation | Used By |
|-----------|---------|
| `fillRect` / `strokeRect` | Sorting (bars), Hashing (cells), DP (table), Heaps (array) |
| `arc` | BST, AVL, Heaps (node circles), Automata (state circles), Traversals |
| `fillText` | All canvas visualizers (labels, values) |
| `moveTo` / `lineTo` / `stroke` | Graphs (edges), Trees (branches), Automata (transitions) |
| `bezierCurveTo` | Smooth curves in traversal visualizers |
| `beginPath` / `closePath` / `fill` | Filled shapes (bars, nodes, highlighted regions) |
| `save` / `restore` / `translate` / `scale` | Coordinate transforms for panning/zoom |
| `clearRect` | Frame clearing before redraw |

**Canvas-based visualizers:**

| Visualizer | Canvas Operations | What's Drawn |
|------------|-------------------|--------------|
| Sorting | fillRect, fillText | Bar chart: bars color-coded by state (comparing/yellow, swapping/red, sorted/green) |
| BST | arc, lineTo, fillText | Binary tree: circles for nodes, lines for edges, values inside |
| AVL Trees | arc, lineTo, fillText | Same as BST + balance factor labels, rotation animation |
| Heap | arc, lineTo, fillText | Dual: tree view + array view side by side |
| Recursion Tree | arc, lineTo, bezierCurveTo, fillText | Recursive call tree: nodes with function call labels |
| Tree Traversals | arc, lineTo, fillText | Binary tree with visit-order coloring |
| Graph Traversal | arc, lineTo, fillText | Graph: nodes as circles, edges as lines, frontier highlighting |
| Shortest Path/MST | arc, lineTo, fillText | Weighted graph: edges with weight labels, distances on nodes |
| Graph Representations | arc, lineTo, strokeRect, fillText | Three panels: graph + adjacency matrix + adjacency list |
| Automata | arc, lineTo, fillText, bezierCurveTo | State diagram: circles (double for accept), arrows with labels |
| CPU Scheduling | fillRect, fillText | Gantt chart: horizontal colored blocks on timeline |
| DP | strokeRect, fillText | 2D table grid: cells fill step-by-step with values |
| Hashing | fillText (overlaid on grid) | Table grid drawn via HTML, overlays via canvas |

### 2. React DOM (6 visualizers)

Pure React components rendering DOM elements declaratively:

| Visualizer | DOM Elements | What's Rendered |
|------------|-------------|-----------------|
| Time Complexity | div bars, table | Bar chart via div heights, comparison table |
| Array | div grid, input, select | Array cells as divs with index/address rows, operation controls |
| Stack/Queue | div boxes, select | Stack (vertical divs) or queue (horizontal divs), LIFO/FIFO toggle |
| Linked List | div nodes, SVG arrows | Nodes as divs with → SVG arrows, null terminator |
| Number Systems | div, input, select | Input field, base selectors, step-by-step result display |
| Memory Management | div frames, div table | Frame table (div grid), reference string, hit/fault indicators |
| Expression Parsing | div stack, div queue | Stack (vertical divs), output queue (horizontal), step display |

### 3. SVG (1 component)

| Visualizer | SVG Usage |
|------------|-----------|
| Theme Toggle | Sun/moon SVG icons (inline JSX), width/height 20×20 |

## component Architecture

```
TopicPage ([slug].astro)
  → TopicLayout (TopicLayout.astro)
    → Breadcrumb ( Astro nav )
    → Topic header ( h1, meta pills, difficulty bar, learning objectives )
    → Content slot ( MDX content )
    → Visualizer component ( React island, client:load )
    → Related topics ( computed from engine + tags )
    → Prev/next navigation ( computed from order field )
    → Progress tracking script ( vanilla JS, localStorage )
```

Each visualizer follows a consistent internal pattern:
```
<VisualizerName>.tsx     → Orchestration: state, handlers, JSX layout, data-testid attributes
<module>/types.ts        → All exported interfaces/types
<module>/presets.ts      → Preset data (initial arrays, graphs, processes)
<module>/render.ts       → Canvas drawing functions (if canvas-based)
<module>/<name>.css      → Component-specific styles
```

## Theming System

**Design tokens in global.css:**
- `--color-*`: 35+ semantic color tokens (bg, surface, border, text, primary, error, success, etc.)
- `--color-complexity-*`: 6 complexity tier colors
- `--color-cell-*`: 4 cell state colors for DP/hashing tables
- `--color-deleted-*` / `--color-highlight-*` / `--color-info-*` / `--color-success-*`: State colors
- `--space-*`: 6 spacing scale tokens (xs=4px through 2xl=48px)
- `--radius-*`: 3 border radius tokens
- `--font-sans` / `--font-mono`: Font families (Inter, JetBrains Mono)
- `--header-height`, `--sidebar-width`, `--max-content`: Layout tokens
- `--transition`: Standard transition (0.2s ease)

**Dark mode:** `[data-theme="dark"]` selector overrides all color tokens. Inline script in BaseLayout runs before paint to set `data-theme` from localStorage.

**Canvas theme support:** `src/lib/theme-colors.ts` exports `themeColor(token)` and `getAllColors()` utility functions. Canvas renderers call these to read theme-aware colors at draw time.

## State Management

- **No Redux, no Zustand, no React Context** for application state
- Each visualizer manages its own state via `useState` hook
- Pure engine functions: `(state, action) → { newState, step }`
- Step replay for animation: `useEffect` watches state changes, triggers canvas redraw
- User preferences (theme, progress) stored in `localStorage`

## Testing Stack

- **Framework:** Playwright 1.59.1
- **Browser:** Chromium (headless), viewport 1280×720
- **Test runner:** Playwright Test (built-in)
- **Parallelism:** 4 workers
- **CI:** Retries=2, workers=1, GitHub Actions reporter
- **Coverage:** 90 tests across 9 spec files
  - smoke.spec.ts (23) — page loads + no JS errors
  - dark-mode.spec.ts (5) — theme toggle + persistence
  - copy-code.spec.ts (3) — copy button functionality
  - ui-features.spec.ts (13) — scroll progress, breadcrumb, footer, search
  - visualizer-interactions.spec.ts (3) — button clicks, state changes
  - new-features.spec.ts (13) — nav, related topics, difficulty bar, 404, progress
  - visual-quality.spec.ts (11) — layout, overflow, meta pills
  - visualizer-hydration.spec.ts (8) — React island hydration
  - visualizer-render.spec.ts (5) — canvas elements, bars, hash table
  - fixes-verification.spec.ts (6) — specific bug fix regressions

## Dependencies (runtime only — 6 packages)

| Package | Version | Purpose |
|---------|---------|---------|
| astro | 5.2.5 | Framework |
| @astrojs/react | 4.2.1 | React island integration |
| @astrojs/mdx | 4.0.8 | MDX content processing |
| react | 19.0.0 | UI library |
| react-dom | 19.0.0 | React DOM rendering |
| typescript | 5.7.3 | Type checking |

**Zero UI libraries.** No Material UI, no Chakra, no shadcn, no Tailwind, no Bootstrap, no styled-components. All CSS is hand-written.

**Zero state management libraries.** No Redux, no MobX, no Zustand, no Recoil, no Jotai.

**Zero animation libraries.** No Framer Motion, no GSAP, no anime.js. All animations are manual `useEffect` + `requestAnimationFrame` or CSS transitions.

**Zero charting libraries.** No D3, no Chart.js, no Recharts, no Victory. All charts are hand-drawn on canvas or built from divs.

## File Structure

```
src/
  components/
    layout/          Header, Footer, ThemeToggle, TopicProgress, VisualizerFrame
    visualizers/     16 visualizer components (React)
  lib/
    graph/           4 graph/tree visualizers (React)
    theme-colors.ts  Canvas theme utility
  engines/
    sequence/        6 engine ops (array, sorting, stack-queue, linked-list, hashing, expression)
    treegraph/       7 engine ops (BST, AVL, heap, traversals, weighted-graph, graph-types, tree-types)
    theory/          4 engine ops (complexity, number-systems, DP, automata)
    system-process/  2 engine ops (cpu-scheduling, memory)
  pages/
    index.astro      Homepage
    about.astro      About page
    contribute.astro Contribute page
    roadmap.astro    Roadmap page
    404.astro        Custom 404 page
    topics/
      index.astro    Topics index with search + progress
      [slug].astro   Dynamic topic page route
  layouts/
    BaseLayout.astro HTML shell, theme init, copy code, scroll progress
    TopicLayout.astro Topic page layout with breadcrumb, nav, related topics
  styles/
    global.css       781 lines: reset, tokens, typography, layout, theme-toggle, print
    *.css            11 component-specific CSS files
  content/
    topics/          20 MDX topic files with frontmatter
```
