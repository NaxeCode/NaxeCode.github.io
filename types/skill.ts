import { z } from 'zod';

export const skillSchema = z.object({
  name: z.string(),
  category: z.enum(['language', 'framework', 'tool', 'specialty']),
  proficiency: z.number().min(1).max(5),
  yearsExperience: z.number().optional(),
  icon: z.string().optional(),
  description: z.string().optional(),
});

export const skillsCategorySchema = z.object({
  category: z.string(),
  skills: z.array(skillSchema),
});

export type Skill = z.infer<typeof skillSchema>;
export type SkillsCategory = z.infer<typeof skillsCategorySchema>;
