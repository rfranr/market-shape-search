import { z } from 'zod';

const dateStringSchema = z.string().trim().min(1).refine((value) => !Number.isNaN(Date.parse(value)), {
  message: 'Invalid date'
});

export const downloadHistoryRequestSchema = z
  .object({
    ticker: z.object({
      symbol: z
        .string()
        .trim()
        .min(1)
        .transform((value) => value.toUpperCase()),
      name: z.string().trim().min(1).optional(),
      exchange: z
        .string()
        .trim()
        .min(1)
        .transform((value) => value.toUpperCase())
        .optional()
    }),
    timeframe: z.enum(['1Min', '5Min', '15Min', '1Hour', '1Day', '1Week']),
    start: dateStringSchema,
    end: dateStringSchema,
    adjustment: z.enum(['raw', 'split', 'dividend', 'all']).optional()
  })
  .refine((request) => Date.parse(request.start) < Date.parse(request.end), {
    message: 'start must be before end',
    path: ['start']
  });
