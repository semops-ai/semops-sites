import type { Metadata } from 'next';
import { DM_Sans, JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';
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

const matech = localFont({
  src: [
    { path: '../../../../packages/fonts/woff2/Matech-Light.woff2', weight: '300', style: 'normal' },
    { path: '../../../../packages/fonts/woff2/Matech.woff2', weight: '400', style: 'normal' },
    { path: '../../../../packages/fonts/woff2/Matech-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: '../../../../packages/fonts/woff2/Matech-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../../../../packages/fonts/woff2/Matech-ExtraBold.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-matech',
  display: 'swap',
});

const monomials = localFont({
  src: '../../../../packages/fonts/woff2/Monomials.woff2',
  variable: '--font-monomials',
  display: 'swap',
});

const classicaMotion = localFont({
  src: [
    { path: '../../../../packages/fonts/woff2/ClassicaMotion-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../../../packages/fonts/woff2/ClassicaMotion-Italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-classica',
  display: 'swap',
});

const featuristic = localFont({
  src: '../../../../packages/fonts/woff2/FEATURISTIC.woff2',
  variable: '--font-featuristic',
  display: 'swap',
});

const trackerClock = localFont({
  src: '../../../../packages/fonts/woff2/TrackerClock-Regular.woff2',
  variable: '--font-tracker',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'SemOps | Semantic Operations Framework',
    template: '%s | SemOps',
  },
  description:
    'A framework for Strategic Data, Explicit Architecture, and Semantic Optimization. Building better AI products through principled system design.',
  keywords: [
    'SemOps',
    'Semantic Operations',
    'AI Framework',
    'Strategic Data',
    'Explicit Architecture',
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
      'Strategic Data, Explicit Architecture, and Semantic Optimization.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SemOps | Semantic Operations Framework',
    description:
      'Strategic Data, Explicit Architecture, and Semantic Optimization.',
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
    <html lang="en" className={`${dmSans.variable} ${jetbrainsMono.variable} ${matech.variable} ${monomials.variable} ${classicaMotion.variable} ${featuristic.variable} ${trackerClock.variable}`}>
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
