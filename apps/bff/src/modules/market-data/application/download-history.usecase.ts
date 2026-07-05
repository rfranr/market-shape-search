import type { PriceCandle } from '../domain/price-candle.js';
import type { Ticker } from '../domain/ticker.js';
import type { MarketDataClientPort } from './ports/market-data-client.port.js';
import type { MarketDataRepositoryPort } from './ports/market-data-repository.port.js';

export class DownloadHistoryUseCase {
  constructor(
    private readonly marketDataClient: MarketDataClientPort,
    private readonly marketDataRepository: MarketDataRepositoryPort
  ) {}

  async execute(ticker: Ticker): Promise<PriceCandle[]> {
    const candles: PriceCandle[] = await this.marketDataClient.downloadHistory(ticker);

    await this.marketDataRepository.saveTicker(ticker);
    await this.marketDataRepository.savePriceCandles(ticker.symbol, candles);

    return candles;
  }
}
