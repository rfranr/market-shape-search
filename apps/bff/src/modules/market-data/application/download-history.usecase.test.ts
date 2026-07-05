import { describe, expect, it, vi } from 'vitest';
import { DownloadHistoryUseCase } from './download-history.usecase.js';
import type { DownloadHistoryRequest, MarketDataClientPort } from './ports/market-data-client.port.js';
import type { MarketDataRepositoryPort } from './ports/market-data-repository.port.js';
import type { PriceCandle } from '../domain/price-candle.js';

const request: DownloadHistoryRequest = {
  ticker: { symbol: 'BIO', exchange: 'NYSE' },
  timeframe: '1Day',
  start: '2024-01-01',
  end: '2026-07-05',
  adjustment: 'split'
};

const candles: PriceCandle[] = [
  {
    symbol: 'BIO',
    timestamp: '2026-07-01T00:00:00Z',
    open: 100,
    high: 102,
    low: 99,
    close: 101,
    volume: 123456
  }
];

describe('DownloadHistoryUseCase', () => {
  it('downloads history, persists ticker and candles, and returns the candles', async () => {
    const marketDataClient: MarketDataClientPort = {
      downloadHistory: vi.fn().mockResolvedValue(candles)
    };
    const marketDataRepository: MarketDataRepositoryPort = {
      saveTicker: vi.fn().mockResolvedValue(undefined),
      savePriceCandles: vi.fn().mockResolvedValue(undefined),
      getTickerHistory: vi.fn().mockResolvedValue([])
    };
    const useCase = new DownloadHistoryUseCase(marketDataClient, marketDataRepository);

    const result = await useCase.execute(request);

    expect(result).toEqual(candles);
    expect(marketDataClient.downloadHistory).toHaveBeenCalledWith(request);
    expect(marketDataRepository.saveTicker).toHaveBeenCalledWith(request.ticker);
    expect(marketDataRepository.savePriceCandles).toHaveBeenCalledWith(request.ticker.symbol, candles);
  });
});
