import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost, getAllPostSlugs } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArrowLeft } from 'lucide-react';
import { mdxOptions, mdxComponents } from '@/lib/mdx-components';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <article className="container animate-fade-in">
      <div className="py-8 md:py-12 prose-container">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors no-underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to writing
        </Link>

        {/* Article header */}
        <header className="mb-8">
          <span className="tag mb-3">{post.category}</span>
          <h1 className="mb-2">{post.title}</h1>
          <time className="meta">{formattedDate}</time>
        </header>

        {/* Article content */}
        <div className="prose-content space-y-5 text-foreground">
          <MDXRemote
            source={post.content}
            options={mdxOptions}
            components={mdxComponents}
          />
        </div>
      </div>
    </article>
  );
}
