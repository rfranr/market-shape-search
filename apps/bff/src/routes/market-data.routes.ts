import { Router } from 'express';
import type { NextFunction, Request, Response } from 'express';
import type { PriceCandle } from '../modules/market-data/domain/price-candle.js';
import { downloadHistoryRequestSchema } from '../modules/market-data/application/schemas/download-history-request.schema.js';
import { downloadHistoryUseCase } from '../modules/market-data/market-data.composition.js';
import { parseWithSchema } from '../shared/validation.js';

const marketDataRouter: Router = Router();

marketDataRouter.post(
  '/market-data/history/download',
  async (req: Request, res: Response<PriceCandle[]>, next: NextFunction): Promise<void> => {
    try {
      const body = parseWithSchema(downloadHistoryRequestSchema, req.body);
      const candles: PriceCandle[] = await downloadHistoryUseCase.execute(body);

      res.json(candles);
    } catch (error: unknown) {
      next(error);
    }
  }
);

export { marketDataRouter };
