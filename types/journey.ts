import { z } from 'zod';

export const journeyItemSchema = z.object({
  title: z.string(),
  period: z.string(),
  summary: z.string(),
});

export const journeySchema = z.array(journeyItemSchema);

export type JourneyItem = z.infer<typeof journeyItemSchema>;
