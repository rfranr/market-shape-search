import type { SimilarityResult, RunDtwAnalysisRequest } from '../domain/similarity-result.js';
import type { DtwApiClientPort } from './ports/dtw-api-client.port.js';

class NotImplementedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotImplementedError';
  }
}

export class RunDtwAnalysisUseCase {
  constructor(private readonly dtwApiClient: DtwApiClientPort) {}

  async execute(_request: RunDtwAnalysisRequest): Promise<SimilarityResult[]> {
    void this.dtwApiClient;
    throw new NotImplementedError('DTW similarity analysis orchestration is not implemented yet.');
  }
}
