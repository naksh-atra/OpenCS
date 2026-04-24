# Contributing to OpenCS

Thank you for your interest in contributing to OpenCS. This guide will help you get started as a contributor.

## Ways to Contribute

- **Add new topics** — Implement visualizations for new BTech CSE topics
- **Improve existing topics** — Fix bugs, enhance pedagogy, improve visualizers
- **Documentation** — Improve docs, contribute to architecture decisions
- **Engines** — Build or enhance reusable visualization engines

## Getting Started

1. Fork the repository
2. Clone your fork locally:
   ```bash
   git clone https://github.com/<your-username>/OpenCS.git
   cd OpenCS
   ```
3. Create a new branch for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:4321`.

## Project Architecture

Before contributing, please read [docs/architecture.md](docs/architecture.md) to understand:
- What an engine is and how to create one
- How topic pages are structured
- What belongs in MDX vs components vs engines

## Adding a New Topic

1. **Create MDX content** — Add a new file to `src/content/topics/` with frontmatter
2. **Implement visualizer** — Create a React component in `src/components/visualizers/`
3. **Add engine logic** — If reusable, add operation functions to the appropriate engine
4. **Embed visualizer** — Import and use `client:load` in the MDX
5. **Build and test** — Run `npm run build` to verify

### Topic Frontmatter Schema

Every topic must include:

```yaml
---
title: "Topic Title"
description: "Brief description"
category: "algorithms" | "data-structures" | "theory" | "systems"
engine: "sequence" | "treegraph" | "theory" | "system-process"
order: 1
difficulty: "beginner" | "intermediate" | "advanced"
tags: []
prerequisites: []
learningObjectives:
  - "Objective 1"
estimatedTime: "15 minutes"
status: "planned" | "in-progress" | "published"
---
```

## Visualizer Rules

### Engine vs Visualizer Boundary

This is the most important rule:

> **Engines own algorithm logic. Visualizers own rendering.**

- **Engine** (`src/engines/*/`): Type definitions, step-trace generation, algorithm implementation
- **Visualizer** (`src/components/visualizers/*.tsx`): React rendering, user input, canvas/DOM drawing, playback controls

**Wrong:** Putting sorting algorithm logic inside the visualizer component
**Right:** Engine generates step traces; visualizer renders them

### Step Trace Pattern

Engine functions should return an ordered array of steps:

```typescript
interface SortStep {
  action: 'compare' | 'swap' | 'done';
  indices: number[];
  array: number[];
  message: string;
}

interface SortingState {
  result: number[];
  steps: SortStep[];
  message: string;
}
```

Visualizer then plays through steps with Play/Pause/Step controls.

### No Hardcoded Algorithm State

Visualizers should NOT:
- Run algorithms in useEffect
- Maintain their own algorithm state
- Duplicate engine logic

Visualizers SHOULD:
- Import computed states from engines
- Render current step index
- Handle user playback controls

## MDX Gotchas

### JSX Parsing

MDX parses text as JSX if it looks like a component. Avoid:

- `node-A (weight 4)` — parsed as component
- `Source:` — parsed as component

Safe alternatives:
- Use code spans: \`node-A\` or numbered labels: \`node 0\`
- Use lowercase: "start node" not "Source"

### Importing Visualizers

Always import at the top and use `client:load`:

```mdx
import MyVisualizer from '../../components/visualizers/MyVisualizer';

<MyVisualizer client:load />
```

## Pedagogy Standards

Every topic page must follow the educational contract:

1. **Intuition** — Start with plain-English explanation
2. **Formal Concept** — Present the formal definition/algorithm
3. **Visual Interaction** — Allow exploration via visualizer
4. **Step-by-step Example** — Walk through a concrete instance
5. **Complexity / Theorem / Invariant** — Analysis section
6. **Common Mistakes** — Pitfalls to avoid
7. **Practice Prompts** — Exercises for the reader

## Code Style

- TypeScript with strict mode
- Use Astro components (`.astro`) for static UI
- Use React (`.tsx`) for interactive visualizers
- Prefix utility functions with descriptive names
- Document public APIs with JSDoc
- Follow existing patterns in the codebase

## Build and Test

Before submitting a PR:

```bash
npm run build
```

Ensure:
- Build completes without errors
- All topic pages render
- Visualizers load correctly
- No TypeScript errors

## Pull Request Process

1. **Test locally** — Run `npm run build` to verify no errors
2. **Check your PR** — Ensure your branch is up to date with dev
3. **Write a clear PR description** — Explain what and why
4. **Link related issues** — Use GitHub keywords

### PR Title Format

Use conventional commits:
- `feat(topic): add time complexity visualizer`
- `fix(pedagogy): clarify Big-O explanation`
- `docs(contributing): update contribution guide`
- `chore(deps): update Astro to v5`

## Commit Messages

Keep the first line under 72 characters. Use the body for detail:

```
feat(topics): add sorting visualizer

- Implemented bubble sort, insertion sort, merge sort
- Added step-by-step animation
- Added complexity comparison
```

## Questions?

- Open an issue for bugs or feature requests
- Use discussions for questions
- Read existing issues before opening new ones

---

**Thank you for contributing to OpenCS!**
