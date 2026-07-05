import type { Config } from '../../../shared/config.js';
import type { MarketDataClientPort } from '../application/ports/market-data-client.port.js';
import { AlpacaMarketDataClient } from './alpaca/alpaca-market-data.client.js';
import { FakeMarketDataClient } from './fake-market-data.client.js';

export function createMarketDataClient(config: Config): MarketDataClientPort {
  if (config.marketDataProvider === 'fake') {
    return new FakeMarketDataClient();
  }

  if (config.marketDataProvider === 'alpaca') {
    if (config.alpaca.apiKey === undefined || config.alpaca.apiSecret === undefined) {
      throw new Error('Missing Alpaca credentials. Set ALPACA_API_KEY and ALPACA_API_SECRET.');
    }

    return new AlpacaMarketDataClient(
      config.alpaca.baseUrl,
      config.alpaca.apiKey,
      config.alpaca.apiSecret,
      config.alpaca.feed
    );
  }

  const exhaustiveCheck: never = config.marketDataProvider;
  throw new Error(`Unsupported market data provider: ${exhaustiveCheck}`);
}
