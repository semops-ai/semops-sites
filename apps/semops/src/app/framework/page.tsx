import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  FullBleedSection,
  Container,
  ContentCard,
  Eyebrow,
  SectionHeader,
  FeatureGrid,
} from '@/components/layouts/section-layouts';

export const metadata: Metadata = {
  title: 'Framework',
  description:
    'The SemOps framework: Strategic Data, Symbiotic Architecture, and Semantic Optimization.',
};

export default function FrameworkPage() {
  return (
    <div className="animate-fade-in">
      {/* ── 1. Hero + Pillars ─────────────────────────────────────── */}
      <FullBleedSection bg="muted" pattern="grid">
        <Container>
          <Eyebrow>The Framework</Eyebrow>
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">
            Three Pillars of Semantic Operations
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12">
            Each pillar provides value independently. Together — grounded in the{' '}
            <a href="#semantic-funnel" className="text-foreground hover:text-secondary transition-colors underline underline-offset-4">
              Semantic Funnel
            </a>{' '}
            — they create the conditions for humans, AI, and systems to
            collaborate effectively.
          </p>
          <FeatureGrid cols={3}>
            <Link href="/framework/strategic-data" className="no-underline">
              <ContentCard hover>
                <h3 className="text-lg font-medium mb-2">Strategic Data</h3>
                <p className="text-sm text-muted-foreground">
                  A playbook for making data a first-class strategic asset for AI
                  and all decision processes. Data isn&apos;t just fuel for
                  models — it&apos;s the foundation for every decision your
                  organization makes.
                </p>
              </ContentCard>
            </Link>
            <Link href="/framework/symbiotic-architecture" className="no-underline">
              <ContentCard hover>
                <h3 className="text-lg font-medium mb-2">Symbiotic Architecture</h3>
                <p className="text-sm text-muted-foreground">
                  Encode your strategy into your systems so humans and AI can
                  operate from shared structure. Architecture that evolves with
                  your understanding, not against it.
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

      {/* ── 2. Semantic Funnel ────────────────────────────────────── */}
      <FullBleedSection bg="primary" id="semantic-funnel">
        <Container>
          <SectionHeader
            eyebrow="Mental Model"
            title="The Semantic Funnel"
            subtitle="A mental model that grounds the complexity of AI, data, and human systems in three entities and one knowledge process. It provides the conceptual foundation that the three pillars build upon."
          />
          <div className="mt-8">
            <Image
              src="/images/semantic-funnel3.drawio.svg"
              alt="The Semantic Funnel — three entities and one knowledge process"
              width={800}
              height={500}
              className="w-full max-w-3xl"
            />
          </div>
        </Container>
      </FullBleedSection>

      {/* ── 3. Placeholder ────────────────────────────────────────── */}
      <FullBleedSection bg="muted-accent" pattern="dots">
        <Container>
          <Eyebrow>Coming Soon</Eyebrow>
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">
            Core Insights
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-8">
            AI excels where systems enforce coherent meaning. Each pillar
            provides value independent of AI. Together, they create an
            environment where decisions and state are clear, ideas exist as
            human-readable patterns that agents can work with directly, and AI
            performs better because it has wider context and a well-understood
            domain.
          </p>
          <Link
            href="/blog"
            className="text-sm font-medium hover:text-secondary transition-colors"
          >
            Read more on the blog →
          </Link>
        </Container>
      </FullBleedSection>
    </div>
  );
}
