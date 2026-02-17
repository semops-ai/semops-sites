import Link from 'next/link';
import { Calendar } from 'lucide-react';
import type { BlogPostMeta } from '@/types/blog';

interface BlogCardProps {
  post: BlogPostMeta;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  if (featured) {
    return (
      <article className="group">
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="border-2 border-border bg-card p-8 transition-shadow hover:shadow-md">
            <span className="tag mb-4">
              {post.category}
            </span>

            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3 group-hover:text-secondary transition-colors">
              {post.title}
            </h2>

            <p className="text-muted-foreground mb-6 line-clamp-2">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formattedDate}
              </span>
              {post.author && <span>by {post.author}</span>}
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group h-full">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="border-2 border-border bg-card p-5 transition-shadow hover:shadow-md h-full flex flex-col">
          <span className="tag mb-3">
            {post.category}
          </span>

          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-secondary transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </span>
            {post.tags.length > 0 && (
              <div className="flex gap-1">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-muted px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
