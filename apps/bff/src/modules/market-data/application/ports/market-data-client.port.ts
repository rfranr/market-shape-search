import type { PriceCandle } from '../../domain/price-candle.js';
import type { Ticker } from '../../domain/ticker.js';

export type MarketDataTimeframe = '1Min' | '5Min' | '15Min' | '1Hour' | '1Day' | '1Week';

export type MarketDataAdjustment = 'raw' | 'split' | 'dividend' | 'all';

export interface DownloadHistoryRequest {
  ticker: Ticker;
  timeframe: MarketDataTimeframe;
  start: string;
  end: string;
  adjustment?: MarketDataAdjustment;
}

export interface MarketDataClientPort {
  downloadHistory(request: DownloadHistoryRequest): Promise<PriceCandle[]>;
}
