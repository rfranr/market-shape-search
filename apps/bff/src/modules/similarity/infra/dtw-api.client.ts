import type { DtwRequest, DtwResponse } from '@repo/shared-types';

export class DtwApiClient {
  constructor(private readonly baseUrl: string) {}

  async calculateDistance(request: DtwRequest): Promise<DtwResponse> {
    const response: globalThis.Response = await fetch(`${this.baseUrl}/dtw`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      throw new Error(`Backend DTW error: ${response.status}`);
    }

    return (await response.json()) as DtwResponse;
  }
}
