import { Router } from 'express';
import type { NextFunction, Request, Response } from 'express';
import type { PriceCandle } from '../modules/market-data/domain/price-candle.js';
import type { DownloadHistoryRequest } from '../modules/market-data/application/ports/market-data-client.port.js';
import { downloadHistoryUseCase } from '../modules/market-data/market-data.composition.js';

const marketDataRouter: Router = Router();

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
