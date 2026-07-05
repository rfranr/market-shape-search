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
    vi.stubEnv('MARKET_DATA_PROVIDER', undefined);
    vi.stubEnv('ALPACA_MARKET_DATA_BASE_URL', undefined);
    vi.stubEnv('ALPACA_MARKET_DATA_FEED', undefined);
    vi.stubEnv('ALPACA_API_KEY', undefined);
    vi.stubEnv('ALPACA_API_SECRET', undefined);
    vi.resetModules();

    const { config } = await import('./config.js');

    expect(config).toEqual({
      port: 3001,
      frontendOrigin: 'http://localhost:3000',
      fastApiBaseUrl: 'http://localhost:8000',
      marketDataProvider: 'fake',
      alpaca: {
        baseUrl: 'https://data.alpaca.markets',
        apiKey: undefined,
        apiSecret: undefined,
        feed: 'iex'
      }
    });
  });

  it('reads configured env vars', async () => {
    vi.stubEnv('PORT', '4001');
    vi.stubEnv('FRONTEND_ORIGIN', 'http://localhost:4000');
    vi.stubEnv('DTW_API_URL', 'http://localhost:9000');
    vi.stubEnv('MARKET_DATA_PROVIDER', 'alpaca');
    vi.stubEnv('ALPACA_MARKET_DATA_BASE_URL', 'https://example.alpaca.test');
    vi.stubEnv('ALPACA_MARKET_DATA_FEED', 'sip');
    vi.stubEnv('ALPACA_API_KEY', 'key');
    vi.stubEnv('ALPACA_API_SECRET', 'secret');
    vi.resetModules();

    const { config } = await import('./config.js');

    expect(config).toEqual({
      port: 4001,
      frontendOrigin: 'http://localhost:4000',
      fastApiBaseUrl: 'http://localhost:9000',
      marketDataProvider: 'alpaca',
      alpaca: {
        baseUrl: 'https://example.alpaca.test',
        apiKey: 'key',
        apiSecret: 'secret',
        feed: 'sip'
      }
    });
  });

  it('rejects unsupported market data providers', async () => {
    vi.stubEnv('MARKET_DATA_PROVIDER', 'yahoo');
    vi.resetModules();

    await expect(import('./config.js')).rejects.toThrow('Unsupported market data provider: yahoo');
  });

  it('rejects unsupported Alpaca market data feeds', async () => {
    vi.stubEnv('ALPACA_MARKET_DATA_FEED', 'unknown');
    vi.resetModules();

    await expect(import('./config.js')).rejects.toThrow('Unsupported Alpaca market data feed: unknown');
  });
});
