export interface AppConfig {
  fastApiBaseUrl: string;
}

export const appConfig: AppConfig = {
  fastApiBaseUrl: process.env.DTW_API_URL ?? 'http://localhost:8000'
};
