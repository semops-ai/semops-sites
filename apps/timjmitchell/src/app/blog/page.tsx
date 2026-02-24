import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/mdx';
import {
 PageLayout,
 PageHeader,
} from '@/components/layouts/page-layout';
import { BackLink } from '@/components/back-link';
import { PostRow } from '@/components/post-row';

export const metadata: Metadata = {
 title: 'Blog',
 description: 'Thoughts on data, product leadership, AI, and putting it all together.',
};

export default async function BlogPage {
 const posts = await getAllPosts;

 return (
 <PageLayout width="narrow">
 <BackLink href="/">Back to home</BackLink>

 <PageHeader
 title="Writing"
 subtitle="Thoughts on product leadership, AI strategy, and building in public."
 />

 <div className="divider" />

 <section>
 {posts.length === 0 ? (
 <p className="text-muted-foreground text-center py-16">
 No posts yet. Check back soon!
 </p>
 ) : (
 <div className="divide-y divide-border">
 {posts.map((post) => (
 <div key={post.slug} className="py-2 first:pt-0">
 <PostRow post={post} showCategory />
 </div>
 ))}
 </div>
 )}
 </section>
 </PageLayout>
 );
}
