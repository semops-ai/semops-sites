import type { Metadata } from 'next';
import { CareerTimeline } from '@/components/career-timeline';

// Force dynamic rendering since we fetch from Supabase
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Career',
  description:
    'Tim Mitchell career timeline: Microsoft, Amazon, Roku - Product leadership across enterprise communications, digital media, and streaming platforms.',
};

// Schema.org structured data for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Tim Mitchell',
  jobTitle: 'Product Leader & AI Strategist',
  url: 'https://timjmitchell.com',
  sameAs: ['https://linkedin.com/in/timjmitchell'],
  hasOccupation: [
    {
      '@type': 'Occupation',
      name: 'Group Principal Product Manager, Technical',
      occupationalCategory: 'Product Management',
      occupationLocation: {
        '@type': 'Place',
        name: 'Seattle, WA',
      },
      employmentType: 'Full-time',
      employer: {
        '@type': 'Organization',
        name: 'Microsoft',
        url: 'https://microsoft.com',
      },
    },
    {
      '@type': 'Occupation',
      name: 'Principal Product Manager, Technical',
      occupationalCategory: 'Product Management',
      occupationLocation: {
        '@type': 'Place',
        name: 'Seattle, WA',
      },
      employmentType: 'Full-time',
      employer: {
        '@type': 'Organization',
        name: 'Amazon',
        url: 'https://amazon.com',
      },
    },
    {
      '@type': 'Occupation',
      name: 'Director of Product Marketing',
      occupationalCategory: 'Product Marketing',
      occupationLocation: {
        '@type': 'Place',
        name: 'Los Gatos, CA',
      },
      employmentType: 'Full-time',
      employer: {
        '@type': 'Organization',
        name: 'Roku',
        url: 'https://roku.com',
      },
    },
  ],
};

export default function CareerPage() {
  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <header className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Career Timeline
            </h1>
            <p className="text-lg text-muted-foreground">
              Product leadership journey across enterprise communications,
              digital media, and streaming platforms. Click any position to see
              details.
            </p>
          </header>

          <CareerTimeline />
        </div>
      </div>
    </>
  );
}
