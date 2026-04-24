# OpenCS Architecture

This document explains how OpenCS is structured for contributors. Read this before adding topics, engines, or visualizers.

## Core Concepts

### Engines

Engines are reusable visualization frameworks that power multiple topic pages. Each engine handles a distinct visualization paradigm:

| Engine | Purpose | Example Topics |
|--------|---------|----------------|
| `sequence` | Linear operations and iterative processes | Time complexity, sorting, linked lists |
| `treegraph` | Hierarchical and network structures | Trees, BSTs, graphs, MST |
| `theory` | Formal systems and automata | DFA/NFA simulators |
| `system-process` | OS-level simulations | CPU scheduling |

Engines live in `src/engines/` and contain shared logic, hooks, and utilities that topic visualizers depend on.

### Topic Pages

A topic page is an MDX file in `src/content/topics/` that explains a single CS concept. Each topic:

- Has frontmatter matching the content schema
- Follows the pedagogical contract (intuition → formal → visual → example → analysis → mistakes → practice)
- Embeds an engine-powered visualizer via React component

### Visualizers

Visualizers are React components that implement interactive demonstrations. They live in `src/components/visualizers/` and are hydrated as Astro islands.

**Rule:** Visualizers belong in `src/components/visualizers/`, not inside topic content or engine directories.

## Directory Structure

```
src/
├── components/
│   ├── ui/           # Pure UI: Button, Card, Grid
│   ├── layout/       # Shell: Header, Footer, Sidebar
│   ├── pedagogy/     # Educational: IntuitionBlock, ExampleBlock
│   └── visualizers/  # Interactive: SortVisualizer, TreeVisualizer
├── content/
│   ├── config.ts     # Zod schema for collections
│   └── topics/      # MDX topic files
├── engines/          # Reusable engine logic
├── data/             # Navigation, categories, curriculum maps
├── layouts/          # BaseLayout, TopicLayout
└── pages/            # Astro route pages
```

## What Goes Where

| Content | Place |
|---------|-------|
| Explanation text, theory, examples | `src/content/topics/*.mdx` |
| Interactive widgets | `src/components/visualizers/*.tsx` |
| Pedagogical wrappers | `src/components/pedagogy/*.astro` |
| Shared visualization logic | `src/engines/*/` |
| Navigation structure | `src/data/navigation.ts` |

## Adding a New Topic

1. **Create the MDX file** in `src/content/topics/`
2. **Write frontmatter** matching the schema in `src/content/config.ts`
3. **Create a visualizer** in `src/components/visualizers/`
4. **Embed the visualizer** in the MDX using the appropriate engine
5. **Update navigation** in `src/data/navigation.ts`
6. **Add the topic** to the appropriate engine folder if reusable

## Content vs Components

**Put in MDX:**
- Prose explanations
- Formal definitions
- Step-by-step examples (text)
- Complexity analysis
- Common mistakes
- Practice prompts

**Put in Components:**
- Interactive visualizations
- State-dependent UI
- User input handling
- Animation logic

## Engine vs Visualizer Boundary

This is the most important architectural rule for contributors:

> **Visualizers own presentation. Engines own concept data and reusable logic.**

Concretely:
- **Engine files** (`src/engines/*/`) contain: data definitions, type interfaces, utility functions, shared state models, algorithm step-trace generators
- **Visualizer components** (`src/components/visualizers/*.tsx`) contain: React rendering, user input handling, canvas/DOM drawing, playback controls

### Examples

**What belongs in the engine:**

```typescript
// src/engines/sequence/sorting-ops.ts
export interface SortStep {
  action: 'compare' | 'swap' | 'merge' | 'done';
  indices: number[];
  array: number[];
  message: string;
}

export function computeBubbleSort(arr: number[]): SortingState {
  const steps: SortStep[] = [];
  // ... algorithm that generates steps
  return { result: arr, steps, message: 'Done' };
}
```

**What belongs in the visualizer:**

```tsx
// src/components/visualizers/SortingVisualizer.tsx
function drawBars(canvas, step) {
  // React rendering logic
  // User input handling
  // Canvas drawing based on step data
}
```

**Why this matters:** If algorithm logic lives only in visualizers, each new topic covering the same concept will duplicate or reinvent it. By keeping data in engines and visualizers consuming it, the platform stays coherent.

**Rule:** If you find yourself duplicating data (arrays of labels, type definitions, constants) across visualizers, extract it into the appropriate engine file.

## Engine Interface

Each engine exports a standard interface:

```typescript
interface Engine {
  name: string;
  slug: 'sequence' | 'treegraph' | 'theory' | 'system-process';
  getDefaultState: () => EngineState;
  step: (state: EngineState) => EngineState;
  render: (state: EngineState) => JSX.Element;
}
```

Visualizers use engine hooks to manage state and animation. See individual engine READMEs for specifics.

## Engine Families

OpenCS has three fundamentally different kinds of engines. Keeping them distinct prevents confusion about what belongs where.

### Theory Engines — Conceptual Data

Theory engines contain **static, declarative concept data**. They do not track state changes or operations over time.

**Examples:**
- `theory/complexity.ts` — definitions of Big-O classes, their labels, heights, and descriptions
- Future: DFA state definitions, grammar rules, truth tables

**Characteristics:**
- Data is constant — the same complexity classes appear in every session
- No `applyOperation()` or `step()` functions
- Pure types + static datasets
- Visualizers import and render the data, but the engine never mutates

### Stateful Data-Structure Engines — Operation Logic

Stateful engines contain **dynamic operation logic**. They track state transitions as users interact with visualizers.

**Examples:**
- `sequence/array-ops.ts` — insert, delete, search, access, update functions with immutable state transitions
- `sequence/sorting-ops.ts` — bubble, insertion, merge sort with step traces

**Characteristics:**
- State changes over time as operations are applied
- `apply*()` or `compute*()` functions take current state and return new state with step traces
- Visualizers own the React state, but delegate operation logic to engine
- Each function is pure and reversible

### Hierarchical / Graph-Structured Engines

Hierarchical engines handle **recursive structures** with traversal state and tree/graph-specific operations.

**Examples:**
- `treegraph/tree-types.ts` — TreeNode interface, traversal helpers, tree generators
- `treegraph/graph-types.ts` — Graph model, adjacency, step traces for BFS/DFS/Dijkstra/Prim

**Characteristics:**
- Recursive data structures (trees, graphs) need different rendering approaches
- Traversal algorithms generate step sequences (not just final results)
- Canvas-based rendering common for tree structures
- Operations often involve structural transformations (insert, delete, rotate)

## Decision Guide

When adding a new topic, ask:

1. **Is the data mostly static?** → Add to the appropriate theory engine file
2. **Does the topic involve state transitions?** → Create or extend a stateful engine file in the appropriate engine
3. **Does this share behavior with an existing data structure?** → Extend that engine file before creating a new one

## MDX Authoring Rules

### Importing Visualizers

Always import visualizers at the top of the MDX file:

```mdx
import SortingVisualizer from '../../components/visualizers/SortingVisualizer';
```

Use `client:load` to hydrate the component:

```mdx
<SortingVisualizer client:load />
```

### Avoiding JSX Parsing Issues

MDX parses text as JSX if it looks like a component. Avoid these patterns in prose:

- Capitalized words that could be component names: use lowercase or code spans
- Parenthesized labels: `node-A (weight 4)` → use code spans or rephrase

**Safe alternatives:**
- Use numbered labels: `node 0`, `node 1`
- Use backticks for technical terms: \`Source\`, \`start\`
- Rephrase: "The node labeled Source" → "The start node"

## Design Principles

1. **Static first** — Only hydrate what needs interactivity
2. **Engine reuse** — New topics should use existing engines before creating new ones
3. **Pedagogy over polish** — v1 prioritizes educational quality over visual refinement
4. **Contributor clarity** — Every new topic should follow the educational contract
5. **Step traces, not computed state** — Engines generate ordered pedagogical states; visualizers render them

---

_Last updated: 2025_
