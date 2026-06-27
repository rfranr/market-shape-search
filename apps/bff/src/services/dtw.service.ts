import type { DtwRequest, DtwResponse } from '@repo/shared-types';

const dtwApiUrl: string = process.env.DTW_API_URL ?? 'http://localhost:8000';

export async function calculateDtw(body: DtwRequest): Promise<DtwResponse> {
  const dtwResponse: globalThis.Response = await fetch(`${dtwApiUrl}/dtw`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!dtwResponse.ok) {
    throw new Error(`Backend DTW error: ${dtwResponse.status}`);
  }

  return (await dtwResponse.json()) as DtwResponse;
}
