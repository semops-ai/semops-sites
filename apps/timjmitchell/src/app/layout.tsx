import type { Metadata } from 'next';
import { Inter, Lora, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { GoogleAnalytics } from '@/components/google-analytics';

const inter = Inter({
 subsets: ['latin'],
 variable: '--font-sans',
 display: 'swap',
});

const lora = Lora({
 subsets: ['latin'],
 variable: '--font-serif',
 display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
 subsets: ['latin'],
 variable: '--font-display',
 display: 'swap',
});

export const metadata: Metadata = {
 title: {
 default: 'Tim Mitchell | Product Leader & Builder',
 template: '%s | Tim Mitchell',
 },
 description:
 'Product leadership, AI/data strategy, and the SemOps methodology. 20+ years building products at Microsoft, Amazon, and Roku.',
 keywords: [
 'Tim Mitchell',
 'Product Management',
 'AI Strategy',
 'SemOps',
 'Semantic Operations',
 'Data Strategy',
 'Microsoft',
 'Amazon',
 'Roku',
 ],
 authors: [{ name: 'Tim Mitchell' }],
 creator: 'Tim Mitchell',
 openGraph: {
 type: 'website',
 locale: 'en_US',
 url: 'https://timjmitchell.com',
 siteName: 'Tim Mitchell',
 title: 'Tim Mitchell | Product Leader & Builder',
 description:
 'Product leadership, AI/data strategy, and the SemOps methodology.',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Tim Mitchell | Product Leader & Builder',
 description:
 'Product leadership, AI/data strategy, and the SemOps methodology.',
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
 <html
 lang="en"
 className={`${inter.variable} ${lora.variable} ${plusJakarta.variable}`}
 >
 <GoogleAnalytics />
 <body className="min-h-screen bg-background text-foreground antialiased font-sans">
 <div className="min-h-screen flex flex-col">
 <Nav />
 <main className="flex-1 pt-[74px] md:pt-[82px]">{children}</main>
 <Footer />
 </div>

 {/* Dev viewport indicator */}
 {process.env.NODE_ENV === 'development' && (
 <div className="fixed bottom-4 right-4 bg-black text-white text-xs px-2 py-1 rounded z-50 font-mono">
 <span className="sm:hidden">XS</span>
 <span className="hidden sm:inline md:hidden">SM</span>
 <span className="hidden md:inline lg:hidden">MD</span>
 <span className="hidden lg:inline xl:hidden">LG</span>
 <span className="hidden xl:inline 2xl:hidden">XL</span>
 <span className="hidden 2xl:inline">2XL</span>
 </div>
 )}
 </body>
 </html>
 );
}
