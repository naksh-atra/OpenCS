# OpenCS

OpenCS is an open-source visual learning platform designed for BTech CSE students in India. It provides interactive visualizations of core computer science topics — algorithms, data structures, theory of computation, and systems — through a textbook-modern interface.

## Mission

To make computer science fundamentals visually intuitive and freely accessible to every BTech CSE student in India. OpenCS is built as a reusable, contributor-friendly platform that explains recurring topics using interactive visualizers powered by modular engines.

## Tech Stack

- **Astro** — Static site shell with islands architecture for selective interactivity
- **React** — Interactive visualizers embedded via Astro islands
- **MDX** — Content collections for topic pages
- **TypeScript** — Type-safe codebase
- **GitHub Pages** — Static deployment

## Quick Start

```bash
# Clone the repository
git clone https://github.com/opencs/OpenCS.git
cd OpenCS

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321/OpenCS/` to view the site locally.

## Topics (Milestone 6 Complete)

OpenCS covers 10 published topics across 4 engines:

| Topic | Category | Engine | Status |
|-------|---------|--------|--------|
| Time Complexity | algorithms | theory | published |
| Recursion Tree | algorithms | theory | published |
| Sorting | algorithms | sequence | published |
| Arrays | data-structures | sequence | published |
| Stack & Queue | data-structures | sequence | published |
| Linked Lists | data-structures | sequence | published |
| Tree Traversals | data-structures | treegraph | published |
| Binary Search Tree | data-structures | treegraph | published |
| BFS & DFS | algorithms | treegraph | published |
| Shortest Path & MST | algorithms | treegraph | published |

See [ROADMAP.md](ROADMAP.md) for the full topic list and development status.

## Architecture

OpenCS uses a modular engine architecture:

```
src/
├── components/      # UI, layout, pedagogy, visualizer components
├── content/       # MDX topic content (10 files)
├── engines/       # Reusable visualization engines
│   ├── sequence/  # Linear operations: arrays, sorting, linked lists
│   ├── treegraph/ # Hierarchical: trees, BSTs, graphs
│   ├── theory/   # Static concepts: complexity, complexity classes
│   └── system-process/ # OS simulations (planned)
├── layouts/       # Page layouts
└── pages/        # Route pages
```

**Engines** contain shared visualization logic. **Visualizers** are React components that render engine data interactively. See [docs/architecture.md](docs/architecture.md) for details.

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) before submitting PRs.

Key contributor guidelines:
- Follow the educational contract (intuition → formal → visual → example → analysis → mistakes → practice)
- Visualizers belong in `src/components/visualizers/`, engine logic in `src/engines/*/`
- Use step traces for animation; avoid hardcoded algorithm state in visualizers
- Test with `npm run build` before submitting

## Deployment

This project deploys to GitHub Pages as a project site at `https://opencs.github.io/OpenCS/`.

The Astro config uses `base: '/OpenCS'` throughout. For local development, `site` is undefined. For GitHub Pages, set `GITHUB_PAGES_DEPLOY=1` to enable the correct `site` value.

See [DEPLOY.md](DEPLOY.md) for detailed deployment configuration.

## License

Licensed under the MIT License. See [LICENSE](LICENSE) for details.