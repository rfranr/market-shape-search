import cors from 'cors';
import express from 'express';
import type { DtwRequest, DtwResponse, HelloResponse } from '@repo/shared-types';

const app = express();
const port = Number(process.env.PORT ?? 3001);
const dtwApiUrl = process.env.DTW_API_URL ?? 'http://localhost:8000';

app.use(cors({ origin: process.env.FRONTEND_ORIGIN ?? 'http://localhost:3000' }));
app.use(express.json());

app.get('/api/hello', (_req, res) => {
  const response: HelloResponse = {
    message: 'HelloWorld des del BFF 👋',
    source: 'bff'
  };

  res.json(response);
});

app.post('/api/dtw', async (req, res, next) => {
  try {
    const body = req.body as DtwRequest;
    const dtwResponse = await fetch(`${dtwApiUrl}/dtw`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!dtwResponse.ok) {
      throw new Error(`Backend DTW error: ${dtwResponse.status}`);
    }

    const result = (await dtwResponse.json()) as DtwResponse;
    res.json(result);
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => {
  console.log(`BFF escoltant a http://localhost:${port}`);
});
