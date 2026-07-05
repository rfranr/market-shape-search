import type { DtwRequest, DtwResponse } from '@repo/shared-types';

export interface DtwApiClientPort {
  calculateDistance(request: DtwRequest): Promise<DtwResponse>;
}
