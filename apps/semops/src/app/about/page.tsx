import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPage } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxOptions, mdxComponents } from '@/lib/mdx-components';
import { ActionLink } from '@/components/action-link';
import { ContactSection } from '@/components/contact-section';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('about');

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
  const page = await getPage('about');

  if (!page) {
    notFound();
  }

  return (
    <div className="animate-fade-in">
      <article className="container">
        <div className="py-8 md:py-12 prose-container">
          <div className="prose-content space-y-5 text-foreground">
            <MDXRemote
              source={page.content}
              options={mdxOptions}
              components={mdxComponents}
            />
            <ActionLink href="/about/how-i-got-here" className="inline-block mt-8">
              How I Got Here →
            </ActionLink>
          </div>
        </div>
      </article>

      <ContactSection />
    </div>
  );
}
