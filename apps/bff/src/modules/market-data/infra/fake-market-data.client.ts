import type { DownloadHistoryRequest, MarketDataClientPort } from '../application/ports/market-data-client.port.js';
import type { PriceCandle } from '../domain/price-candle.js';

export class FakeMarketDataClient implements MarketDataClientPort {
  async downloadHistory(request: DownloadHistoryRequest): Promise<PriceCandle[]> {
    return [
      {
        symbol: request.ticker.symbol,
        timestamp: '2026-07-01T00:00:00Z',
        open: 100,
        high: 102,
        low: 99,
        close: 101,
        volume: 123456
      },
      {
        symbol: request.ticker.symbol,
        timestamp: '2026-07-02T00:00:00Z',
        open: 101,
        high: 103,
        low: 100,
        close: 102,
        volume: 234567
      },
      {
        symbol: request.ticker.symbol,
        timestamp: '2026-07-03T00:00:00Z',
        open: 102,
        high: 104,
        low: 101,
        close: 103,
        volume: 345678
      }
    ];
  }
}
