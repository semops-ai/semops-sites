import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPage } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxOptions, mdxComponents } from '@/lib/mdx-components';
import { ContactForm } from '@/components/contact-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

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
    <article className="container animate-fade-in">
      <div className="py-8 md:py-12 prose-container">
        <div className="prose-content space-y-5 text-foreground">
          <MDXRemote
            source={page.content}
            options={mdxOptions}
            components={mdxComponents}
          />
          <Link
            href="/about/how-i-got-here"
            className="inline-block mt-8 text-sm font-medium hover:text-secondary transition-colors"
          >
            How I Got Here →
          </Link>

          <Card className="bg-muted mt-10">
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>
                Questions, ideas, or just want to connect — reach out.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </article>
  );
}
