import { afterEach, describe, expect, it, vi } from 'vitest';
import type { DownloadHistoryRequest } from '../../application/ports/market-data-client.port.js';
import { AlpacaMarketDataClient } from './alpaca-market-data.client.js';

const request: DownloadHistoryRequest = {
  ticker: { symbol: 'BIO', exchange: 'NYSE' },
  timeframe: '1Day',
  start: '2024-01-01',
  end: '2026-07-05',
  adjustment: 'split'
};

describe('AlpacaMarketDataClient', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('fetches Alpaca bars, validates the response and returns domain candles', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          bars: {
            BIO: [
              {
                t: '2026-07-01T00:00:00Z',
                o: 100,
                h: 102,
                l: 99,
                c: 101,
                v: 123456
              }
            ]
          },
          next_page_token: null
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    );
    vi.stubGlobal('fetch', fetchMock);
    const client = new AlpacaMarketDataClient('https://data.alpaca.markets', 'key', 'secret');

    const candles = await client.downloadHistory(request);

    expect(candles).toEqual([
      {
        symbol: 'BIO',
        timestamp: '2026-07-01T00:00:00Z',
        open: 100,
        high: 102,
        low: 99,
        close: 101,
        volume: 123456
      }
    ]);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://data.alpaca.markets/v2/stocks/bars?symbols=BIO&timeframe=1Day&start=2024-01-01&end=2026-07-05&adjustment=split&limit=10000',
      {
        headers: {
          'APCA-API-KEY-ID': 'key',
          'APCA-API-SECRET-KEY': 'secret'
        }
      }
    );
  });

  it('follows Alpaca next_page_token pagination', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            bars: {
              BIO: [{ t: '2026-07-01T00:00:00Z', o: 100, h: 102, l: 99, c: 101, v: 123456 }]
            },
            next_page_token: 'next-page'
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        )
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            bars: {
              BIO: [{ t: '2026-07-02T00:00:00Z', o: 101, h: 103, l: 100, c: 102, v: 234567 }]
            },
            next_page_token: null
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        )
      );
    vi.stubGlobal('fetch', fetchMock);
    const client = new AlpacaMarketDataClient('https://data.alpaca.markets', 'key', 'secret');

    const candles = await client.downloadHistory(request);

    expect(candles).toHaveLength(2);
    expect(candles.map((candle) => candle.timestamp)).toEqual(['2026-07-01T00:00:00Z', '2026-07-02T00:00:00Z']);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[1]?.[0]).toBe(
      'https://data.alpaca.markets/v2/stocks/bars?symbols=BIO&timeframe=1Day&start=2024-01-01&end=2026-07-05&adjustment=split&limit=10000&page_token=next-page'
    );
  });
});
