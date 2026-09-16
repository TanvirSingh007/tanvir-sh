import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    /** One-line summary. Shown on the index and used as the meta description. */
    summary: z.string(),
    /** Your role on this piece of work. */
    role: z.string(),
    /** e.g. '2024 — present'. Free text so 'ongoing' works. */
    period: z.string(),
    stack: z.array(z.string()).default([]),
    /** Lower sorts first. Re-order per application without touching anything else. */
    order: z.number().default(99),
    /** Featured entries appear on the homepage. Keep this to 3. */
    featured: z.boolean().default(false),
    /** Public URL, when there is one. Most of this work has none. */
    link: z.url().optional(),
    /** Capability tags. Drive the homepage grid and the tags on /work/. */
    domains: z.array(z.enum(['infra', 'backend', 'ai', 'product', 'native'])).default([]),
    /** Where the work happened. Metadata, not the filing system. */
    context: z.enum(['trilogy', 'auribises', 'self-directed']).default('trilogy'),
  }),
});

export const collections = { work };
