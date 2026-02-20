'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  FullBleedSection,
  Container,
  ContentCard,
  Eyebrow,
  SectionDivider,
  SectionHeader,
  FeatureGrid,
} from '@/components/layouts/section-layouts';

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

export function ComponentsPage() {
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);

  return (
    <div className="container animate-fade-in">
      <div className="py-8 md:py-12 prose-container space-y-12">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors no-underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

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
function hello() {
  console.log("Hello, world!");
}`}</code>
            </pre>
            <blockquote>
              This is a blockquote with the forest green border accent.
            </blockquote>
          </div>
        </ComponentSection>

        {/* Typography Test */}
        <ComponentSection title="Typography Test — Font Comparison">
          <div className="space-y-10">
            {/* Logo shootout */}
            <div>
              <h3 className="text-sm font-medium mb-4 text-muted-foreground">Logo / Brand Lockup — All Candidates</h3>
              <div className="space-y-4">
                {[
                  { label: 'Matech 700', font: 'var(--font-matech)', weight: 700 },
                  { label: 'Matech 800', font: 'var(--font-matech)', weight: 800 },
                  { label: 'Monomials', font: 'var(--font-monomials)', weight: 400 },
                  { label: 'Classica Motion', font: 'var(--font-classica)', weight: 400 },
                  { label: 'Classica Italic', font: 'var(--font-classica)', weight: 400, italic: true },
                  { label: 'FEATURISTIC', font: 'var(--font-featuristic)', weight: 400 },
                  { label: 'Tracker Clock', font: 'var(--font-tracker)', weight: 400 },
                  { label: 'JetBrains Mono', font: 'var(--font-mono)', weight: 700 },
                  { label: 'DM Sans', font: 'var(--font-sans)', weight: 700 },
                ].map((f) => (
                  <div key={f.label} className="flex items-baseline gap-4 border-b border-border/30 pb-3">
                    <span className="text-xs text-muted-foreground w-32 shrink-0">{f.label}</span>
                    <span
                      className="text-3xl text-foreground"
                      style={{ fontFamily: f.font, fontWeight: f.weight, fontStyle: f.italic ? 'italic' : 'normal' }}
                    >
                      SemOps.Ai
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Heading scale per font */}
            <div>
              <h3 className="text-sm font-medium mb-4 text-muted-foreground">Heading Scale — Each Font</h3>
              <div className="space-y-6">
                {[
                  { label: 'Matech', font: 'var(--font-matech)' },
                  { label: 'Monomials', font: 'var(--font-monomials)' },
                  { label: 'Classica Motion', font: 'var(--font-classica)' },
                  { label: 'FEATURISTIC', font: 'var(--font-featuristic)' },
                  { label: 'Tracker Clock', font: 'var(--font-tracker)' },
                ].map((f) => (
                  <div key={f.label} className="border-b border-border/30 pb-4">
                    <p className="text-xs text-muted-foreground mb-2">{f.label}</p>
                    <p className="text-4xl mb-1" style={{ fontFamily: f.font, fontWeight: 700 }}>Semantic Operations</p>
                    <p className="text-2xl mb-1" style={{ fontFamily: f.font, fontWeight: 600 }}>Strategic Data &middot; Explicit Architecture</p>
                    <p className="text-lg" style={{ fontFamily: f.font, fontWeight: 400 }}>Building better AI products through principled design</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags / Labels */}
            <div>
              <h3 className="text-sm font-medium mb-4 text-muted-foreground">Tags &amp; Labels — Each Font</h3>
              <div className="space-y-4">
                {[
                  { label: 'Matech', font: 'var(--font-matech)' },
                  { label: 'Monomials', font: 'var(--font-monomials)' },
                  { label: 'Classica Motion', font: 'var(--font-classica)' },
                  { label: 'FEATURISTIC', font: 'var(--font-featuristic)' },
                  { label: 'Tracker Clock', font: 'var(--font-tracker)' },
                ].map((f) => (
                  <div key={f.label} className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground w-32 shrink-0">{f.label}</span>
                    <div className="flex gap-2">
                      <span className="tag" style={{ fontFamily: f.font }}>Strategic Data</span>
                      <span className="tag" style={{ fontFamily: f.font }}>Architecture</span>
                      <span className="tag" style={{ fontFamily: f.font }}>Optimization</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Body text comparison */}
            <div>
              <h3 className="text-sm font-medium mb-4 text-muted-foreground">Body Text — All Fonts</h3>
              <div className="space-y-4">
                {[
                  { label: 'DM Sans (current body)', font: 'var(--font-sans)' },
                  { label: 'JetBrains Mono (current headings)', font: 'var(--font-mono)' },
                  { label: 'Matech', font: 'var(--font-matech)' },
                  { label: 'Monomials', font: 'var(--font-monomials)' },
                  { label: 'Classica Motion', font: 'var(--font-classica)' },
                  { label: 'FEATURISTIC', font: 'var(--font-featuristic)' },
                  { label: 'Tracker Clock', font: 'var(--font-tracker)' },
                ].map((f) => (
                  <div key={f.label} className="border-b border-border/30 pb-3">
                    <p className="text-xs text-muted-foreground mb-1">{f.label}</p>
                    <p style={{ fontFamily: f.font }}>Most organizations treat their data infrastructure as a technical problem. SemOps reframes it as a semantic one.</p>
                  </div>
                ))}
              </div>
            </div>
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
                  <td className="py-2 pr-4">Main brand/action color</td>
                  <td className="py-2">Primary buttons (<code>bg-primary text-primary-foreground</code>)</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-4 font-mono text-xs text-foreground">secondary / secondary-foreground</td>
                  <td className="py-2 pr-4">Softer alternative actions</td>
                  <td className="py-2">Secondary buttons, less emphasis</td>
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
                  <td className="py-2 pr-4">Elevated surface</td>
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
                  <td className="py-2">Navy — <code>bg-label</code></td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-mono text-xs text-foreground">--emphasis</td>
                  <td className="py-2 pr-4">Decorative accent lines</td>
                  <td className="py-2">Hot pink — Eyebrow component</td>
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
                  <p className="text-xs text-muted-foreground">hsl(0 0% 98%)</p>
                </div>
                <div className="space-y-1">
                  <div className="h-16 rounded bg-card border border-border" />
                  <p className="text-xs font-medium">card</p>
                  <p className="text-xs text-muted-foreground">hsl(40 18% 96%) — warm off-white</p>
                </div>
                <div className="space-y-1">
                  <div className="h-16 rounded bg-muted" />
                  <p className="text-xs font-medium">muted</p>
                  <p className="text-xs text-muted-foreground">hsl(0 0% 90%)</p>
                </div>
                <div className="space-y-1">
                  <div className="h-16 rounded bg-accent" />
                  <p className="text-xs font-medium">accent</p>
                  <p className="text-xs text-muted-foreground">hsl(348 100% 56%) — pink-red</p>
                </div>
              </div>
            </div>

            {/* Brand colors */}
            <div>
              <h3 className="text-sm font-medium mb-3 text-muted-foreground">Brand</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <div className="h-16 rounded bg-primary" />
                  <p className="text-xs font-medium">primary</p>
                  <p className="text-xs text-muted-foreground">hsl(0 0% 14%) — dark charcoal</p>
                </div>
                <div className="space-y-1">
                  <div className="h-16 rounded bg-secondary" />
                  <p className="text-xs font-medium">secondary</p>
                  <p className="text-xs text-muted-foreground">hsl(342 100% 52%) — crimson</p>
                </div>
                <div className="space-y-1">
                  <div className="h-16 rounded bg-label" />
                  <p className="text-xs font-medium">label</p>
                  <p className="text-xs text-muted-foreground">hsl(342 87% 44%) — crimson CTA</p>
                </div>
                <div className="space-y-1">
                  <div className="h-16 rounded bg-emphasis" />
                  <p className="text-xs font-medium">emphasis</p>
                  <p className="text-xs text-muted-foreground">hsl(342 100% 65%) — neon pink</p>
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
                  <p className="text-xs text-muted-foreground">hsl(0 0% 12%)</p>
                </div>
                <div className="space-y-1">
                  <div className="h-16 rounded" style={{ backgroundColor: 'hsl(0 0% 45%)' }} />
                  <p className="text-xs font-medium">muted-foreground</p>
                  <p className="text-xs text-muted-foreground">hsl(0 0% 45%)</p>
                </div>
                <div className="space-y-1">
                  <div className="h-16 rounded bg-primary-foreground border border-border" />
                  <p className="text-xs font-medium">primary-foreground</p>
                  <p className="text-xs text-muted-foreground">hsl(0 0% 96%)</p>
                </div>
                <div className="space-y-1">
                  <div className="h-16 rounded bg-secondary-foreground" />
                  <p className="text-xs font-medium">secondary-foreground</p>
                  <p className="text-xs text-muted-foreground">hsl(0 0% 98%)</p>
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
                  <p className="text-xs text-muted-foreground">hsl(0 72% 51%)</p>
                </div>
                <div className="space-y-1">
                  <div className="h-16 rounded bg-border" />
                  <p className="text-xs font-medium">border</p>
                  <p className="text-xs text-muted-foreground">hsl(0 0% 82%)</p>
                </div>
                <div className="space-y-1">
                  <div className="h-16 rounded bg-ring" />
                  <p className="text-xs font-medium">ring</p>
                  <p className="text-xs text-muted-foreground">hsl(0 0% 14%)</p>
                </div>
                <div className="space-y-1">
                  <div className="h-16 rounded" style={{ backgroundColor: 'hsl(0 0% 95%)' }} />
                  <p className="text-xs font-medium">muted-accent</p>
                  <p className="text-xs text-muted-foreground">hsl(0 0% 95%)</p>
                </div>
              </div>
            </div>

            {/* Foreground on background samples */}
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

        {/* Card */}
        <ComponentSection title="Card">
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description goes here.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card content with some example text.</p>
            </CardContent>
            <CardFooter>
              <Button>Action</Button>
            </CardFooter>
          </Card>
        </ComponentSection>

        {/* Collapsible */}
        <ComponentSection title="Collapsible">
          <Collapsible
            open={isCollapsibleOpen}
            onOpenChange={setIsCollapsibleOpen}
            className="w-[350px] space-y-2"
          >
            <div className="flex items-center justify-between space-x-4">
              <h4 className="text-sm font-semibold">
                @username starred 3 repositories
              </h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
            </div>
            <div className="rounded-md border px-4 py-2 text-sm">
              @radix-ui/primitives
            </div>
            <CollapsibleContent className="space-y-2">
              <div className="rounded-md border px-4 py-2 text-sm">
                @radix-ui/colors
              </div>
              <div className="rounded-md border px-4 py-2 text-sm">
                @stitches/react
              </div>
            </CollapsibleContent>
          </Collapsible>
        </ComponentSection>

        {/* More Components Notice */}
        <ComponentSection title="Additional Components">
          <div className="space-y-4">
            <p className="text-muted-foreground">
              More ShadCN components can be added as needed:
            </p>
            <code className="block text-sm">
              npx shadcn@latest add [component-name]
            </code>
            <p className="text-sm text-muted-foreground">
              Available: accordion, alert, avatar, badge, checkbox, dialog,
              dropdown-menu, input, label, popover, progress, radio-group,
              select, separator, sheet, skeleton, slider, switch, table, tabs,
              textarea, toggle, tooltip, and more.
            </p>
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
              <p className="text-xs text-muted-foreground mb-2">accent=&quot;emphasis&quot; (default - hot pink)</p>
              <Eyebrow>The Problem</Eyebrow>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">accent=&quot;primary&quot; (deep navy)</p>
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
          <div className="p-6 border rounded-lg bg-card">
            <SectionHeader
              eyebrow="Our Approach"
              title="Three Pillars of Semantic Operations"
              subtitle="A practical framework for organizations ready to align technology with strategy."
            />
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
            <p className="text-muted-foreground">
              This section spans the full viewport width while content stays contained.
            </p>
          </Container>
        </FullBleedSection>

        {/* FullBleedSection - Muted Accent Background with Dots */}
        <FullBleedSection bg="muted-accent" pattern="dots" className="my-8">
          <Container>
            <SectionHeader
              eyebrow="Accent + Dots"
              title="Accent Background with Dot Pattern"
              subtitle="Green-tinted background with subtle dot texture."
              accent="primary"
            />
            <p className="text-muted-foreground">
              Combines bg=&quot;accent&quot; with pattern=&quot;dots&quot; for a branded texture effect.
            </p>
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

        {/* FullBleedSection - Primary Background with Cards */}
        <FullBleedSection bg="primary" className="my-8">
          <Container>
            <SectionHeader
              eyebrow="Primary Variant"
              title="Primary Background with Content Cards"
              subtitle="Navy section with light cards for feature highlights."
            />
            <FeatureGrid cols={3}>
              <ContentCard hover>
                <h3 className="text-lg font-medium mb-2">Strategic Data</h3>
                <p className="text-sm text-muted-foreground">
                  A playbook for making data a first-class strategic asset for AI and
                  all decision processes.
                </p>
              </ContentCard>
              <ContentCard hover>
                <h3 className="text-lg font-medium mb-2">Explicit Architecture</h3>
                <p className="text-sm text-muted-foreground">
                  Encode your strategy into your systems so humans and AI can operate
                  from shared structure.
                </p>
              </ContentCard>
              <ContentCard hover>
                <h3 className="text-lg font-medium mb-2">Semantic Optimization</h3>
                <p className="text-sm text-muted-foreground">
                  Operate like well-designed software — agent-ready,
                  self-validating, and ready for expansion.
                </p>
              </ContentCard>
            </FeatureGrid>
          </Container>
        </FullBleedSection>

        {/* FullBleedSection - Primary Background with Cards */}
        <FullBleedSection bg="primary" className="my-8">
          <Container>
            <div className="mb-10">
              <div className="w-10 h-0.5 mb-3 bg-primary-foreground/40" aria-hidden="true" />
              <span className="text-sm font-medium uppercase tracking-wide text-primary-foreground/70">
                Primary Variant
              </span>
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-4 mt-4 !text-white">
                Primary Background with Content Cards
              </h2>
              <p className="text-lg text-primary-foreground/80 max-w-2xl">
                Forest green background with light cards for branded feature sections.
              </p>
            </div>
            <FeatureGrid cols={3}>
              <ContentCard hover>
                <h3 className="text-lg font-medium mb-2">Strategic Data</h3>
                <p className="text-sm text-muted-foreground">
                  A playbook for making data a first-class strategic asset for AI and
                  all decision processes.
                </p>
              </ContentCard>
              <ContentCard hover>
                <h3 className="text-lg font-medium mb-2">Explicit Architecture</h3>
                <p className="text-sm text-muted-foreground">
                  Encode your strategy into your systems so humans and AI can operate
                  from shared structure.
                </p>
              </ContentCard>
              <ContentCard hover>
                <h3 className="text-lg font-medium mb-2">Semantic Optimization</h3>
                <p className="text-sm text-muted-foreground">
                  Operate like well-designed software — agent-ready,
                  self-validating, and ready for expansion.
                </p>
              </ContentCard>
            </FeatureGrid>
          </Container>
        </FullBleedSection>

        {/* FullBleedSection - Primary CTA */}
        <FullBleedSection bg="primary" className="my-8">
          <Container>
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-medium mb-4 !text-white">
                Primary Background CTA
              </h2>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-6">
                Use for call-to-action sections or key messaging that needs to stand out.
              </p>
              <Button variant="secondary" size="lg">
                Get Started
              </Button>
            </div>
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
  ContentCard,
  Eyebrow,
  SectionHeader,
  FeatureGrid,
} from '@/components/layouts/section-layouts';

// Primary (navy) section with feature cards
<FullBleedSection bg="primary">
  <Container>
    <SectionHeader
      eyebrow="Our Approach"
      title="Three Pillars"
      subtitle="A practical framework..."
    />
    <FeatureGrid cols={3}>
      <ContentCard hover>...</ContentCard>
      <ContentCard hover>...</ContentCard>
      <ContentCard hover>...</ContentCard>
    </FeatureGrid>
  </Container>
</FullBleedSection>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
