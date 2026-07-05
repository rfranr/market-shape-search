import { describe, expect, it } from 'vitest';
import type { Config } from '../../../shared/config.js';
import { AlpacaMarketDataClient } from './alpaca/alpaca-market-data.client.js';
import { FakeMarketDataClient } from './fake-market-data.client.js';
import { createMarketDataClient } from './market-data-client.factory.js';

const baseConfig: Config = {
  port: 3001,
  frontendOrigin: 'http://localhost:3000',
  fastApiBaseUrl: 'http://localhost:8000',
  marketDataProvider: 'fake',
  alpaca: {
    baseUrl: 'https://data.alpaca.markets',
    apiKey: undefined,
    apiSecret: undefined
  }
};

describe('createMarketDataClient', () => {
  it('creates the fake market data client', () => {
    const client = createMarketDataClient(baseConfig);

    expect(client).toBeInstanceOf(FakeMarketDataClient);
  });

  it('creates the Alpaca market data client when credentials are configured', () => {
    const client = createMarketDataClient({
      ...baseConfig,
      marketDataProvider: 'alpaca',
      alpaca: {
        baseUrl: 'https://data.alpaca.markets',
        apiKey: 'key',
        apiSecret: 'secret'
      }
    });

    expect(client).toBeInstanceOf(AlpacaMarketDataClient);
  });

  it('fails clearly when Alpaca credentials are missing', () => {
    expect(() =>
      createMarketDataClient({
        ...baseConfig,
        marketDataProvider: 'alpaca'
      })
    ).toThrow('Missing Alpaca credentials. Set ALPACA_API_KEY and ALPACA_API_SECRET.');
  });
});
