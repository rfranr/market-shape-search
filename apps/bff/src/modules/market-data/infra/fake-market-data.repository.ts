import type { MarketDataRepositoryPort } from '../application/ports/market-data-repository.port.js';
import type { PriceCandle } from '../domain/price-candle.js';
import type { Ticker } from '../domain/ticker.js';

export class FakeMarketDataRepository implements MarketDataRepositoryPort {
  private readonly tickers: Map<string, Ticker> = new Map<string, Ticker>();
  private readonly candlesBySymbol: Map<string, PriceCandle[]> = new Map<string, PriceCandle[]>();

  async saveTicker(ticker: Ticker): Promise<void> {
    this.tickers.set(ticker.symbol, ticker);
  }

  async savePriceCandles(symbol: string, candles: PriceCandle[]): Promise<void> {
    const mergedByTimestamp: Map<string, PriceCandle> = new Map<string, PriceCandle>();

    for (const candle of this.candlesBySymbol.get(symbol) ?? []) {
      mergedByTimestamp.set(candle.timestamp, candle);
    }

    for (const candle of candles) {
      mergedByTimestamp.set(candle.timestamp, candle);
    }

    this.candlesBySymbol.set(
      symbol,
      [...mergedByTimestamp.values()].sort((left, right) => left.timestamp.localeCompare(right.timestamp))
    );
  }

  async getTickerHistory(symbol: string): Promise<PriceCandle[]> {
    return this.candlesBySymbol.get(symbol) ?? [];
  }
}
