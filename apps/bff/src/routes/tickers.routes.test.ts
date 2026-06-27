import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';
import { app } from '../app.js';

describe('ticker routes', () => {
  it('has no public ticker endpoints yet', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const response = await request(app).get('/api/tickers');

    expect(response.status).toBe(404);
    expect(fetchMock).not.toHaveBeenCalled();

    vi.unstubAllGlobals();
  });
});
