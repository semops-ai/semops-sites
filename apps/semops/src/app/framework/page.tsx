import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  FullBleedSection,
  Container,
  SectionHeader,
  FeatureGrid,
  FeatureCard,
} from '@/components/layouts/section-layouts';
import { ActionLink } from '@/components/action-link';

export const metadata: Metadata = {
  title: 'Framework',
  description:
    'The SemOps framework: Strategic Data, Explicit Architecture, and Semantic Optimization.',
};

export default function FrameworkPage() {
  return (
    <div className="animate-fade-in">
      {/* ── 1. Framework (Pillars + Semantic Funnel) ──────────────── */}
      <FullBleedSection bg="muted" pattern="grid">
        <Container>
          <SectionHeader
            size="hero"
            eyebrow="The Framework"
            title="Three Pillars of Semantic Operations"
            subtitle="Each pillar provides value independently. Together — grounded in the Semantic Funnel — they create the conditions for humans, AI, and systems to collaborate effectively."
          />
          <FeatureGrid cols={3}>
            <FeatureCard
              href="/framework/strategic-data"
              title="Strategic Data"
              description="A playbook for making data a first-class strategic asset for AI and all decision processes. Data isn't just fuel for models — it's the foundation for every decision your organization makes."
              hover
            />
            <FeatureCard
              href="/framework/explicit-architecture"
              title="Explicit Architecture"
              description="Encode your strategy into your systems so humans and AI can operate from shared structure. Architecture that evolves with your understanding, not against it."
              hover
            />
            <FeatureCard
              href="/framework/semantic-optimization"
              title="Semantic Optimization"
              description="Operate like well-designed software — agent-ready, self-validating, and ready for expansion through patterns, not features."
              hover
            />
          </FeatureGrid>

          <div className="mt-16" id="semantic-funnel">
            <h2 className="mb-3">The Semantic Funnel</h2>
            <p className="text-muted-foreground mb-4 max-w-2xl">
              A mental model that grounds the complexity of AI, data, and human systems in three entities and one knowledge process. It provides the conceptual foundation that the three pillars build upon.
            </p>
            <ActionLink href="/framework/semantic-funnel">Read more →</ActionLink>
            <Link href="/framework/semantic-funnel" className="block mt-8">
              <Image
                src="/images/semantic-funnel3.drawio.svg"
                alt="The Semantic Funnel — three entities and one knowledge process"
                width={800}
                height={500}
                className="w-full max-w-3xl hover:opacity-90 transition-opacity"
              />
            </Link>
          </div>
        </Container>
      </FullBleedSection>

      {/* ── 2. GitHub Highlight ────────────────────────────────────────── */}
      <FullBleedSection bg="muted-accent" pattern="dots">
        <Container>
          <SectionHeader
            eyebrow="GitHub Highlight"
            title="Semops-ai Global Architecture"
            subtitle="Semops-ai is the GitHub Organization that houses the testbed and core implementation of Semantic Operations. The Global Architecture document in the semops-dx-orchestrator repository is the starting point."
          />
          <div className="space-y-2 mb-8">
            <ActionLink href="https://github.com/semops-ai/semops-dx-orchestrator/blob/main/docs/GLOBAL_ARCHITECTURE.md" external>
              Global Architecture →
            </ActionLink>
          </div>
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
                  className="inline-flex items-center justify-center shrink-0 w-56 rounded-md border border-border bg-background px-4 py-2 text-sm font-mono font-medium hover:bg-accent hover:text-accent-foreground transition-all no-underline"
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
    </div>
  );
}
