import { Router } from 'express';
import type { Request, Response } from 'express';
import type { HelloResponse } from '@repo/shared-types';
import { getHelloResponse } from '../services/health.service.js';

const healthRouter: Router = Router();

healthRouter.get('/hello', (_req: Request, res: Response<HelloResponse>): void => {
  res.json(getHelloResponse());
});

export { healthRouter };
