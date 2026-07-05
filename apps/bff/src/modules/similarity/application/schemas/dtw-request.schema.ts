import { z } from 'zod';

export const dtwRequestSchema = z.object({
  seriesA: z.array(z.number()).min(1),
  seriesB: z.array(z.number()).min(1)
});
