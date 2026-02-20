import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPage } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArrowLeft } from 'lucide-react';
import { mdxOptions, mdxComponents } from '@/lib/mdx-components';

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
        <Link
          href="/about"
          className="inline-flex items-center gap-1.5 text-sm text-label hover:text-secondary transition-colors no-underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to About
        </Link>

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
