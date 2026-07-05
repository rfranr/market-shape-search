import type { PriceCandle } from '../../domain/price-candle.js';
import type { Ticker } from '../../domain/ticker.js';

export interface MarketDataClientPort {
  downloadHistory(ticker: Ticker): Promise<PriceCandle[]>;
}
