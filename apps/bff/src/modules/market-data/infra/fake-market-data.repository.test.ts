import { describe, expect, it } from 'vitest';
import { FakeMarketDataRepository } from './fake-market-data.repository.js';

describe('FakeMarketDataRepository', () => {
  it('merges candles by symbol and timestamp instead of replacing history', async () => {
    const repository = new FakeMarketDataRepository();

    await repository.savePriceCandles('BIO', [
      { symbol: 'BIO', timestamp: '2026-07-02T00:00:00Z', open: 101, high: 103, low: 100, close: 102, volume: 200 }
    ]);
    await repository.savePriceCandles('BIO', [
      { symbol: 'BIO', timestamp: '2026-07-01T00:00:00Z', open: 100, high: 102, low: 99, close: 101, volume: 100 },
      { symbol: 'BIO', timestamp: '2026-07-02T00:00:00Z', open: 102, high: 104, low: 101, close: 103, volume: 300 }
    ]);

    await expect(repository.getTickerHistory('BIO')).resolves.toEqual([
      { symbol: 'BIO', timestamp: '2026-07-01T00:00:00Z', open: 100, high: 102, low: 99, close: 101, volume: 100 },
      { symbol: 'BIO', timestamp: '2026-07-02T00:00:00Z', open: 102, high: 104, low: 101, close: 103, volume: 300 }
    ]);
  });
});
