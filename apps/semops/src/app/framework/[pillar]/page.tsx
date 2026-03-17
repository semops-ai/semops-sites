import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPage } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxOptions, mdxComponents } from '@/lib/mdx-components';
import { BackLink } from '@/components/back-link';

const VALID_SLUGS = [
  'strategic-data',
  'explicit-architecture',
  'semantic-optimization',
  'semantic-funnel',
  'what-is-semops',
  'why-semops',
] as const;

type ValidSlug = (typeof VALID_SLUGS)[number];

export async function generateStaticParams() {
  return VALID_SLUGS.map((pillar) => ({ pillar }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pillar: string }>;
}): Promise<Metadata> {
  const { pillar } = await params;

  if (!VALID_SLUGS.includes(pillar as ValidSlug)) {
    return { title: 'Not Found' };
  }

  const page = await getPage(pillar);

  if (!page) {
    return { title: 'Framework' };
  }

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
    },
  };
}

export default async function PillarPage({
  params,
}: {
  params: Promise<{ pillar: string }>;
}) {
  const { pillar } = await params;

  if (!VALID_SLUGS.includes(pillar as ValidSlug)) {
    notFound();
  }

  const page = await getPage(pillar);

  if (!page) {
    notFound();
  }

  return (
    <article className="container animate-fade-in">
      <div className="py-8 md:py-12 prose-container">
        <BackLink href="/framework">Back to Framework</BackLink>

        <div className="prose-content space-y-5 text-foreground">
          <MDXRemote
            source={page.content}
            options={mdxOptions}
            components={mdxComponents}
          />
        </div>
      </div>
    </article>
  );
}
