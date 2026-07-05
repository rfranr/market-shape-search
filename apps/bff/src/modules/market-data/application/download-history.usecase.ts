import type { PriceCandle } from '../domain/price-candle.js';
import type { DownloadHistoryRequest, MarketDataClientPort } from './ports/market-data-client.port.js';
import type { MarketDataRepositoryPort } from './ports/market-data-repository.port.js';

export class DownloadHistoryUseCase {
  constructor(
    private readonly marketDataClient: MarketDataClientPort,
    private readonly marketDataRepository: MarketDataRepositoryPort
  ) {}

  async execute(request: DownloadHistoryRequest): Promise<PriceCandle[]> {
    const candles: PriceCandle[] = await this.marketDataClient.downloadHistory(request);

    await this.marketDataRepository.saveTicker(request.ticker);
    await this.marketDataRepository.savePriceCandles(request.ticker.symbol, candles);

    return candles;
  }
}
