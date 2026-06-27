import cors from 'cors';
import express from 'express';
import type { Express } from 'express';
import { analysisRouter } from './routes/analysis.routes.js';
import { healthRouter } from './routes/health.routes.js';
import { tickersRouter } from './routes/tickers.routes.js';
import { config } from './shared/config.js';

const app: Express = express();

app.use(cors({ origin: config.frontendOrigin }));
app.use(express.json());

app.use('/api', healthRouter);
app.use('/api', tickersRouter);
app.use('/api', analysisRouter);

export { app };
