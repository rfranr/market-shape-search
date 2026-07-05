import { describe, expect, it } from 'vitest';
import { alpacaBarsResponseSchema } from './alpaca-bars-response.schema.js';

describe('alpacaBarsResponseSchema', () => {
  it('accepts a valid Alpaca bars response', () => {
    const result = alpacaBarsResponseSchema.safeParse({
      bars: {
        BIO: [
          {
            t: '2026-07-01T00:00:00Z',
            o: 100,
            h: 102,
            l: 99,
            c: 101,
            v: 123456
          }
        ]
      },
      next_page_token: null
    });

    expect(result.success).toBe(true);
  });

  it('rejects a response without bars', () => {
    const result = alpacaBarsResponseSchema.safeParse({ next_page_token: null });

    expect(result.success).toBe(false);
  });

  it('rejects numeric bar values returned as strings', () => {
    const result = alpacaBarsResponseSchema.safeParse({
      bars: {
        BIO: [
          {
            t: '2026-07-01T00:00:00Z',
            o: '100',
            h: 102,
            l: 99,
            c: 101,
            v: 123456
          }
        ]
      }
    });

    expect(result.success).toBe(false);
  });
});
