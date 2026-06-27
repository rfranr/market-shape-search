import type { PriceCandle } from '../domain/price-candle.js';
import type { MarketDataRepository } from '../infra/market-data.repository.js';

export class GetTickerHistoryUseCase {
  constructor(private readonly marketDataRepository: MarketDataRepository) {}

  async execute(symbol: string): Promise<PriceCandle[]> {
    return this.marketDataRepository.getTickerHistory(symbol);
  }
}
