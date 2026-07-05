import { Router } from 'express';
import type { NextFunction, Request, Response } from 'express';
import type { DtwRequest, DtwResponse } from '@repo/shared-types';
import { calculateDtwUseCase } from '../modules/similarity/similarity.composition.js';

const analysisRouter: Router = Router();

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
