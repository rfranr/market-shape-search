export interface Config {
  port: number;
  frontendOrigin: string;
  fastApiBaseUrl: string;
}

function readNumber(value: string | undefined, fallback: number): number {
  if (value === undefined) {
    return fallback;
  }

  const parsed: number = Number(value);

  return Number.isNaN(parsed) ? fallback : parsed;
}

export const config: Config = {
  port: readNumber(process.env.PORT, 3001),
  frontendOrigin: process.env.FRONTEND_ORIGIN ?? 'http://localhost:3000',
  fastApiBaseUrl: process.env.DTW_API_URL ?? 'http://localhost:8000'
};
