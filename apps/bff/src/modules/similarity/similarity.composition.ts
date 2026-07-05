import { config } from '../../shared/config.js';
import { CalculateDtwUseCase } from './application/calculate-dtw.usecase.js';
import { DtwApiClient } from './infra/dtw-api.client.js';

export const calculateDtwUseCase: CalculateDtwUseCase = new CalculateDtwUseCase(
  new DtwApiClient(config.fastApiBaseUrl)
);
