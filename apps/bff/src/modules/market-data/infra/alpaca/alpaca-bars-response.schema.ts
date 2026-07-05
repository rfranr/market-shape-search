import { z } from 'zod';

export const alpacaBarSchema = z.object({
  t: z.string().min(1),
  o: z.number(),
  h: z.number(),
  l: z.number(),
  c: z.number(),
  v: z.number()
});

export const alpacaBarsResponseSchema = z.object({
  bars: z.record(z.string(), z.array(alpacaBarSchema)),
  next_page_token: z.string().nullable().optional()
});

export type AlpacaBar = z.infer<typeof alpacaBarSchema>;
export type AlpacaBarsResponse = z.infer<typeof alpacaBarsResponseSchema>;
