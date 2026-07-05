import type { MarketDataRepositoryPort } from '../application/ports/market-data-repository.port.js';
import type { PriceCandle } from '../domain/price-candle.js';
import type { Ticker } from '../domain/ticker.js';
import { NotImplementedError } from '../../../shared/errors.js';

export class PlaceholderMarketDataRepository implements MarketDataRepositoryPort {
  async saveTicker(_ticker: Ticker): Promise<void> {
    throw new NotImplementedError('Market data repository persistence is not implemented yet.');
  }

  async savePriceCandles(_symbol: string, _candles: PriceCandle[]): Promise<void> {
    throw new NotImplementedError('Market data repository persistence is not implemented yet.');
  }

  async getTickerHistory(_symbol: string): Promise<PriceCandle[]> {
    throw new NotImplementedError('Market data repository reads are not implemented yet.');
  }
}
