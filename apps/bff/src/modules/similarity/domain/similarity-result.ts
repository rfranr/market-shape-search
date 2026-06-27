export type DtwAnalysisInterval = '1Min' | '5Min' | '15Min' | '1Hour' | '1Day';

export interface RunDtwAnalysisRequest {
  baseTicker: string;
  candidateTickers: string[];
  from: string;
  to: string;
  interval: DtwAnalysisInterval;
}

export interface SimilarityResult {
  ticker: string;
  distance: number;
  score: number;
  rank: number;
}
