import type { DtwRequest, DtwResponse } from '@repo/shared-types';
import { appConfig } from '../config.js';
import { DtwApiClient } from '../modules/similarity/infra/dtw-api.client.js';

const dtwApiClient: DtwApiClient = new DtwApiClient(appConfig.fastApiBaseUrl);

export async function calculateDtw(body: DtwRequest): Promise<DtwResponse> {
  return dtwApiClient.calculateDistance(body);
}
