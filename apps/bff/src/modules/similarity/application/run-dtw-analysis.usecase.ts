import type { SimilarityResult, RunDtwAnalysisRequest } from '../domain/similarity-result.js';
import { NotImplementedError } from '../../../shared/errors.js';
import type { DtwApiClientPort } from './ports/dtw-api-client.port.js';

export class RunDtwAnalysisUseCase {
  constructor(private readonly dtwApiClient: DtwApiClientPort) {}

  async execute(_request: RunDtwAnalysisRequest): Promise<SimilarityResult[]> {
    void this.dtwApiClient;
    throw new NotImplementedError('DTW similarity analysis orchestration is not implemented yet.');
  }
}
