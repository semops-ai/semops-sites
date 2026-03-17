import { getAllPosts } from '@/lib/mdx';
import {
  FullBleedSection,
  Container,
  Eyebrow,
  SectionHeader,
  FeatureGrid,
  FeatureCard,
} from '@/components/layouts/section-layouts';
import { ActionLink } from '@/components/action-link';
import { ContactSection } from '@/components/contact-section';
import { PostRow } from '@/components/post-row';

export default async function Home() {
  const posts = await getAllPosts();
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* ── 1. Hero ────────────────────────────────────────────────── */}
      <FullBleedSection bg="muted" pattern="grid">
        <Container>
          <SectionHeader
            size="hero"
            eyebrow="Semantic Operations"
            title="A practical framework for AI-ready organizations"
            subtitle="Align your technology and organization to materially benefit from the use of data, AI, and agentic systems."
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <ActionLink href="/framework">Explore the framework →</ActionLink>
              <ActionLink href="/framework/what-is-semops" variant="muted">
                What is Semantic Operations? →
              </ActionLink>
            </div>
          </SectionHeader>
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
            <FeatureCard
              href="/framework/strategic-data"
              title="Strategic Data"
              description="A playbook for making data a first-class strategic asset for AI and all decision processes."
              hover
            />
            <FeatureCard
              href="/framework/explicit-architecture"
              title="Explicit Architecture"
              description="Encode your strategy into your systems so humans and AI can operate from shared structure."
              hover
            />
            <FeatureCard
              href="/framework/semantic-optimization"
              title="Semantic Optimization"
              description="Operate like well-designed software — agent-ready, self-validating, and ready for expansion through patterns, not features."
              hover
            />
          </FeatureGrid>
        </Container>
      </FullBleedSection>

      {/* ── 3. Blog ─────────────────────────────────────────────────── */}
      {recentPosts.length > 0 && (
        <FullBleedSection bg="muted-accent" pattern="dots">
          <Container>
            <Eyebrow>Blog</Eyebrow>
            <div className="mt-8">
              {recentPosts.map((post) => (
                <PostRow
                  key={post.slug}
                  post={post}
                  showCategory
                  excerptLines={1}
                />
              ))}
            </div>
            <div className="mt-8">
              <ActionLink href="/blog">All posts →</ActionLink>
            </div>
          </Container>
        </FullBleedSection>
      )}

      {/* ── 4. GitHub ──────────────────────────────────────────────── */}
      <FullBleedSection bg="default">
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
                  className="inline-flex items-center justify-center shrink-0 w-56 rounded-md border border-border bg-muted px-4 py-2 text-sm font-mono font-medium hover:bg-accent hover:text-accent-foreground transition-all no-underline"
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
      <ContactSection />
    </div>
  );
}
