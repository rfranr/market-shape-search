import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../app.js';

describe('market data routes', () => {
  it('downloads ticker history through the fake market data client', async () => {
    const body = {
      ticker: { symbol: 'bio', exchange: 'nyse' },
      timeframe: '1Day',
      start: '2024-01-01',
      end: '2026-07-05',
      adjustment: 'split'
    };

    const response = await request(app).post('/api/market-data/history/download').send(body);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        symbol: 'BIO',
        timestamp: '2026-07-01T00:00:00Z',
        open: 100,
        high: 102,
        low: 99,
        close: 101,
        volume: 123456
      }
    ]);
  });

  it('returns 400 when the download request is invalid', async () => {
    const response = await request(app).post('/api/market-data/history/download').send({
      ticker: { symbol: 'BIO' },
      timeframe: '1Day',
      start: '2026-07-05',
      end: '2024-01-01'
    });

    expect(response.status).toBe(400);
    expect(response.text).toContain('start must be before end');
  });
});
