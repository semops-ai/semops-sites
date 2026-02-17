import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Essays, observations, and working notes on product, AI, and data.',
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="container animate-fade-in">
      <section className="py-8 md:py-12 max-w-[720px] mx-auto">
        <h1 className="mb-4">Writing</h1>
        <p className="text-muted-foreground">
          Essays, observations, and working notes on product, AI, and data.
        </p>
      </section>

      <section className="max-w-[720px] mx-auto pb-12">
        {posts.length === 0 ? (
          <p className="text-muted-foreground text-center py-16">
            No posts yet. Check back soon!
          </p>
        ) : (
          <div className="divide-y divide-border">
            {posts.map((post) => {
              const formattedDate = new Date(post.date).toLocaleDateString(
                'en-US',
                { month: 'short', year: 'numeric' }
              );

              return (
                <article key={post.slug} className="group py-5 first:pt-0">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block no-underline"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        {post.category && (
                          <span className="tag mb-2">{post.category}</span>
                        )}
                        <h3 className="text-base font-medium text-foreground group-hover:text-secondary transition-colors mb-1">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                      <time className="text-sm text-muted-foreground shrink-0 tabular-nums">
                        {formattedDate}
                      </time>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
