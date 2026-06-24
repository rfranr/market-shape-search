export type HelloResponse = {
  message: string;
  source: 'frontend' | 'bff' | 'backend-dtw';
};

export type DtwRequest = {
  seriesA: number[];
  seriesB: number[];
};

export type DtwResponse = {
  distance: number;
};
