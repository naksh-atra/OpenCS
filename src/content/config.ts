import { defineCollection, z } from 'astro:content';

const topics = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum([
      'algorithms',
      'data-structures',
      'theory',
      'systems',
      'architecture',
      'networks',
      'databases',
    ]),
    engine: z.enum(['sequence', 'treegraph', 'theory', 'system-process']),
    order: z.number(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    tags: z.array(z.string()).default([]),
    prerequisites: z.array(z.string()).default([]),
    learningObjectives: z.array(z.string()).min(1),
    estimatedTime: z.string(),
    status: z.enum(['planned', 'in-progress', 'published']).default('planned'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { topics };