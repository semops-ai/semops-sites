import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPost, getAllPostSlugs } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrism from 'rehype-prism-plus';
import { SharePost } from '@/components/share-post';
import { BackLink } from '@/components/back-link';

// Build-time syntax highlighting, no client JS
const mdxOptions = {
 mdxOptions: {
 rehypePlugins: [[rehypePrism, { ignoreMissing: true }]] as any,
 },
};

interface Props {
 params: Promise<{ slug: string }>;
}

export async function generateStaticParams {
 const slugs = await getAllPostSlugs;
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
 notFound;
 }

 const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
 year: 'numeric',
 month: 'long',
 });

 // Build canonical URL for sharing
 const postUrl = `https://timjmitchell.com/blog/${slug}`;

 return (
 <article className="container mx-auto px-4 py-12 md:py-16 animate-fade-in">
 <div className="prose-container">
 <BackLink href="/blog">Back to writing</BackLink>

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
 />
 </div>

 {/* Share section */}
 <SharePost title={post.title} url={postUrl} />
 </div>
 </article>
 );
}
