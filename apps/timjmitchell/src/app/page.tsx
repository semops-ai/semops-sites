import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ContactSection } from '@/components/contact-section';
import { getAllPosts } from '@/lib/mdx';
import { BlogCard } from '@/components/blog-card';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="animate-fade-in">
      {/* Hero Section with Background Image */}
      <section className="relative py-24 md:py-32 lg:py-40">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/tjm_website_hero.png"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-background/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] mb-6 font-display font-medium text-primary">
            Product Leader / Data & AI Strategist
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground mb-6">
            Tim Mitchell
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
            20+ years building data-driven products at large oraganizations like Microsoft and Amazon, as well as start-ups. Now
            helping organizations navigate growth strategies in an AI-driven
            landscape.
          </p>
          <Link
            href="/consulting"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors no-underline"
          >
            Work with Me
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* Blog Posts Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <h2>Latest Writing</h2>
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              View all →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {posts.slice(0, 2).map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
