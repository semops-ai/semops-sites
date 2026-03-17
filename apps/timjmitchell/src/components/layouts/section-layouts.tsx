import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * Background variants for full-bleed sections
 */
type SectionBackground = 'default' | 'muted' | 'secondary' | 'primary';

const bgClasses: Record<SectionBackground, string> = {
  default: 'bg-background text-foreground',
  muted: 'bg-muted text-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  primary: 'bg-primary text-primary-foreground',
};

/* =============================================================================
   FullBleedSection
   ============================================================================= */

/** Pattern overlay variants */
type PatternVariant = 'dots' | 'grid' | 'none';

const patternClasses: Record<PatternVariant, string> = {
  none: '',
  dots: 'pattern-dots',
  grid: 'pattern-grid',
};

export interface FullBleedSectionProps {
  children: React.ReactNode;
  /** Background color variant */
  bg?: SectionBackground;
  /** Pattern overlay */
  pattern?: PatternVariant;
  /** Additional classes for the outer wrapper */
  className?: string;
  /** ID for anchor linking */
  id?: string;
}

/**
 * Full-width section that breaks out of the container.
 * Use with Container inside to constrain content width.
 *
 * @example
 * <FullBleedSection bg="primary">
 *   <Container>
 *     <h2>Section Title</h2>
 *   </Container>
 * </FullBleedSection>
 */
export function FullBleedSection({
  children,
  bg = 'default',
  pattern = 'none',
  className,
  id,
}: FullBleedSectionProps) {
  return (
    <section
      id={id}
      data-theme={bg === 'primary' ? 'dark' : undefined}
      className={cn(
        'relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]',
        'py-16 md:py-24',
        bgClasses[bg],
        patternClasses[pattern],
        className
      )}
    >
      {children}
    </section>
  );
}

/* =============================================================================
   Container
   ============================================================================= */

type ContainerWidth = 'narrow' | 'default' | 'wide';

const containerWidths: Record<ContainerWidth, string> = {
  narrow: 'max-w-3xl',   // ~768px
  default: 'max-w-5xl', // ~1024px
  wide: 'max-w-6xl',    // ~1152px
};

export interface ContainerProps {
  children: React.ReactNode;
  /** Content width constraint */
  width?: ContainerWidth;
  /** Additional classes */
  className?: string;
}

/**
 * Centered container with max-width constraint.
 * Use inside FullBleedSection to contain content.
 *
 * @example
 * <Container width="wide">
 *   <div className="grid md:grid-cols-3 gap-6">...</div>
 * </Container>
 */
export function Container({
  children,
  width = 'default',
  className,
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto px-6 md:px-8',
        containerWidths[width],
        className
      )}
    >
      {children}
    </div>
  );
}

/* =============================================================================
   ContentCard
   ============================================================================= */

export interface ContentCardProps {
  children: React.ReactNode;
  /** Additional classes */
  className?: string;
  /** Hover effect */
  hover?: boolean;
}

/**
 * Rounded card container for use in contrast sections.
 * Light background for visibility on dark sections.
 *
 * @example
 * <FullBleedSection bg="primary">
 *   <Container>
 *     <div className="grid md:grid-cols-3 gap-6">
 *       <ContentCard>Feature 1</ContentCard>
 *       <ContentCard>Feature 2</ContentCard>
 *     </div>
 *   </Container>
 * </FullBleedSection>
 */
export function ContentCard({
  children,
  className,
  hover = false,
}: ContentCardProps) {
  return (
    <div
      className={cn(
        'bg-background text-foreground',
        'rounded-xl p-6 md:p-8',
        'border border-border',
        'shadow-sm h-full',
        hover && 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
        className
      )}
    >
      {children}
    </div>
  );
}

/* =============================================================================
   FeatureCard
   ============================================================================= */

export interface FeatureCardProps {
  /** Card title */
  title: string;
  /** Card description */
  description: string;
  /** Hover lift effect */
  hover?: boolean;
  /** Link wrapping the card */
  href?: string;
  /** Additional classes */
  className?: string;
}

/**
 * Card with title + description for feature grids.
 * Optionally wraps in a link.
 *
 * @example
 * <FeatureCard
 *   title="Strategic Data"
 *   description="A playbook for making data strategic."
 *   href="/consulting"
 *   hover
 * />
 */
export function FeatureCard({
  title,
  description,
  hover = false,
  href,
  className,
}: FeatureCardProps) {
  const card = (
    <ContentCard hover={hover} className={className}>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </ContentCard>
  );

  if (href) {
    return (
      <Link href={href} className="no-underline">
        {card}
      </Link>
    );
  }

  return card;
}

/* =============================================================================
   Eyebrow
   ============================================================================= */

export interface EyebrowProps {
  children: React.ReactNode;
  /** Additional classes */
  className?: string;
  /** Accent line color */
  accent?: 'accent' | 'primary' | 'muted';
}

const accentColors: Record<string, string> = {
  accent: 'bg-accent',
  primary: 'bg-primary',
  muted: 'bg-muted-foreground',
};

/**
 * Eyebrow label with short accent line above.
 * Use for section labels and category markers.
 *
 * @example
 * <Eyebrow>The Problem</Eyebrow>
 * <h2>Why AI Integration Fails</h2>
 */
export function Eyebrow({
  children,
  className,
  accent = 'primary',
}: EyebrowProps) {
  return (
    <div className={cn('mb-4', className)}>
      <div
        className={cn(
          'w-10 h-0.5 mb-3',
          accentColors[accent]
        )}
        aria-hidden="true"
      />
      <span className="text-sm font-medium uppercase tracking-wide text-primary">
        {children}
      </span>
    </div>
  );
}

/* =============================================================================
   SectionDivider
   ============================================================================= */

export interface SectionDividerProps {
  /** Additional classes */
  className?: string;
}

/**
 * Horizontal divider line for separating sections.
 *
 * @example
 * <Section>...</Section>
 * <SectionDivider />
 * <Section>...</Section>
 */
export function SectionDivider({ className }: SectionDividerProps) {
  return (
    <hr
      className={cn(
        'border-0 h-px bg-border my-12 md:my-16',
        className
      )}
    />
  );
}

/* =============================================================================
   SectionHeader
   ============================================================================= */

export interface SectionHeaderProps {
  /** Eyebrow text (optional) */
  eyebrow?: string;
  /** Main title */
  title: string;
  /** Subtitle/description (optional) */
  subtitle?: string;
  /** Eyebrow accent color */
  accent?: 'accent' | 'primary' | 'muted';
  /** Text alignment */
  align?: 'left' | 'center';
  /** Size variant — hero renders h1 with larger text */
  size?: 'default' | 'hero';
  /** Content below subtitle (e.g. ActionLinks) */
  children?: React.ReactNode;
  /** Additional classes */
  className?: string;
}

/**
 * Complete section header with eyebrow, title, subtitle, and optional children.
 *
 * @example
 * <SectionHeader
 *   eyebrow="Our Approach"
 *   title="Three Pillars of Semantic Operations"
 *   subtitle="A practical framework for AI-ready organizations"
 * />
 *
 * @example
 * <SectionHeader size="hero" eyebrow="Welcome" title="Hero Title" subtitle="...">
 *   <ActionLink href="/consulting">Explore →</ActionLink>
 * </SectionHeader>
 */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  accent = 'primary',
  align = 'left',
  size = 'default',
  children,
  className,
}: SectionHeaderProps) {
  const isHero = size === 'hero';
  const Heading = isHero ? 'h1' : 'h2';

  return (
    <div
      className={cn(
        'mb-10 md:mb-12',
        align === 'center' && 'text-center flex flex-col items-center',
        className
      )}
    >
      {eyebrow && <Eyebrow accent={accent}>{eyebrow}</Eyebrow>}
      <Heading
        className={cn(
          'font-medium tracking-tight mb-4 !text-inherit',
          isHero ? 'text-3xl md:text-4xl mb-6' : 'text-2xl md:text-3xl'
        )}
      >
        {title}
      </Heading>
      {subtitle && (
        <p
          className={cn(
            'text-muted-foreground max-w-2xl',
            isHero ? 'text-lg md:text-xl leading-relaxed mb-8' : 'text-lg'
          )}
        >
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}

/* =============================================================================
   FeatureGrid
   ============================================================================= */

export interface FeatureGridProps {
  children: React.ReactNode;
  /** Number of columns at md breakpoint */
  cols?: 2 | 3 | 4;
  /** Additional classes */
  className?: string;
}

const colClasses: Record<number, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
};

/**
 * Responsive grid for feature cards.
 *
 * @example
 * <FeatureGrid cols={3}>
 *   <ContentCard>...</ContentCard>
 *   <ContentCard>...</ContentCard>
 *   <ContentCard>...</ContentCard>
 * </FeatureGrid>
 */
export function FeatureGrid({
  children,
  cols = 3,
  className,
}: FeatureGridProps) {
  return (
    <div
      className={cn(
        'grid gap-6',
        colClasses[cols],
        className
      )}
    >
      {children}
    </div>
  );
}
