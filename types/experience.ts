import { z } from 'zod';

export const experienceItemSchema = z.object({
  role: z.string(),
  company: z.string(),
  period: z.string(),
  location: z.string().optional(),
  bullets: z.array(z.string()).max(4),
});

export const experienceSchema = z.array(experienceItemSchema);

export type ExperienceItem = z.infer<typeof experienceItemSchema>;
