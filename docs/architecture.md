# OpenCS Architecture

This document explains how OpenCS is structured for contributors. Read this before adding topics, engines, or visualizers.

## Core Concepts

### Engines

Engines are reusable visualization frameworks that power multiple topic pages. Each engine handles a distinct visualization paradigm:

| Engine | Purpose | Example Topics |
|--------|---------|----------------|
| `sequence` | Linear operations and iterative processes | Time complexity, sorting, recursion trees |
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

## Design Principles

1. **Static first** — Only hydrate what needs interactivity
2. **Engine reuse** — New topics should use existing engines before creating new ones
3. **Pedagogy over polish** — v1 prioritizes educational quality over visual refinement
4. **Contributor clarity** — Every new topic should follow the educational contract

---

_Last updated: 2025_