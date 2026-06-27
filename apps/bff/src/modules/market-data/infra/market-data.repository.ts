import type { PriceCandle } from '../domain/price-candle.js';
import type { Ticker } from '../domain/ticker.js';

export interface MarketDataRepository {
  saveTicker(ticker: Ticker): Promise<void>;
  savePriceCandles(symbol: string, candles: PriceCandle[]): Promise<void>;
  getTickerHistory(symbol: string): Promise<PriceCandle[]>;
}

export class NotImplementedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotImplementedError';
  }
}

export class PlaceholderMarketDataRepository implements MarketDataRepository {
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
