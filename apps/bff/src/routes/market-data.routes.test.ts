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
      },
      {
        symbol: 'BIO',
        timestamp: '2026-07-02T00:00:00Z',
        open: 101,
        high: 103,
        low: 100,
        close: 102,
        volume: 234567
      },
      {
        symbol: 'BIO',
        timestamp: '2026-07-03T00:00:00Z',
        open: 102,
        high: 104,
        low: 101,
        close: 103,
        volume: 345678
      }
    ]);
  });

  it('returns 400 when dates are invalid', async () => {
    const response = await request(app).post('/api/market-data/history/download').send({
      ticker: { symbol: 'BIO' },
      timeframe: '1Day',
      start: '2026-07-05',
      end: '2024-01-01'
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'BadRequestError',
      message: 'start must be before end'
    });
  });

  it('returns 400 when symbol is empty', async () => {
    const response = await request(app).post('/api/market-data/history/download').send({
      ticker: { symbol: '' },
      timeframe: '1Day',
      start: '2024-01-01',
      end: '2026-07-05'
    });

    expect(response.status).toBe(400);
  });

  it('returns 400 when timeframe is invalid', async () => {
    const response = await request(app).post('/api/market-data/history/download').send({
      ticker: { symbol: 'BIO' },
      timeframe: '1Month',
      start: '2024-01-01',
      end: '2026-07-05'
    });

    expect(response.status).toBe(400);
  });

  it('returns 400 when dates are not YYYY-MM-DD', async () => {
    const response = await request(app).post('/api/market-data/history/download').send({
      ticker: { symbol: 'BIO' },
      timeframe: '1Day',
      start: '2024-01-01T00:00:00Z',
      end: '2026-07-05T00:00:00Z'
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('Expected YYYY-MM-DD');
  });
});
