import type { PriceCandle } from '../domain/price-candle.js';
import type { MarketDataRepositoryPort } from './ports/market-data-repository.port.js';

export class GetTickerHistoryUseCase {
  constructor(private readonly marketDataRepository: MarketDataRepositoryPort) {}

  async execute(symbol: string): Promise<PriceCandle[]> {
    return this.marketDataRepository.getTickerHistory(symbol);
  }
}
