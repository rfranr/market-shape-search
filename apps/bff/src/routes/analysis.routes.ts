import { Router } from 'express';
import type { NextFunction, Request, Response } from 'express';
import type { DtwRequest, DtwResponse } from '@repo/shared-types';
import { CalculateDtwUseCase } from '../modules/similarity/application/calculate-dtw.usecase.js';
import { DtwApiClient } from '../modules/similarity/infra/dtw-api.client.js';
import { config } from '../shared/config.js';

const analysisRouter: Router = Router();
const calculateDtwUseCase: CalculateDtwUseCase = new CalculateDtwUseCase(new DtwApiClient(config.fastApiBaseUrl));

analysisRouter.post('/dtw', async (req: Request, res: Response<DtwResponse>, next: NextFunction): Promise<void> => {
  try {
    const body: DtwRequest = req.body as DtwRequest;
    const result: DtwResponse = await calculateDtwUseCase.execute(body);

    res.json(result);
  } catch (error: unknown) {
    next(error);
  }
});

export { analysisRouter };
