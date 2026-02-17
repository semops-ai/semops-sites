import type { Metadata } from 'next';
import { DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'SemOps | Semantic Operations Framework',
    template: '%s | SemOps',
  },
  description:
    'A framework for Strategic Data, Symbiotic Architecture, and Semantic Optimization. Building better AI products through principled system design.',
  keywords: [
    'SemOps',
    'Semantic Operations',
    'AI Framework',
    'Strategic Data',
    'Symbiotic Architecture',
    'Semantic Optimization',
    'AI Product Development',
  ],
  authors: [{ name: 'Tim Mitchell' }],
  creator: 'SemOps',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://semops.ai',
    siteName: 'SemOps',
    title: 'SemOps | Semantic Operations Framework',
    description:
      'Strategic Data, Symbiotic Architecture, and Semantic Optimization.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SemOps | Semantic Operations Framework',
    description:
      'Strategic Data, Symbiotic Architecture, and Semantic Optimization.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body>
        <div className="min-h-screen flex flex-col">
          <Nav />
          <main className="flex-1 pt-16 md:pt-20">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
