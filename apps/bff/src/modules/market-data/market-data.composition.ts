import { DownloadHistoryUseCase } from './application/download-history.usecase.js';
import { FakeMarketDataClient } from './infra/fake-market-data.client.js';
import { FakeMarketDataRepository } from './infra/fake-market-data.repository.js';

export const downloadHistoryUseCase: DownloadHistoryUseCase = new DownloadHistoryUseCase(
  new FakeMarketDataClient(),
  new FakeMarketDataRepository()
);
