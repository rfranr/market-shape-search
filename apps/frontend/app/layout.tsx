import type { Metadata } from 'next';
import './styles.css';

export const metadata: Metadata = {
  title: 'HelloWorld Monorepo',
  description: 'Frontend Next.js + BFF Node + Backend DTW Python'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ca">
      <body>{children}</body>
    </html>
  );
}
