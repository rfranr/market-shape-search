import type { DtwRequest, DtwResponse } from '@repo/shared-types';
import type { DtwApiClientPort } from '../modules/similarity/application/ports/dtw-api-client.port.js';
import { config } from '../shared/config.js';
import { DtwApiClient } from '../modules/similarity/infra/dtw-api.client.js';

const dtwApiClient: DtwApiClientPort = new DtwApiClient(config.fastApiBaseUrl);

export async function calculateDtw(body: DtwRequest): Promise<DtwResponse> {
  return dtwApiClient.calculateDistance(body);
}
