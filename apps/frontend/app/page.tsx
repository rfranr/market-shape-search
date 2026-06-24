import type { DtwResponse, HelloResponse } from '@repo/shared-types';

const bffUrl = process.env.BFF_URL ?? 'http://localhost:3001';

async function getHello(): Promise<HelloResponse> {
  const response = await fetch(`${bffUrl}/api/hello`, { cache: 'no-store' });
  return response.json();
}

async function getDtw(): Promise<DtwResponse> {
  const response = await fetch(`${bffUrl}/api/dtw`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ seriesA: [1, 2, 3], seriesB: [2, 2, 4] }),
    cache: 'no-store'
  });

  return response.json();
}

export default async function HomePage() {
  const [hello, dtw] = await Promise.all([getHello(), getDtw()]);

  return (
    <main className="page">
      <section className="card">
        <p className="eyebrow">Template monorepo</p>
        <h1>{hello.message}</h1>
        <p>Resposta generada per: {hello.source}</p>
        <div className="result">DTW demo: {dtw.distance}</div>
      </section>
    </main>
  );
}
