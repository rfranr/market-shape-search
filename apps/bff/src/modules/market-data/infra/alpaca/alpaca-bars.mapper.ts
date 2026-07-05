import type { PriceCandle } from '../../domain/price-candle.js';
import type { AlpacaBar } from './alpaca-bars-response.schema.js';

export function mapAlpacaBarsToPriceCandles(symbol: string, bars: AlpacaBar[]): PriceCandle[] {
  return bars.map((bar: AlpacaBar): PriceCandle => ({
    symbol,
    timestamp: bar.t,
    open: bar.o,
    high: bar.h,
    low: bar.l,
    close: bar.c,
    volume: bar.v
  }));
}
