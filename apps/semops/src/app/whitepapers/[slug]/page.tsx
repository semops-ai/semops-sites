import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getWhitepaper, getAllWhitepaperSlugs } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArrowLeft, Download } from 'lucide-react';
import { mdxOptions, mdxComponents } from '@/lib/mdx-components';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllWhitepaperSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const whitepaper = await getWhitepaper(slug);

  if (!whitepaper) {
    return {
      title: 'Whitepaper Not Found',
    };
  }

  return {
    title: whitepaper.title,
    description: whitepaper.description,
    authors: [{ name: whitepaper.author }],
    openGraph: {
      title: whitepaper.title,
      description: whitepaper.description,
      type: 'article',
      publishedTime: whitepaper.date,
      authors: [whitepaper.author],
      tags: whitepaper.tags,
    },
  };
}

export default async function WhitepaperPage({ params }: Props) {
  const { slug } = await params;
  const whitepaper = await getWhitepaper(slug);

  if (!whitepaper) {
    notFound();
  }

  const formattedDate = new Date(whitepaper.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <article className="container animate-fade-in">
      <div className="py-8 md:py-12 prose-container">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors no-underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        {/* Article header */}
        <header className="mb-8 max-w-[720px]">
          <div className="flex items-center gap-3 mb-3">
            <span className="tag">Whitepaper</span>
            {whitepaper.version && (
              <span className="text-xs text-muted-foreground">
                {whitepaper.version}
              </span>
            )}
          </div>
          <h1 className="mb-2">{whitepaper.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{whitepaper.author}</span>
            <span>·</span>
            <time>{formattedDate}</time>
          </div>
        </header>

        {/* Abstract */}
        {whitepaper.abstract && (
          <div className="bg-muted/50 border rounded-lg p-6 mb-8 max-w-[720px]">
            <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-3">
              Abstract
            </h2>
            <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
              {whitepaper.abstract}
            </p>
          </div>
        )}

        {/* PDF download button - placeholder for now */}
        <div className="mb-8 max-w-[720px]">
          <button
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            disabled
            title="PDF download coming soon"
          >
            <Download className="w-4 h-4" />
            Download PDF (Coming Soon)
          </button>
        </div>

        {/* Article content */}
        <div className="prose-content space-y-5 text-foreground">
          <MDXRemote
            source={whitepaper.content}
            options={mdxOptions}
            components={mdxComponents}
          />
        </div>

        {/* Tags */}
        {whitepaper.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-wrap gap-2">
              {whitepaper.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-muted rounded-md text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
