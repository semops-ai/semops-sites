import Link from 'next/link';
import {
  PageLayout,
  PageHeader,
} from '@/components/layouts/page-layout';
import {
  FullBleedSection,
  Container,
  ContentCard,
  FeatureCard,
  FeatureGrid,
  Eyebrow,
  SectionDivider,
  SectionHeader,
} from '@/components/layouts/section-layouts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { ActionLink } from '@/components/action-link';
import { BackLink } from '@/components/back-link';
import { BlogCard } from '@/components/blog-card';
import { PostRow } from '@/components/post-row';

const ComponentSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="space-y-4">
    <h3>{title}</h3>
    <div className="p-6 border rounded-lg bg-card">{children}</div>
  </section>
);

// Sample blog post for demos
const samplePost = {
  slug: 'sample-post',
  title: 'Building Data-Driven Products in the Age of AI',
  date: '2026-01-15',
  excerpt: 'A look at how product teams can leverage AI to build better data products while maintaining strategic focus.',
  tags: ['AI', 'Product'],
  category: 'Product Strategy',
  author: 'Tim Mitchell',
};

export default function ComponentsPage() {
  return (
    <PageLayout width="default">
      <BackLink href="/">Back to home</BackLink>

      <PageHeader
        title="Component Library"
        subtitle="A showcase of available UI components and design tokens for semops-ai.com"
      />

      <div className="divider" />

      <div className="space-y-12">
        {/* Typography */}
        <ComponentSection title="Typography">
          <div className="space-y-4">
            <h1>Heading 1 - Lora Serif</h1>
            <h2>Heading 2 - Lora Serif</h2>
            <h3>Heading 3 - Inter</h3>
            <h4>Heading 4 - Inter</h4>
            <p>
              Body text in Inter. Lorem ipsum dolor sit amet, consectetur
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
              This is a blockquote with the sky blue border accent.
            </blockquote>
          </div>
        </ComponentSection>

        {/* Font Families */}
        <ComponentSection title="Font Families">
          <div className="space-y-4">
            <p className="font-sans">
              <strong>font-sans (Inter):</strong> The quick brown fox jumps over
              the lazy dog.
            </p>
            <p className="font-serif">
              <strong>font-serif (Lora):</strong> The quick brown fox jumps over
              the lazy dog.
            </p>
            <p className="font-display">
              <strong>font-display (Plus Jakarta Sans):</strong> The quick brown
              fox jumps over the lazy dog.
            </p>
            <p className="font-mono">
              <strong>font-mono:</strong> The quick brown fox jumps over the
              lazy dog.
            </p>
          </div>
        </ComponentSection>

        {/* Custom Classes */}
        <ComponentSection title="Custom CSS Classes">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium mb-2">.tag</p>
              <div className="flex gap-2">
                <span className="tag">Category</span>
                <span className="tag">Product</span>
                <span className="tag">AI Strategy</span>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">.meta</p>
              <span className="meta">Jan 2026 · 5 min read</span>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">.divider</p>
              <div className="divider" />
            </div>

            <div>
              <p className="text-sm font-medium mb-2">.prose-container</p>
              <p className="text-sm text-muted-foreground">
                Centers content with max-width of 680px (optimal reading width)
              </p>
            </div>
          </div>
        </ComponentSection>

        {/* Colors */}
        <ComponentSection title="Color Palette">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-16 rounded bg-primary" />
              <p className="text-xs">Primary (Sky Blue)</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded bg-secondary" />
              <p className="text-xs">Secondary</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded bg-accent" />
              <p className="text-xs">Accent</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded bg-muted" />
              <p className="text-xs">Muted</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded bg-destructive" />
              <p className="text-xs">Destructive</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded border bg-card" />
              <p className="text-xs">Card / Background</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded bg-foreground" />
              <p className="text-xs">Foreground</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded border-2 border-border bg-background" />
              <p className="text-xs">Border</p>
            </div>
          </div>
        </ComponentSection>

        {/* Buttons */}
        <ComponentSection title="Button">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium mb-3">Variants</p>
              <div className="flex flex-wrap gap-3">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-3">Sizes</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-3">As Link</p>
              <Button asChild>
                <Link href="/">Go Home</Link>
              </Button>
            </div>
          </div>
        </ComponentSection>

        {/* Input */}
        <ComponentSection title="Input">
          <div className="space-y-4 max-w-sm">
            <Input placeholder="Default input" />
            <Input type="email" placeholder="Email input" />
            <Input disabled placeholder="Disabled input" />
          </div>
        </ComponentSection>

        {/* Card */}
        <ComponentSection title="Card (ShadCN)">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description text goes here.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Card content with any React children.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm">Action</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Another Card</CardTitle>
                <CardDescription>With different content.</CardDescription>
              </CardHeader>
              <CardContent>
                <Input placeholder="Input inside a card" />
              </CardContent>
            </Card>
          </div>
        </ComponentSection>

        {/* Section Layouts */}
        <ComponentSection title="Section Layouts">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium mb-2">Eyebrow</p>
              <Eyebrow>Section Label</Eyebrow>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">SectionHeader</p>
              <SectionHeader
                eyebrow="Our Approach"
                title="Three Pillars of Product Strategy"
                subtitle="A practical framework for data-driven organizations"
              />
            </div>

            <div>
              <p className="text-sm font-medium mb-2">SectionDivider</p>
              <SectionDivider />
            </div>

            <div>
              <p className="text-sm font-medium mb-2">ContentCard</p>
              <div className="grid md:grid-cols-2 gap-4">
                <ContentCard>
                  <p className="text-sm">Basic content card</p>
                </ContentCard>
                <ContentCard hover>
                  <p className="text-sm">Content card with hover lift</p>
                </ContentCard>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">FeatureGrid + FeatureCard</p>
              <FeatureGrid cols={3}>
                <FeatureCard
                  title="Data Strategy"
                  description="A playbook for making data strategic."
                />
                <FeatureCard
                  title="AI Integration"
                  description="Practical AI adoption for enterprise teams."
                />
                <FeatureCard
                  title="Product Leadership"
                  description="Building high-performing product organizations."
                  hover
                />
              </FeatureGrid>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Container</p>
              <p className="text-sm text-muted-foreground">
                Centered container with max-width. Widths: narrow (768px), default (1024px), wide (1152px).
                Use inside FullBleedSection.
              </p>
            </div>
          </div>
        </ComponentSection>

        {/* Navigation Components */}
        <ComponentSection title="Navigation Components">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium mb-2">ActionLink</p>
              <div className="flex gap-4">
                <ActionLink href="/">Default variant</ActionLink>
                <ActionLink href="/" variant="muted">Muted variant</ActionLink>
                <ActionLink href="https://example.com" external>External link</ActionLink>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">BackLink</p>
              <BackLink href="/" className="mb-0">Back to home</BackLink>
            </div>
          </div>
        </ComponentSection>

        {/* Blog Components */}
        <ComponentSection title="Blog Components">
          <div className="space-y-8">
            <div>
              <p className="text-sm font-medium mb-3">BlogCard (default)</p>
              <div className="max-w-sm">
                <BlogCard post={samplePost} />
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">BlogCard (featured)</p>
              <div className="max-w-2xl">
                <BlogCard post={samplePost} featured />
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">PostRow</p>
              <div className="max-w-2xl divide-y divide-border">
                <PostRow post={samplePost} showCategory />
                <PostRow
                  post={{
                    ...samplePost,
                    slug: 'sample-2',
                    title: 'Why Semantic Operations Matter',
                    category: 'SemOps',
                  }}
                  showCategory
                />
              </div>
            </div>
          </div>
        </ComponentSection>

        {/* Layout Components */}
        <ComponentSection title="Page Layout Components">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium mb-2">PageLayout</p>
              <p className="text-sm text-muted-foreground">
                Container with responsive padding. Width variants: narrow
                (672px), default (896px), wide (1152px), full.
              </p>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">PageHeader</p>
              <p className="text-sm text-muted-foreground">
                Consistent page title with optional subtitle. See the header of
                this page.
              </p>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Section</p>
              <p className="text-sm text-muted-foreground">
                Content section with consistent vertical spacing (py-8 md:py-12)
                and optional title.
              </p>
            </div>
          </div>
        </ComponentSection>

        {/* Responsive Patterns */}
        <ComponentSection title="Responsive Patterns">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium mb-2">
                Responsive Text (resize window to see)
              </p>
              <p className="text-lg md:text-xl lg:text-2xl font-medium">
                This text grows: text-lg → md:text-xl → lg:text-2xl
              </p>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Responsive Grid</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded">Column 1</div>
                <div className="p-4 bg-muted rounded">Column 2</div>
                <div className="p-4 bg-muted rounded">Column 3</div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                grid-cols-1 → md:grid-cols-2 → lg:grid-cols-3
              </p>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Flex Direction Switch</p>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="p-4 bg-muted rounded flex-1">Item A</div>
                <div className="p-4 bg-muted rounded flex-1">Item B</div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                flex-col (stacked) → md:flex-row (side by side)
              </p>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Hidden/Shown</p>
              <div className="space-y-2">
                <p className="md:hidden text-sm bg-primary/10 p-2 rounded">
                  ← This only shows on mobile (hidden on md+)
                </p>
                <p className="hidden md:block text-sm bg-primary/10 p-2 rounded">
                  ← This only shows on tablet+ (hidden on mobile)
                </p>
              </div>
            </div>
          </div>
        </ComponentSection>

        {/* Spacing */}
        <ComponentSection title="Spacing Scale">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Using Tailwind&apos;s default scale (1 unit = 0.25rem = 4px)
            </p>
            <div className="flex flex-wrap gap-4 items-end">
              <div className="text-center">
                <div className="w-8 h-2 bg-primary rounded" />
                <p className="text-xs mt-1">p-2 (8px)</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-4 bg-primary rounded" />
                <p className="text-xs mt-1">p-4 (16px)</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-6 bg-primary rounded" />
                <p className="text-xs mt-1">p-6 (24px)</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-primary rounded" />
                <p className="text-xs mt-1">p-8 (32px)</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-12 bg-primary rounded" />
                <p className="text-xs mt-1">p-12 (48px)</p>
              </div>
            </div>
          </div>
        </ComponentSection>

        {/* Animations */}
        <ComponentSection title="Animations">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Custom animation utilities defined in globals.css
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="p-4 bg-muted rounded animate-fade-in">
                .animate-fade-in
              </div>
              <div className="p-4 bg-muted rounded animate-fade-in-up">
                .animate-fade-in-up
              </div>
            </div>
          </div>
        </ComponentSection>
      </div>

      {/* Full-Bleed Section Demo (outside the card grid) */}
      <div className="mt-16">
        <h3 className="mb-4">FullBleedSection (Live Demo)</h3>
        <p className="text-sm text-muted-foreground mb-8">
          These sections break out of the container to span the full viewport width.
        </p>
      </div>

      <FullBleedSection bg="muted">
        <Container>
          <SectionHeader
            eyebrow="Muted Background"
            title="Full-Bleed Section"
            subtitle="This section spans the full viewport width with a muted background."
          />
          <FeatureGrid cols={3}>
            <ContentCard hover>
              <h4 className="font-medium mb-1">Feature One</h4>
              <p className="text-sm text-muted-foreground">Cards inside a full-bleed section.</p>
            </ContentCard>
            <ContentCard hover>
              <h4 className="font-medium mb-1">Feature Two</h4>
              <p className="text-sm text-muted-foreground">With hover lift effect enabled.</p>
            </ContentCard>
            <ContentCard hover>
              <h4 className="font-medium mb-1">Feature Three</h4>
              <p className="text-sm text-muted-foreground">Using the FeatureGrid layout.</p>
            </ContentCard>
          </FeatureGrid>
        </Container>
      </FullBleedSection>

      <FullBleedSection bg="primary">
        <Container>
          <SectionHeader
            eyebrow="Primary Background"
            title="Dark Section Variant"
            subtitle="Primary background with inverted text colors for high-contrast sections."
            align="center"
          />
        </Container>
      </FullBleedSection>

      <FullBleedSection bg="muted" pattern="dots">
        <Container>
          <SectionHeader
            eyebrow="Pattern Overlay"
            title="Dots Pattern"
            subtitle="Sections can include subtle dot or grid pattern overlays."
            align="center"
          />
        </Container>
      </FullBleedSection>
    </PageLayout>
  );
}
