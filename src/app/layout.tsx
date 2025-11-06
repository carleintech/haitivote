import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TechKlein VoteLive – Sondaj Ayiti Global',
  description: 'Global Haitian pre-election poll platform. Vote securely from anywhere in the world.',
  keywords: ['Haiti', 'election', 'vote', 'poll', 'sondaj', 'TechKlein'],
  authors: [{ name: 'TechKlein' }],
  openGraph: {
    title: 'TechKlein VoteLive – Sondaj Ayiti Global',
    description: 'Global Haitian pre-election poll platform',
    type: 'website',
    locale: 'ht_HT',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechKlein VoteLive',
    description: 'Global Haitian pre-election poll',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ht">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
