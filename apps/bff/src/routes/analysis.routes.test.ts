import request from 'supertest';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { app } from '../app.js';

describe('analysis routes', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('forwards DTW requests to FastAPI and returns its JSON response', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ distance: 3 }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    );
    vi.stubGlobal('fetch', fetchMock);

    const body = { seriesA: [1, 2], seriesB: [2, 3] };
    const response = await request(app).post('/api/dtw').send(body);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ distance: 3 });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:8000/dtw',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: expect.any(AbortSignal)
      })
    );
  });

  it('preserves the current error path when FastAPI rejects a DTW request', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('unavailable', { status: 503 }));
    vi.stubGlobal('fetch', fetchMock);

    const response = await request(app).post('/api/dtw').send({ seriesA: [1], seriesB: [2] });

    expect(response.status).toBe(503);
    expect(response.body).toEqual({
      error: 'AppError',
      message: 'HTTP request failed: 503'
    });
  });

  it('returns 400 when the DTW request is invalid', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const response = await request(app).post('/api/dtw').send({ seriesA: [], seriesB: [] });

    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
