import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string(),
  alias: z.string(),
  title: z.string(),
  about: z.array(z.string()),
  buildingNow: z.string(),
  skills: z.array(z.string()).min(1),
  contact: z.object({
    email: z.string().email(),
    github: z.string().url(),
    linkedin: z.string().url(),
  }),
});

export type Profile = z.infer<typeof profileSchema>;
