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

Visit `http://localhost:4321` to view the site.

## Project Structure

```
src/
├── components/     # UI, layout, pedagogy, and visualizer components
├── content/       # MDX topic content
├── data/          # Navigation and curriculum data
├── engines/       # Reusable visualization engines
├── layouts/       # Page layouts
├── pages/         # Route pages
└── styles/       # Global styles and tokens
```

## Topics

OpenCS currently covers 12 core topics across 4 engines:

- **Sequence Engine** — Time complexity, recursion trees, sorting
- **TreeGraph Engine** — Trees, BSTs, graphs, shortest path, MST
- **Theory Engine** — DFA/NFA, automata
- **SystemProcess Engine** — CPU scheduling, memory

See [`ROADMAP.md`](ROADMAP.md) for the full topic list and development status.

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) before submitting PRs.

## License

Licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Code of Conduct

We adhere to the Contributor Covenant. See [Code of Conduct](CODE_OF_CONDUCT.md).