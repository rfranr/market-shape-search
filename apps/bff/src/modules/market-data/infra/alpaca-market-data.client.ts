import type { DownloadHistoryRequest, MarketDataClientPort } from '../application/ports/market-data-client.port.js';
import type { PriceCandle } from '../domain/price-candle.js';
import { NotImplementedError } from '../../../shared/errors.js';

export class AlpacaMarketDataClient implements MarketDataClientPort {
  constructor(private readonly baseUrl: string) {}

  async downloadHistory(_request: DownloadHistoryRequest): Promise<PriceCandle[]> {
    void this.baseUrl;
    throw new NotImplementedError('Alpaca market data client is not implemented yet.');
  }
}
