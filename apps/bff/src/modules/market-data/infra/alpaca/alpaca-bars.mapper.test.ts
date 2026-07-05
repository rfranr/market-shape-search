import { describe, expect, it } from 'vitest';
import { mapAlpacaBarsToPriceCandles } from './alpaca-bars.mapper.js';

// ACL mapping: external Alpaca field names stay out of the domain.
describe('mapAlpacaBarsToPriceCandles', () => {
  it('maps Alpaca bars to domain price candles', () => {
    const candles = mapAlpacaBarsToPriceCandles('BIO', [
      {
        t: '2026-07-01T00:00:00Z',
        o: 100,
        h: 102,
        l: 99,
        c: 101,
        v: 123456
      }
    ]);

    expect(candles).toEqual([
      {
        symbol: 'BIO',
        timestamp: '2026-07-01T00:00:00Z',
        open: 100,
        high: 102,
        low: 99,
        close: 101,
        volume: 123456
      }
    ]);
  });
});
