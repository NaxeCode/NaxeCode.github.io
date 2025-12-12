import { z } from 'zod';

export const projectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  category: z.enum(['full-stack', 'game', 'tool', 'design-system']),
  year: z.string(),
  featured: z.boolean().default(false),
  github: z.string().url().optional(),
  demo: z.string().url().optional(),
  demoType: z.enum(['video', 'iframe', 'images', 'none']).default('none'),
  demoUrl: z.string().optional(),
  images: z.array(z.string()).default([]),
  thumbnail: z.string().optional(),
  stack: z.object({
    frontend: z.array(z.string()).optional(),
    backend: z.array(z.string()).optional(),
    database: z.array(z.string()).optional(),
    tools: z.array(z.string()).optional(),
  }).optional(),
  relatedProjects: z.array(z.string()).default([]),
});

export type Project = z.infer<typeof projectSchema>;
