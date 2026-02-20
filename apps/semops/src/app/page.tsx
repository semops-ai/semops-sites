import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import {
  FullBleedSection,
  Container,
  ContentCard,
  Eyebrow,
  SectionHeader,
  FeatureGrid,
} from '@/components/layouts/section-layouts';
import { ContactForm } from '@/components/contact-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

export default async function Home() {
  const posts = await getAllPosts();
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* ── 1. Hero ────────────────────────────────────────────────── */}
      <FullBleedSection bg="muted" pattern="grid">
        <Container>
          <Eyebrow>Semantic Operations</Eyebrow>
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">
            A practical framework for AI-ready organizations
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
            Align your technology and organization to materially benefit from
            the use of data, AI, and agentic systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/framework"
              className="text-sm font-medium hover:text-secondary transition-colors"
            >
              Explore the framework →
            </Link>
            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              What is Semantic Operations? →
            </Link>
          </div>
        </Container>
      </FullBleedSection>

      {/* ── 2. Framework Pillars ───────────────────────────────────── */}
      <FullBleedSection bg="primary">
        <Container>
          <SectionHeader
            eyebrow="The Framework"
            title="Three Pillars"
            subtitle="Each pillar addresses a distinct layer of organizational readiness for AI and agentic systems."
          />
          <FeatureGrid cols={3}>
            <Link href="/framework/strategic-data" className="no-underline">
              <ContentCard hover>
                <h3 className="text-lg font-medium mb-2">Strategic Data</h3>
                <p className="text-sm text-muted-foreground">
                  A playbook for making data a first-class strategic asset for
                  AI and all decision processes.
                </p>
              </ContentCard>
            </Link>
            <Link href="/framework/explicit-architecture" className="no-underline">
              <ContentCard hover>
                <h3 className="text-lg font-medium mb-2">Explicit Architecture</h3>
                <p className="text-sm text-muted-foreground">
                  Encode your strategy into your systems so humans and AI can
                  operate from shared structure.
                </p>
              </ContentCard>
            </Link>
            <Link href="/framework/semantic-optimization" className="no-underline">
              <ContentCard hover>
                <h3 className="text-lg font-medium mb-2">Semantic Optimization</h3>
                <p className="text-sm text-muted-foreground">
                  Operate like well-designed software — agent-ready,
                  self-validating, and ready for expansion through patterns, not
                  features.
                </p>
              </ContentCard>
            </Link>
          </FeatureGrid>
        </Container>
      </FullBleedSection>

      {/* ── 3. Blog ─────────────────────────────────────────────────── */}
      {recentPosts.length > 0 && (
        <FullBleedSection bg="muted-accent" pattern="dots">
          <Container>
            <Eyebrow>Blog</Eyebrow>
            <div className="space-y-6 mt-8">
              {recentPosts.map((post) => {
                const formattedDate = new Date(post.date).toLocaleDateString(
                  'en-US',
                  { month: 'short', year: 'numeric' }
                );

                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group block no-underline"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-medium text-foreground group-hover:text-secondary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                          {post.excerpt}
                        </p>
                      </div>
                      <time className="text-sm text-muted-foreground shrink-0 tabular-nums">
                        {formattedDate}
                      </time>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="mt-8">
              <Link
                href="/blog"
                className="text-sm font-medium hover:text-secondary transition-colors"
              >
                All posts →
              </Link>
            </div>
          </Container>
        </FullBleedSection>
      )}

      {/* ── 4. GitHub ──────────────────────────────────────────────── */}
      <FullBleedSection bg="muted">
        <Container>
          <SectionHeader
            eyebrow="Open Source"
            title="On GitHub"
          />
          <p className="text-muted-foreground mb-8 max-w-2xl">
            These repos are the open-source implementation — architecture,
            infrastructure, and working examples built on the framework&apos;s
            principles.
          </p>
          <div className="space-y-3">
            {[
              { repo: 'semops-dx-orchestrator', desc: 'System architecture, cross-repo coordination, and design principles' },
              { repo: 'semops-core', desc: 'Domain schema, knowledge base, and shared infrastructure services' },
              { repo: 'semops-publisher', desc: 'AI-assisted content creation, style governance, and editorial learning' },
              { repo: 'semops-data', desc: 'Data platform for coherence measurement, analytics, and research synthesis' },
              { repo: 'semops-sites', desc: 'Content delivery, web publishing, and design system' },
              { repo: 'semops-docs', desc: 'Framework theory, concepts, and foundational research' },
            ].map(({ repo, desc }) => (
              <div key={repo} className="flex items-center gap-4">
                <a
                  href={`https://github.com/semops-ai/${repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center shrink-0 w-56 rounded-md border bg-background px-4 py-2 text-sm font-mono font-medium hover:bg-accent hover:text-accent-foreground transition-all no-underline"
                >
                  {repo}
                </a>
                <span className="text-sm text-muted-foreground">
                  {desc}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </FullBleedSection>

      {/* ── 5. Contact ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <Container>
          <Card className="bg-muted">
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>
                Questions, ideas, or just want to connect — reach out.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
            <CardFooter className="gap-6">
              <a
                href="https://www.linkedin.com/in/timjmitchell"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                LinkedIn →
              </a>
              <a
                href="https://github.com/semops-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub →
              </a>
            </CardFooter>
          </Card>
        </Container>
      </section>
    </div>
  );
}
