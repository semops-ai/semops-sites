'use client';

import { Button } from '@/components/ui/button';
import {
 FullBleedSection,
 Container,
 ContentCard,
 Eyebrow,
 SectionDivider,
 SectionHeader,
 FeatureGrid,
 FeatureCard,
} from '@/components/layouts/section-layouts';
import { ActionLink } from '@/components/action-link';
import { BackLink } from '@/components/back-link';
import { PostRow } from '@/components/post-row';

const ComponentSection = ({
 title,
 children,
}: {
 title: string;
 children: React.ReactNode;
}) => (
 <section className="space-y-4">
 <h2>{title}</h2>
 <div className="p-6 border rounded-lg bg-card">{children}</div>
 </section>
);

export function ComponentsPage {
 return (
 <div className="container animate-fade-in">
 <div className="py-8 md:py-12 prose-container space-y-12">
 <BackLink href="/">Back to home</BackLink>

 <div>
 <h1 className="mb-2">Component Library</h1>
 <p className="text-muted-foreground">
 A showcase of available UI components and custom styles.
 </p>
 </div>

 <div className="divider" />

 {/* Typography */}
 <ComponentSection title="Typography">
 <div className="space-y-4">
 <h1>Heading 1 - JetBrains Mono</h1>
 <h2>Heading 2 - JetBrains Mono</h2>
 <h3>Heading 3 - JetBrains Mono</h3>
 <p>
 Body text in DM Sans. Lorem ipsum dolor sit amet, consectetur
 adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
 </p>
 <p className="text-muted-foreground">
 Muted text for secondary content and metadata.
 </p>
 <p>
 <a href="#">This is a styled link</a> within paragraph text.
 </p>
 <code>Inline code styling</code>
 <pre>
 <code>{`// Code block
function hello {
 console.log("Hello, world!");
}`}</code>
 </pre>
 <blockquote>
 This is a blockquote with the accent border.
 </blockquote>
 </div>
 </ComponentSection>

 {/* Custom Classes */}
 <ComponentSection title="Custom CSS Classes">
 <div className="space-y-6">
 <div>
 <h3 className="text-sm font-medium mb-2">.tag</h3>
 <div className="flex gap-2">
 <span className="tag">Category</span>
 <span className="tag">Framework</span>
 <span className="tag">AI Strategy</span>
 </div>
 </div>

 <div>
 <h3 className="text-sm font-medium mb-2">.meta</h3>
 <span className="meta">Dec 2024 · 5 min read</span>
 </div>

 <div>
 <h3 className="text-sm font-medium mb-2">.divider</h3>
 <div className="divider" />
 </div>

 <div>
 <h3 className="text-sm font-medium mb-2">.prose-container</h3>
 <p className="text-sm text-muted-foreground">
 Centers content with max-width of 680px (this page uses it)
 </p>
 </div>
 </div>
 </ComponentSection>

 {/* Design Token Reference */}
 <ComponentSection title="Design Token Reference">
 <p className="text-sm text-muted-foreground mb-4">
 shadcn/ui convention: each pair = <strong>surface + text-on-that-surface</strong>.
 e.g. <code>bg-primary text-primary-foreground</code>
 </p>
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead>
 <tr className="border-b">
 <th className="text-left py-2 pr-4 font-medium">Token</th>
 <th className="text-left py-2 pr-4 font-medium">Role</th>
 <th className="text-left py-2 font-medium">Used as...</th>
 </tr>
 </thead>
 <tbody className="text-muted-foreground">
 <tr className="border-b border-border/50">
 <td className="py-2 pr-4 font-mono text-xs text-foreground">background / foreground</td>
 <td className="py-2 pr-4">Page canvas + default text</td>
 <td className="py-2"><code>bg-background</code>, <code>text-foreground</code></td>
 </tr>
 <tr className="border-b border-border/50">
 <td className="py-2 pr-4 font-mono text-xs text-foreground">primary / primary-foreground</td>
 <td className="py-2 pr-4">Structural dark (section backgrounds)</td>
 <td className="py-2">Dark sections (<code>bg-primary text-primary-foreground</code>)</td>
 </tr>
 <tr className="border-b border-border/50">
 <td className="py-2 pr-4 font-mono text-xs text-foreground">secondary / secondary-foreground</td>
 <td className="py-2 pr-4">Brand color (crimson)</td>
 <td className="py-2">Buttons, hover states, interactive accents</td>
 </tr>
 <tr className="border-b border-border/50">
 <td className="py-2 pr-4 font-mono text-xs text-foreground">muted / muted-foreground</td>
 <td className="py-2 pr-4">De-emphasized surfaces + text</td>
 <td className="py-2">Subtle backgrounds, helper text</td>
 </tr>
 <tr className="border-b border-border/50">
 <td className="py-2 pr-4 font-mono text-xs text-foreground">accent / accent-foreground</td>
 <td className="py-2 pr-4">Hover/highlight states</td>
 <td className="py-2">Menu hover, sidebar item focus</td>
 </tr>
 <tr className="border-b border-border/50">
 <td className="py-2 pr-4 font-mono text-xs text-foreground">card / card-foreground</td>
 <td className="py-2 pr-4">Elevated surface (warm off-white)</td>
 <td className="py-2">Card backgrounds</td>
 </tr>
 <tr className="border-b border-border/50">
 <td className="py-2 pr-4 font-mono text-xs text-foreground">destructive</td>
 <td className="py-2 pr-4">Danger actions</td>
 <td className="py-2">Delete buttons</td>
 </tr>
 <tr>
 <td className="py-2 pr-4 font-mono text-xs text-foreground">border / input / ring</td>
 <td className="py-2 pr-4">Chrome</td>
 <td className="py-2">Borders, input outlines, focus rings</td>
 </tr>
 </tbody>
 </table>
 </div>
 <p className="text-sm text-muted-foreground mt-4 mb-2 font-medium">Custom tokens (non-standard):</p>
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <tbody className="text-muted-foreground">
 <tr className="border-b border-border/50">
 <td className="py-2 pr-4 font-mono text-xs text-foreground">--label</td>
 <td className="py-2 pr-4">CTA button background</td>
 <td className="py-2">Crimson CTA — <code>bg-label</code></td>
 </tr>
 <tr>
 <td className="py-2 pr-4 font-mono text-xs text-foreground">--emphasis</td>
 <td className="py-2 pr-4">Decorative accent lines</td>
 <td className="py-2">Neon pink — Eyebrow component</td>
 </tr>
 </tbody>
 </table>
 </div>
 </ComponentSection>

 {/* Colors */}
 <ComponentSection title="Color Palette">
 <div className="space-y-6">
 {/* Surfaces */}
 <div>
 <h3 className="text-sm font-medium mb-3 text-muted-foreground">Surfaces</h3>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 <div className="space-y-1">
 <div className="h-16 rounded bg-background border border-border" />
 <p className="text-xs font-medium">background</p>
 <p className="text-xs text-muted-foreground">Page canvas</p>
 </div>
 <div className="space-y-1">
 <div className="h-16 rounded bg-card border border-border" />
 <p className="text-xs font-medium">card</p>
 <p className="text-xs text-muted-foreground">Warm off-white</p>
 </div>
 <div className="space-y-1">
 <div className="h-16 rounded bg-muted" />
 <p className="text-xs font-medium">muted</p>
 <p className="text-xs text-muted-foreground">Subtle backgrounds</p>
 </div>
 <div className="space-y-1">
 <div className="h-16 rounded bg-accent" />
 <p className="text-xs font-medium">accent</p>
 <p className="text-xs text-muted-foreground">Hover/highlight</p>
 </div>
 </div>
 </div>

 {/* Structural + Brand */}
 <div>
 <h3 className="text-sm font-medium mb-3 text-muted-foreground">Structural + Brand</h3>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 <div className="space-y-1">
 <div className="h-16 rounded bg-primary" />
 <p className="text-xs font-medium">primary</p>
 <p className="text-xs text-muted-foreground">Structural dark (sections)</p>
 </div>
 <div className="space-y-1">
 <div className="h-16 rounded bg-secondary" />
 <p className="text-xs font-medium">secondary</p>
 <p className="text-xs text-muted-foreground">Brand crimson</p>
 </div>
 <div className="space-y-1">
 <div className="h-16 rounded bg-label" />
 <p className="text-xs font-medium">label</p>
 <p className="text-xs text-muted-foreground">Crimson CTA</p>
 </div>
 <div className="space-y-1">
 <div className="h-16 rounded bg-emphasis" />
 <p className="text-xs font-medium">emphasis</p>
 <p className="text-xs text-muted-foreground">Neon pink (decorative)</p>
 </div>
 </div>
 </div>

 {/* Text colors */}
 <div>
 <h3 className="text-sm font-medium mb-3 text-muted-foreground">Text</h3>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 <div className="space-y-1">
 <div className="h-16 rounded bg-foreground" />
 <p className="text-xs font-medium">foreground</p>
 <p className="text-xs text-muted-foreground">Default text</p>
 </div>
 <div className="space-y-1">
 <div className="h-16 rounded" style={{ backgroundColor: 'hsl(0 0% 45%)' }} />
 <p className="text-xs font-medium">muted-foreground</p>
 <p className="text-xs text-muted-foreground">Secondary text</p>
 </div>
 <div className="space-y-1">
 <div className="h-16 rounded bg-primary-foreground border border-border" />
 <p className="text-xs font-medium">primary-foreground</p>
 <p className="text-xs text-muted-foreground">Text on primary</p>
 </div>
 <div className="space-y-1">
 <div className="h-16 rounded bg-secondary-foreground" />
 <p className="text-xs font-medium">secondary-foreground</p>
 <p className="text-xs text-muted-foreground">Text on secondary</p>
 </div>
 </div>
 </div>

 {/* Utility */}
 <div>
 <h3 className="text-sm font-medium mb-3 text-muted-foreground">Utility</h3>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 <div className="space-y-1">
 <div className="h-16 rounded bg-destructive" />
 <p className="text-xs font-medium">destructive</p>
 <p className="text-xs text-muted-foreground">Danger actions</p>
 </div>
 <div className="space-y-1">
 <div className="h-16 rounded bg-border" />
 <p className="text-xs font-medium">border</p>
 <p className="text-xs text-muted-foreground">Borders</p>
 </div>
 <div className="space-y-1">
 <div className="h-16 rounded bg-ring" />
 <p className="text-xs font-medium">ring</p>
 <p className="text-xs text-muted-foreground">Focus rings</p>
 </div>
 <div className="space-y-1">
 <div className="h-16 rounded" style={{ backgroundColor: 'hsl(0 0% 95%)' }} />
 <p className="text-xs font-medium">muted-accent</p>
 <p className="text-xs text-muted-foreground">Section bg variant</p>
 </div>
 </div>
 </div>

 {/* Text on Surface Samples */}
 <div>
 <h3 className="text-sm font-medium mb-3 text-muted-foreground">Text on Surface Samples</h3>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="h-16 rounded bg-primary flex items-center justify-center">
 <span className="text-primary-foreground font-medium">primary + primary-foreground</span>
 </div>
 <div className="h-16 rounded bg-secondary flex items-center justify-center">
 <span className="text-secondary-foreground font-medium">secondary + secondary-foreground</span>
 </div>
 <div className="h-16 rounded bg-muted flex items-center justify-center">
 <span className="text-muted-foreground font-medium">muted + muted-foreground</span>
 </div>
 <div className="h-16 rounded bg-card border border-border flex items-center justify-center">
 <span className="text-card-foreground font-medium">card + card-foreground</span>
 </div>
 </div>
 </div>
 </div>
 </ComponentSection>

 {/* Buttons */}
 <ComponentSection title="Buttons">
 <div className="flex flex-wrap gap-4">
 <Button>Default</Button>
 <Button variant="secondary">Secondary</Button>
 <Button variant="destructive">Destructive</Button>
 <Button variant="outline">Outline</Button>
 <Button variant="ghost">Ghost</Button>
 <Button variant="link">Link</Button>
 <Button disabled>Disabled</Button>
 <Button size="sm">Small</Button>
 <Button size="lg">Large</Button>
 </div>
 </ComponentSection>

 {/* ActionLink */}
 <ComponentSection title="ActionLink">
 <div className="space-y-4">
 <p className="text-sm text-muted-foreground">
 CTA-style text link for page templates. Both variants hover to secondary (brand crimson).
 </p>
 <div className="flex flex-col gap-3">
 <div>
 <p className="text-xs text-muted-foreground mb-1">variant=&quot;default&quot;</p>
 <ActionLink href="/framework">Explore the framework →</ActionLink>
 </div>
 <div>
 <p className="text-xs text-muted-foreground mb-1">variant=&quot;muted&quot;</p>
 <ActionLink href="/about" variant="muted">What is Semantic Operations? →</ActionLink>
 </div>
 <div>
 <p className="text-xs text-muted-foreground mb-1">external</p>
 <ActionLink href="https://github.com/semops-ai" external>View on GitHub →</ActionLink>
 </div>
 </div>
 </div>
 </ComponentSection>

 {/* BackLink */}
 <ComponentSection title="BackLink">
 <div className="space-y-4">
 <p className="text-sm text-muted-foreground">
 &quot;← Back to X&quot; navigation. Hover to secondary. Used on all content spoke pages.
 </p>
 <BackLink href="/" className="mb-0">Back to home</BackLink>
 </div>
 </ComponentSection>

 {/* PostRow */}
 <ComponentSection title="PostRow">
 <div className="space-y-4">
 <p className="text-sm text-muted-foreground">
 Blog post listing row with hover/active states. Title hovers to secondary.
 </p>
 <div>
 <p className="text-xs text-muted-foreground mb-2">excerptLines=2, showCategory</p>
 <PostRow
 post={{
 slug: 'example-post',
 title: 'Building AI-Ready Organizations',
 excerpt: 'Most organizations treat their data infrastructure as a technical problem. SemOps reframes it as a semantic one — where meaning, structure, and intent drive every decision.',
 date: '2026-02-01',
 category: 'Framework',
 }}
 showCategory
 />
 </div>
 <div>
 <p className="text-xs text-muted-foreground mb-2">excerptLines=1</p>
 <PostRow
 post={{
 slug: 'example-post-2',
 title: 'The Case for Explicit Architecture',
 excerpt: 'When your architecture is implicit, only the people who built it can navigate it. When it is explicit, anyone — including AI agents — can operate from shared structure.',
 date: '2026-01-15',
 }}
 excerptLines={1}
 />
 </div>
 </div>
 </ComponentSection>
 </div>

 {/* Section Layouts - These break out of prose-container */}
 <div className="py-12">
 <div className="prose-container mb-8">
 <h2>Section Layouts</h2>
 <p className="text-muted-foreground">
 Full-bleed sections for landing pages and marketing content.
 These components break out of the container for visual impact.
 </p>
 </div>

 {/* Eyebrow Demo */}
 <div className="prose-container mb-12">
 <h3 className="text-sm font-medium mb-4">Eyebrow Component</h3>
 <div className="p-6 border rounded-lg bg-card space-y-6">
 <div>
 <p className="text-xs text-muted-foreground mb-2">accent=&quot;emphasis&quot; (default - neon pink)</p>
 <Eyebrow>The Problem</Eyebrow>
 </div>
 <div>
 <p className="text-xs text-muted-foreground mb-2">accent=&quot;primary&quot; (dark charcoal)</p>
 <Eyebrow accent="primary">Our Approach</Eyebrow>
 </div>
 <div>
 <p className="text-xs text-muted-foreground mb-2">accent=&quot;muted&quot;</p>
 <Eyebrow accent="muted">Background</Eyebrow>
 </div>
 </div>
 </div>

 {/* SectionHeader Demo */}
 <div className="prose-container mb-12">
 <h3 className="text-sm font-medium mb-4">SectionHeader Component</h3>
 <div className="p-6 border rounded-lg bg-card space-y-8">
 <div>
 <p className="text-xs text-muted-foreground mb-2">size=&quot;default&quot;</p>
 <SectionHeader
 eyebrow="Our Approach"
 title="Three Pillars of Semantic Operations"
 subtitle="A practical framework for organizations ready to align technology with strategy."
 />
 </div>
 <div className="border-t pt-6">
 <p className="text-xs text-muted-foreground mb-2">size=&quot;hero&quot; with children slot</p>
 <SectionHeader
 size="hero"
 eyebrow="Semantic Operations"
 title="A practical framework for AI-ready organizations"
 subtitle="Align your technology and organization to materially benefit from the use of data, AI, and agentic systems."
 >
 <div className="flex flex-col sm:flex-row gap-4">
 <ActionLink href="/framework">Explore the framework →</ActionLink>
 <ActionLink href="/about" variant="muted">What is Semantic Operations? →</ActionLink>
 </div>
 </SectionHeader>
 </div>
 </div>
 </div>

 {/* SectionDivider Demo */}
 <div className="prose-container mb-12">
 <h3 className="text-sm font-medium mb-4">SectionDivider Component</h3>
 <div className="p-6 border rounded-lg bg-card">
 <p className="text-sm text-muted-foreground">Content above divider</p>
 <SectionDivider />
 <p className="text-sm text-muted-foreground">Content below divider</p>
 </div>
 </div>

 {/* FullBleedSection - Muted Background */}
 <FullBleedSection bg="muted" className="my-8">
 <Container>
 <SectionHeader
 eyebrow="Background Variant"
 title="Muted Background Section"
 subtitle="Uses bg-muted for subtle contrast from the main background."
 accent="primary"
 />
 </Container>
 </FullBleedSection>

 {/* FullBleedSection - Muted Accent Background with Dots */}
 <FullBleedSection bg="muted-accent" pattern="dots" className="my-8">
 <Container>
 <SectionHeader
 eyebrow="Accent + Dots"
 title="Accent Background with Dot Pattern"
 subtitle="Neutral accent background with subtle dot texture."
 accent="primary"
 />
 </Container>
 </FullBleedSection>

 {/* FullBleedSection - Grid Pattern */}
 <FullBleedSection bg="muted" pattern="grid" className="my-8">
 <Container>
 <SectionHeader
 eyebrow="Grid Pattern"
 title="Grid Line Pattern"
 subtitle="Subtle grid lines for a technical/blueprint aesthetic."
 accent="muted"
 />
 </Container>
 </FullBleedSection>

 {/* FullBleedSection - Primary Background with FeatureCards */}
 <FullBleedSection bg="primary" className="my-8">
 <Container>
 <SectionHeader
 eyebrow="Primary Variant"
 title="Primary Background with Feature Cards"
 subtitle="Dark charcoal section with light cards for feature highlights."
 />
 <FeatureGrid cols={3}>
 <FeatureCard
 title="Strategic Data"
 description="A playbook for making data a first-class strategic asset for AI and all decision processes."
 hover
 />
 <FeatureCard
 title="Explicit Architecture"
 description="Encode your strategy into your systems so humans and AI can operate from shared structure."
 hover
 />
 <FeatureCard
 title="Semantic Optimization"
 description="Operate like well-designed software — agent-ready, self-validating, and ready for expansion."
 hover
 />
 </FeatureGrid>
 </Container>
 </FullBleedSection>

 {/* ContentCard variants */}
 <div className="prose-container my-12">
 <h3 className="text-sm font-medium mb-4">ContentCard Component</h3>
 <div className="p-6 border rounded-lg bg-card space-y-6">
 <div>
 <p className="text-xs text-muted-foreground mb-2">Default (no hover)</p>
 <ContentCard className="max-w-sm">
 <h3 className="text-lg font-medium mb-2">Feature Title</h3>
 <p className="text-sm text-muted-foreground">
 Description of the feature goes here with supporting details.
 </p>
 </ContentCard>
 </div>
 <div>
 <p className="text-xs text-muted-foreground mb-2">With hover effect</p>
 <ContentCard hover className="max-w-sm">
 <h3 className="text-lg font-medium mb-2">Interactive Card</h3>
 <p className="text-sm text-muted-foreground">
 Hover over this card to see the lift effect.
 </p>
 </ContentCard>
 </div>
 </div>
 </div>

 {/* FeatureCard Demo */}
 <div className="prose-container my-12">
 <h3 className="text-sm font-medium mb-4">FeatureCard Component</h3>
 <div className="p-6 border rounded-lg bg-card space-y-6">
 <p className="text-sm text-muted-foreground">
 Composes ContentCard with title + description. Optional href wraps in a Link.
 </p>
 <div>
 <p className="text-xs text-muted-foreground mb-2">Static (no link)</p>
 <FeatureCard
 title="Strategic Data"
 description="A playbook for making data a first-class strategic asset."
 className="max-w-sm"
 />
 </div>
 <div>
 <p className="text-xs text-muted-foreground mb-2">With href + hover</p>
 <FeatureCard
 href="/framework/strategic-data"
 title="Strategic Data"
 description="A playbook for making data a first-class strategic asset."
 hover
 className="max-w-sm"
 />
 </div>
 </div>
 </div>

 {/* FeatureGrid Demo */}
 <div className="prose-container my-12">
 <h3 className="text-sm font-medium mb-4">FeatureGrid Component</h3>
 <div className="space-y-6">
 <div>
 <p className="text-xs text-muted-foreground mb-2">cols=2</p>
 <FeatureGrid cols={2}>
 <div className="p-4 border rounded bg-muted/50">Item 1</div>
 <div className="p-4 border rounded bg-muted/50">Item 2</div>
 </FeatureGrid>
 </div>
 <div>
 <p className="text-xs text-muted-foreground mb-2">cols=3</p>
 <FeatureGrid cols={3}>
 <div className="p-4 border rounded bg-muted/50">Item 1</div>
 <div className="p-4 border rounded bg-muted/50">Item 2</div>
 <div className="p-4 border rounded bg-muted/50">Item 3</div>
 </FeatureGrid>
 </div>
 <div>
 <p className="text-xs text-muted-foreground mb-2">cols=4</p>
 <FeatureGrid cols={4}>
 <div className="p-4 border rounded bg-muted/50">Item 1</div>
 <div className="p-4 border rounded bg-muted/50">Item 2</div>
 <div className="p-4 border rounded bg-muted/50">Item 3</div>
 <div className="p-4 border rounded bg-muted/50">Item 4</div>
 </FeatureGrid>
 </div>
 </div>
 </div>

 {/* Usage code example */}
 <div className="prose-container my-12">
 <h3 className="text-sm font-medium mb-4">Usage Example</h3>
 <pre>
 <code>{`import {
 FullBleedSection,
 Container,
 SectionHeader,
 FeatureGrid,
 FeatureCard,
} from '@/components/layouts/section-layouts';
import { ActionLink } from '@/components/action-link';
import { BackLink } from '@/components/back-link';

// Hero section with CTA links
<FullBleedSection bg="muted" pattern="grid">
 <Container>
 <SectionHeader
 size="hero"
 eyebrow="Semantic Operations"
 title="A practical framework"
 subtitle="Align your technology..."
 >
 <ActionLink href="/framework">Explore →</ActionLink>
 </SectionHeader>
 </Container>
</FullBleedSection>

// Dark section with feature cards
<FullBleedSection bg="primary">
 <Container>
 <SectionHeader eyebrow="The Framework" title="Three Pillars" />
 <FeatureGrid cols={3}>
 <FeatureCard
 href="/framework/strategic-data"
 title="Strategic Data"
 description="A playbook for..."
 hover
 />
 </FeatureGrid>
 </Container>
</FullBleedSection>

// Content page with back navigation
<BackLink href="/framework">Back to Framework</BackLink>`}</code>
 </pre>
 </div>
 </div>
 </div>
 );
}
