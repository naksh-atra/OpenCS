export const categories = [
  {
    slug: 'algorithms',
    label: 'Algorithms',
    description: 'Analysis and design of computational procedures',
  },
  {
    slug: 'data-structures',
    label: 'Data Structures',
    description: 'Organization and storage of data for efficient access',
  },
  {
    slug: 'theory',
    label: 'Theory of Computation',
    description: 'Models of computation, formal languages, and automata',
  },
  {
    slug: 'systems',
    label: 'Systems',
    description: 'Operating systems, architecture, and system-level concepts',
  },
  {
    slug: 'architecture',
    label: 'Architecture',
    description: 'Computer organization and design',
  },
  {
    slug: 'networks',
    label: 'Networks',
    description: 'Data communication and networking protocols',
  },
  {
    slug: 'databases',
    label: 'Databases',
    description: 'Data modeling, storage, and retrieval systems',
  },
] as const;

export type Category = typeof categories[number];