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
3. **Register engine** — Ensure the topic uses the appropriate engine
4. **Update navigation** — Add topic to `src/data/navigation.ts`

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

## Pull Request Process

1. **Test locally** — Run `npm run build` to verify no errors
2. **Check your PR** — Ensure your branch is up to date with main
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