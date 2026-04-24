export const navigation = [
  { label: 'Topics', href: '/OpenCS/topics' },
  { label: 'Roadmap', href: '/OpenCS/roadmap' },
  { label: 'About', href: '/OpenCS/about' },
  { label: 'Contribute', href: '/OpenCS/contribute' },
] as const;

export type NavItem = typeof navigation[number];