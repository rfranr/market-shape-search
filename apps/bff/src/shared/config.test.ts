import { afterEach, describe, expect, it, vi } from 'vitest';

describe('config', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it('uses safe defaults when env vars are not set', async () => {
    vi.stubEnv('PORT', undefined);
    vi.stubEnv('FRONTEND_ORIGIN', undefined);
    vi.stubEnv('DTW_API_URL', undefined);
    vi.resetModules();

    const { config } = await import('./config.js');

    expect(config).toEqual({
      port: 3001,
      frontendOrigin: 'http://localhost:3000',
      fastApiBaseUrl: 'http://localhost:8000'
    });
  });

  it('reads configured env vars', async () => {
    vi.stubEnv('PORT', '4001');
    vi.stubEnv('FRONTEND_ORIGIN', 'http://localhost:4000');
    vi.stubEnv('DTW_API_URL', 'http://localhost:9000');
    vi.resetModules();

    const { config } = await import('./config.js');

    expect(config).toEqual({
      port: 4001,
      frontendOrigin: 'http://localhost:4000',
      fastApiBaseUrl: 'http://localhost:9000'
    });
  });
});
