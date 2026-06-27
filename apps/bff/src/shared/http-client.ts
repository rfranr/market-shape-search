import { AppError } from './errors.js';

export interface HttpRequestOptions<TBody = unknown> {
  method?: string;
  headers?: Record<string, string>;
  body?: TBody;
}

export class HttpClient {
  constructor(private readonly baseUrl: string) {}

  async request<TResponse, TBody = unknown>(path: string, options: HttpRequestOptions<TBody> = {}): Promise<TResponse> {
    const response: globalThis.Response = await fetch(`${this.baseUrl}${path}`, {
      method: options.method,
      headers: options.headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body)
    });

    if (!response.ok) {
      throw new AppError(`HTTP request failed: ${response.status}`, response.status);
    }

    return (await response.json()) as TResponse;
  }

  async post<TResponse, TBody = unknown>(path: string, body: TBody): Promise<TResponse> {
    return this.request<TResponse, TBody>(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    });
  }
}
