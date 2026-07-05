import { Router } from 'express';
import type { NextFunction, Request, Response } from 'express';
import type { DtwResponse } from '@repo/shared-types';
import { dtwRequestSchema } from '../modules/similarity/application/schemas/dtw-request.schema.js';
import { calculateDtwUseCase } from '../modules/similarity/similarity.composition.js';
import { parseWithSchema } from '../shared/validation.js';

const analysisRouter: Router = Router();

analysisRouter.post('/dtw', async (req: Request, res: Response<DtwResponse>, next: NextFunction): Promise<void> => {
  try {
    const body = parseWithSchema(dtwRequestSchema, req.body);
    const result: DtwResponse = await calculateDtwUseCase.execute(body);

    res.json(result);
  } catch (error: unknown) {
    next(error);
  }
});

export { analysisRouter };
