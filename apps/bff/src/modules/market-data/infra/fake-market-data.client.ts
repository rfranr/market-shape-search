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
      }
    ];
  }
}
