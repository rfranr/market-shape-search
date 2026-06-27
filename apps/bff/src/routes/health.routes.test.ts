import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../app.js';

describe('health routes', () => {
  it('returns the current BFF hello response', async () => {
    const response = await request(app).get('/api/hello');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'HelloWorld des del BFF 👋',
      source: 'bff'
    });
  });
});
