import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import { PostRow } from '@/components/post-row';

export const metadata: Metadata = {
 title: 'Blog',
 description:
 'Essays, observations, and half-ideas about SemOps, AI, data, tech, etc..',
};

export default async function BlogPage {
 const posts = await getAllPosts;

 if (posts.length === 0) {
 return (
 <div className="container animate-fade-in">
 <section className="py-8 md:py-12 max-w-[720px] mx-auto">
 <h1 className="mb-4">Writing</h1>
 <p className="text-muted-foreground">
 Essays, observations, and working notes on product, AI, and data.
 </p>
 <p className="text-muted-foreground text-center py-16">
 No posts yet. Check back soon!
 </p>
 </section>
 </div>
 );
 }

 // Featured post: first post with featured: true, or fallback to latest
 const featuredPost = posts.find((p) => p.featured) ?? posts[0];
 // Remaining posts (excluding featured)
 const remainingPosts = posts.filter((p) => p.slug !== featuredPost.slug);

 const formatDate = (date: string) =>
 new Date(date).toLocaleDateString('en-US', {
 month: 'short',
 year: 'numeric',
 });

 return (
 <div className="container animate-fade-in">
 <section className="py-8 md:py-12 max-w-[720px] mx-auto">
 <h1 className="mb-4">Writing</h1>
 <p className="text-muted-foreground mb-12">
 Essays, observations, and working notes on product, AI, and data.
 </p>

 {/* Featured Post */}
 <Link
 href={`/blog/${featuredPost.slug}`}
 className="group block no-underline rounded-xl border border-border bg-card p-6 mb-12 hover:shadow-md transition-all"
 >
 <span className="tag mb-3">Featured</span>
 <h2 className="text-xl font-medium mb-2 group-hover:text-secondary transition-colors">
 {featuredPost.title}
 </h2>
 <p className="text-muted-foreground text-sm leading-relaxed mb-4">
 {featuredPost.excerpt}
 </p>
 <div className="flex items-center gap-3 text-xs text-muted-foreground">
 {featuredPost.category && (
 <>
 <span>{featuredPost.category}</span>
 <span>·</span>
 </>
 )}
 <time>{formatDate(featuredPost.date)}</time>
 </div>
 </Link>

 {/* All Posts */}
 {remainingPosts.length > 0 && (
 <div>
 <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">
 All Posts
 </h3>
 <div className="divide-y divide-border">
 {remainingPosts.map((post) => (
 <PostRow
 key={post.slug}
 post={post}
 showCategory
 />
 ))}
 </div>
 </div>
 )}
 </section>
 </div>
 );
}
