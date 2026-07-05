import type {
  DownloadHistoryRequest,
  MarketDataClientPort
} from '../../application/ports/market-data-client.port.js';
import type { PriceCandle } from '../../domain/price-candle.js';
import { AppError } from '../../../../shared/errors.js';
import { alpacaBarsResponseSchema } from './alpaca-bars-response.schema.js';
import { mapAlpacaBarsToPriceCandles } from './alpaca-bars.mapper.js';

export class AlpacaMarketDataClient implements MarketDataClientPort {
  constructor(
    private readonly baseUrl: string,
    private readonly apiKey: string,
    private readonly apiSecret: string,
    private readonly defaultFeed: DownloadHistoryRequest['feed'] = 'iex'
  ) {}

  async downloadHistory(request: DownloadHistoryRequest): Promise<PriceCandle[]> {
    const symbol: string = request.ticker.symbol;
    const candles: PriceCandle[] = [];
    let pageToken: string | undefined;

    do {
      const response: globalThis.Response = await fetch(this.buildBarsUrl(request, pageToken), {
        headers: {
          'APCA-API-KEY-ID': this.apiKey,
          'APCA-API-SECRET-KEY': this.apiSecret
        }
      });

      if (!response.ok) {
        const errorBody: string = await response.text();

        throw new AppError(
          `Alpaca market data request failed: ${response.status} - ${errorBody}`,
          response.status
        );
      }

      const rawBody: unknown = await response.json();
      const parsed = alpacaBarsResponseSchema.parse(rawBody);

      candles.push(...mapAlpacaBarsToPriceCandles(symbol, parsed.bars[symbol] ?? []));
      pageToken = parsed.next_page_token ?? undefined;
    } while (pageToken !== undefined);

    return candles;
  }

  private buildBarsUrl(request: DownloadHistoryRequest, pageToken?: string): string {
    const url = new URL('/v2/stocks/bars', this.baseUrl);

    url.searchParams.set('symbols', request.ticker.symbol);
    url.searchParams.set('timeframe', request.timeframe);
    url.searchParams.set('start', request.start);
    url.searchParams.set('end', request.end);
    url.searchParams.set('feed', request.feed ?? this.defaultFeed ?? 'iex');
    url.searchParams.set('adjustment', request.adjustment ?? 'raw');
    url.searchParams.set('limit', '10000');

    if (pageToken !== undefined) {
      url.searchParams.set('page_token', pageToken);
    }

    return url.toString();
  }
}
