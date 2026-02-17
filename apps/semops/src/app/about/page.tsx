import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPage } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxOptions, mdxComponents } from '@/lib/mdx-components';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('what-is-semops');

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

export default async function AboutPage() {
  const page = await getPage('what-is-semops');

  if (!page) {
    notFound();
  }

  return (
    <article className="container animate-fade-in">
      <div className="py-8 md:py-12 prose-container">
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
