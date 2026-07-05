import type { DtwRequest, DtwResponse } from '@repo/shared-types';
import type { DtwApiClientPort } from '../application/ports/dtw-api-client.port.js';
import { HttpClient } from '../../../shared/http-client.js';

export class DtwApiClient implements DtwApiClientPort {
  private readonly httpClient: HttpClient;

  constructor(baseUrl: string) {
    this.httpClient = new HttpClient(baseUrl);
  }

  async calculateDistance(request: DtwRequest): Promise<DtwResponse> {
    return this.httpClient.post<DtwResponse, DtwRequest>('/dtw', request);
  }
}
