import { Router } from 'express';
import type { NextFunction, Request, Response } from 'express';
import type { PriceCandle } from '../modules/market-data/domain/price-candle.js';
import type { DownloadHistoryRequest } from '../modules/market-data/application/ports/market-data-client.port.js';
import { DownloadHistoryUseCase } from '../modules/market-data/application/download-history.usecase.js';
import { FakeMarketDataClient } from '../modules/market-data/infra/fake-market-data.client.js';
import { FakeMarketDataRepository } from '../modules/market-data/infra/fake-market-data.repository.js';

const marketDataRouter: Router = Router();
const downloadHistoryUseCase: DownloadHistoryUseCase = new DownloadHistoryUseCase(
  new FakeMarketDataClient(),
  new FakeMarketDataRepository()
);

marketDataRouter.post(
  '/market-data/history/download',
  async (req: Request, res: Response<PriceCandle[]>, next: NextFunction): Promise<void> => {
    try {
      const body: DownloadHistoryRequest = req.body as DownloadHistoryRequest;
      const candles: PriceCandle[] = await downloadHistoryUseCase.execute(body);

      res.json(candles);
    } catch (error: unknown) {
      next(error);
    }
  }
);

export { marketDataRouter };
