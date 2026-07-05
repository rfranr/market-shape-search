import type { PriceCandle } from '../../domain/price-candle.js';
import type { Ticker } from '../../domain/ticker.js';

export interface MarketDataRepositoryPort {
  saveTicker(ticker: Ticker): Promise<void>;
  savePriceCandles(symbol: string, candles: PriceCandle[]): Promise<void>;
  getTickerHistory(symbol: string): Promise<PriceCandle[]>;
}
