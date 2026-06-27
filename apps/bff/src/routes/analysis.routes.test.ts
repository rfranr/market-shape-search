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
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:8000/dtw', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
  });

  it('preserves the current error path when FastAPI rejects a DTW request', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('unavailable', { status: 503 }));
    vi.stubGlobal('fetch', fetchMock);

    const response = await request(app).post('/api/dtw').send({ seriesA: [], seriesB: [] });

    expect(response.status).toBe(503);
    expect(response.text).toContain('HTTP request failed: 503');
  });
});
