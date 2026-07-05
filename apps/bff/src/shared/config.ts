import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { config as loadDotenv } from 'dotenv';

if (process.env.NODE_ENV !== 'test') {
  loadDotenv({ path: resolve(dirname(fileURLToPath(import.meta.url)), '../../.env') });
}

export type MarketDataProvider = 'fake' | 'alpaca';

export type AlpacaMarketDataFeed = 'iex' | 'sip' | 'otc';

export interface Config {
  port: number;
  frontendOrigin: string;
  fastApiBaseUrl: string;
  marketDataProvider: MarketDataProvider;
  alpaca: {
    baseUrl: string;
    apiKey?: string;
    apiSecret?: string;
    feed: AlpacaMarketDataFeed;
  };
}

function readNumber(value: string | undefined, fallback: number): number {
  if (value === undefined) {
    return fallback;
  }

  const parsed: number = Number(value);

  return Number.isNaN(parsed) ? fallback : parsed;
}

function readOptionalString(value: string | undefined): string | undefined {
  return value === undefined || value.trim() === '' ? undefined : value;
}

function readMarketDataProvider(value: string | undefined): MarketDataProvider {
  if (value === undefined || value.trim() === '') {
    return 'fake';
  }

  if (value === 'fake' || value === 'alpaca') {
    return value;
  }

  throw new Error(`Unsupported market data provider: ${value}`);
}

function readAlpacaFeed(value: string | undefined): AlpacaMarketDataFeed {
  if (value === undefined || value.trim() === '') {
    return 'iex';
  }

  if (value === 'iex' || value === 'sip' || value === 'otc') {
    return value;
  }

  throw new Error(`Unsupported Alpaca market data feed: ${value}`);
}

export const config: Config = {
  port: readNumber(process.env.PORT, 3001),
  frontendOrigin: process.env.FRONTEND_ORIGIN ?? 'http://localhost:3000',
  fastApiBaseUrl: process.env.DTW_API_URL ?? 'http://localhost:8000',
  marketDataProvider: readMarketDataProvider(process.env.MARKET_DATA_PROVIDER),
  alpaca: {
    baseUrl: process.env.ALPACA_MARKET_DATA_BASE_URL ?? 'https://data.alpaca.markets',
    apiKey: readOptionalString(process.env.ALPACA_API_KEY),
    apiSecret: readOptionalString(process.env.ALPACA_API_SECRET),
    feed: readAlpacaFeed(process.env.ALPACA_MARKET_DATA_FEED)
  }
};
