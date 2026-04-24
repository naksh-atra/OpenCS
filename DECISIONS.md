# Architecture Decision Records

This log records significant architectural decisions made during the OpenCS project development. Each entry documents the context, options considered, and rationale for the final choice.

---

## ADR-001: Static Site Generation with Astro Islands

**Date:** 2025
**Status:** Accepted

### Context

OpenCS needs to be a public, fast-loading site for students who may access it on low-bandwidth connections. Content is mostly static (explanations, theory), but visualization components require JavaScript interactivity. We needed a framework that could render static content efficiently while supporting rich interactive widgets.

### Decision

Use Astro with React islands for interactive components.

### Rationale

- Astro's islands architecture enables selective hydration — static content renders as pure HTML, while only visualizers ship JavaScript
- React integration is mature and well-supported in Astro
- MDX support is first-class, enabling rich topic pages with embedded components
- Static output is optimal for GitHub Pages deployment
- TypeScript support is built-in

### Consequences

- Contributors must write React components for visualizers, Astro components for static UI
- Content lives in MDX files; code lives in components
- Build produces a fully static site with no server runtime

---

## ADR-002: GitHub Pages Project Site Deployment

**Date:** 2025
**Status:** Accepted

### Context

OpenCS will be deployed publicly on GitHub Pages. The repository is named `OpenCS`, not `<username>.github.io`, so it must deploy as a project site, not a user/organization site.

### Decision

Configure Astro with `site: 'https://<username>.github.io'` and `base: '/OpenCS'`. Use GitHub Actions workflow for deployment.

### Rationale

- Project site URLs follow the pattern `https://<owner>.github.io/<repository>/`
- Astro requires explicit `base` for repository-named project sites
- GitHub Actions with the official Astro deploy action is the recommended approach
- Static output mode (`output: 'static'`) is correct for Pages-compatible deployment

### Consequences

- Maintainers must update `site` with their actual GitHub Pages URL before first deployment
- All internal links must respect the `/OpenCS` base path
- Local dev runs on `/OpenCS` base (or can be overridden via config)

---

## ADR-003: Four-Engine Architecture

**Date:** 2025
**Status:** Accepted

### Context

As OpenCS grows, custom visualizations for every topic would lead to incoherence and duplication. We needed a reusable engine model where similar visualization types share infrastructure.

### Decision

Implement 4 reusable engines:

1. **Sequence Engine** — Linear operations: arrays, sorting, recursion, time complexity
2. **TreeGraph Engine** — Hierarchical/network structures: trees, BSTs, graphs, MST
3. **Theory Engine** — Formal systems: DFA/NFA, automata theory
4. **SystemProcess Engine** — OS-level simulations: CPU scheduling, memory

### Rationale

- Each engine maps to a distinct visualization paradigm
- Engines are reusable across multiple topics
- New topics can be classified by engine type
- Separation keeps visualizers modular and testable

### Consequences

- Topic frontmatter must specify `engine` type
- Engine directories are created in `src/engines/`
- Topic pages delegate rendering to engine-specific components

---

## ADR-004: MDX Content Collections

**Date:** 2025
**Status:** Accepted

### Context

Topic content needs to be contributor-friendly, version-controlled, and embeddable with components. Plain Markdown is insufficient for pedagogical blocks and interactive components.

### Decision

Use Astro's MDX integration with typed content collections for all topic content.

### Rationale

- MDX enables embedding React components directly in topic pages
- Content collections provide type-safe frontmatter validation
- Zod schemas enforce contribution standards
- Collection routing with `[slug].astro` enables clean URLs

### Consequences

- Topics are `.mdx` files in `src/content/topics/`
- Frontmatter must match the defined Zod schema
- Topics can import and use visualizer components

---

## ADR-005: Textbook-Modern Visual Design

**Date:** 2025
**Status:** Accepted

### Context

OpenCS serves students who need clarity and focus, not flashy startup aesthetics. The design should feel academic and authoritative, not playful or gimmicky.

### Decision

Adopt a "textbook-modern" visual direction:
- Clean, minimal layout with generous whitespace
- Clear typography (system fonts or academic-appropriate typefaces)
- Restrained color palette (muted tones, no neon)
- Subtle interactions only where meaningful
- No dark mode in v1

### Rationale

- Academic credibility is important for a CSE education platform
- Students need to focus on content, not visual distractions
- Simple design is easier to maintain and contribute to
- Avoids the "AI-generated product page" feel

### Consequences

- CSS should use CSS variables for tokens
- No complex theming in v1
- Mobile-responsive by default

---

_Last updated: 2025_