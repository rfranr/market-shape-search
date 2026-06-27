import type { PriceCandle } from '../domain/price-candle.js';
import type { Ticker } from '../domain/ticker.js';
import type { MarketDataClient } from '../infra/alpaca-market-data.client.js';
import type { MarketDataRepository } from '../infra/market-data.repository.js';

export class DownloadHistoryUseCase {
  constructor(
    private readonly marketDataClient: MarketDataClient,
    private readonly marketDataRepository: MarketDataRepository
  ) {}

  async execute(ticker: Ticker): Promise<PriceCandle[]> {
    const candles: PriceCandle[] = await this.marketDataClient.downloadHistory(ticker);

    await this.marketDataRepository.saveTicker(ticker);
    await this.marketDataRepository.savePriceCandles(ticker.symbol, candles);

    return candles;
  }
}
