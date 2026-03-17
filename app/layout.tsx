import type { Metadata } from 'next';
import '../styles/globals.css';
import Cursor from '../components/Cursor';

export const metadata: Metadata = {
  title: 'Clarence Keith — Founder, Artist, Builder',
  description: 'Designer, founder, and builder working at the intersection of AI, design, and culture. Creator of Nalana, the voice-controlled 3D design tool.',
  openGraph: {
    title: 'Clarence Keith',
    description: 'Designer, founder, and builder at the intersection of AI, design, and culture.',
    url: 'https://clarencekeith.com',
    siteName: 'Clarence Keith',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clarence Keith',
    description: 'Designer, founder, and builder at the intersection of AI, design, and culture.',
    images: ['/images/og-image.jpg'],
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Cursor />
        {children}
      </body>
    </html>
  );
}
