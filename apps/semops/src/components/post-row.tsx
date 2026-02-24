import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PostRowProps {
 post: {
 slug: string;
 title: string;
 excerpt: string;
 date: string;
 category?: string;
 };
 /** Override the default /blog/[slug] href */
 href?: string;
 /** Show the category tag */
 showCategory?: boolean;
 /** Excerpt truncation: 1 or 2 lines */
 excerptLines?: 1 | 2;
}

export function PostRow({
 post,
 href,
 showCategory = false,
 excerptLines = 2,
}: PostRowProps) {
 const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
 month: 'short',
 year: 'numeric',
 });

 return (
 <Link
 href={href ?? `/blog/${post.slug}`}
 className="group block no-underline rounded-lg -mx-3 px-3 py-3 hover:bg-foreground/5 active:bg-foreground/10 transition-colors"
 >
 <div className="flex items-start justify-between gap-4">
 <div className="flex-1 min-w-0">
 {showCategory && post.category && (
 <span className="tag mb-2">{post.category}</span>
 )}
 <h3 className="text-base font-medium text-foreground group-hover:text-secondary transition-colors">
 {post.title}
 </h3>
 <p
 className={cn(
 'text-sm text-muted-foreground mt-1',
 excerptLines === 1 ? 'line-clamp-1' : 'line-clamp-2'
 )}
 >
 {post.excerpt}
 </p>
 </div>
 <time className="text-sm text-muted-foreground shrink-0 tabular-nums">
 {formattedDate}
 </time>
 </div>
 </Link>
 );
}
