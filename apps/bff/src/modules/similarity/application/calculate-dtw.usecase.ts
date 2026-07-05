import type { DtwRequest, DtwResponse } from '@repo/shared-types';
import type { DtwApiClientPort } from './ports/dtw-api-client.port.js';

export class CalculateDtwUseCase {
  constructor(private readonly dtwApiClient: DtwApiClientPort) {}

  async execute(request: DtwRequest): Promise<DtwResponse> {
    return this.dtwApiClient.calculateDistance(request);
  }
}
