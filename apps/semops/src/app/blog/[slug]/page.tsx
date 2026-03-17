import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPost, getAllPostSlugs } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxOptions, mdxComponents } from '@/lib/mdx-components';
import { BackLink } from '@/components/back-link';

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
      ...(post.image && {
        images: [{ url: post.image, width: 1200, height: 630 }],
      }),
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
        <BackLink href="/blog">Back to writing</BackLink>

        {/* Article header */}
        <header className="mb-8">
          <span className="tag mb-3">{post.category}</span>
          <h1 className="mb-2">{post.title}</h1>
          <time className="meta">{formattedDate}</time>
        </header>

        {/* Hero image */}
        {post.image && (
          <div className="mb-8 -mx-3 sm:-mx-6 md:-mx-12 aspect-[1200/630] relative overflow-hidden rounded-lg">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

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
