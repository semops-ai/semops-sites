import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPage } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxOptions, mdxComponents } from '@/lib/mdx-components';
import { BackLink } from '@/components/back-link';

const VALID_SLUGS = [
  'how-i-got-here',
] as const;

type ValidSlug = (typeof VALID_SLUGS)[number];

export async function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (!VALID_SLUGS.includes(slug as ValidSlug)) {
    return { title: 'Not Found' };
  }

  const page = await getPage(slug);

  if (!page) {
    return { title: 'About' };
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

export default async function AboutSpokePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!VALID_SLUGS.includes(slug as ValidSlug)) {
    notFound();
  }

  const page = await getPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <article className="container animate-fade-in">
      <div className="py-8 md:py-12 prose-container">
        <BackLink href="/about">Back to About</BackLink>

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
