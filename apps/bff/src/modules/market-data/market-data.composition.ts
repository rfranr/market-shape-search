import { config } from '../../shared/config.js';
import { DownloadHistoryUseCase } from './application/download-history.usecase.js';
import { FakeMarketDataRepository } from './infra/fake-market-data.repository.js';
import { createMarketDataClient } from './infra/market-data-client.factory.js';

export const downloadHistoryUseCase: DownloadHistoryUseCase = new DownloadHistoryUseCase(
  createMarketDataClient(config),
  new FakeMarketDataRepository()
);
