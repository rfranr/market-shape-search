import type { PriceCandle } from '../domain/price-candle.js';
import type { Ticker } from '../domain/ticker.js';
import { NotImplementedError } from './market-data.repository.js';

export interface MarketDataClient {
  downloadHistory(ticker: Ticker): Promise<PriceCandle[]>;
}

export class AlpacaMarketDataClient implements MarketDataClient {
  constructor(private readonly baseUrl: string) {}

  async downloadHistory(_ticker: Ticker): Promise<PriceCandle[]> {
    void this.baseUrl;
    throw new NotImplementedError('Alpaca market data client is not implemented yet.');
  }
}
