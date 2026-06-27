import cors from 'cors';
import express from 'express';
import type { NextFunction, Request, Response, Express } from 'express';
import type { DtwRequest, DtwResponse, HelloResponse } from '@repo/shared-types';

const dtwApiUrl: string = process.env.DTW_API_URL ?? 'http://localhost:8000';

const app: Express = express();

app.use(cors({ origin: process.env.FRONTEND_ORIGIN ?? 'http://localhost:3000' }));
app.use(express.json());

app.get('/api/hello', (_req: Request, res: Response<HelloResponse>): void => {
  const response: HelloResponse = {
    message: 'HelloWorld des del BFF 👋',
    source: 'bff'
  };

  res.json(response);
});

app.post('/api/dtw', async (req: Request, res: Response<DtwResponse>, next: NextFunction): Promise<void> => {
  try {
    const body: DtwRequest = req.body as DtwRequest;
    const dtwResponse: globalThis.Response = await fetch(`${dtwApiUrl}/dtw`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!dtwResponse.ok) {
      throw new Error(`Backend DTW error: ${dtwResponse.status}`);
    }

    const result: DtwResponse = (await dtwResponse.json()) as DtwResponse;
    res.json(result);
  } catch (error: unknown) {
    next(error);
  }
});

export { app };
