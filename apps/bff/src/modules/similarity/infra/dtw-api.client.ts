import type { DtwRequest, DtwResponse } from '@repo/shared-types';
import { HttpClient } from '../../../shared/http-client.js';

export class DtwApiClient {
  private readonly httpClient: HttpClient;

  constructor(baseUrl: string) {
    this.httpClient = new HttpClient(baseUrl);
  }

  async calculateDistance(request: DtwRequest): Promise<DtwResponse> {
    return this.httpClient.post<DtwResponse, DtwRequest>('/dtw', request);
  }
}
