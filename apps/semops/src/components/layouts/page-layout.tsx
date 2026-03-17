import { cn } from '@/lib/utils';

/**
 * Page width variants
 */
type PageWidth = 'narrow' | 'default' | 'wide' | 'full';

const widthClasses: Record<PageWidth, string> = {
  narrow: 'max-w-2xl',    // ~672px - blog posts, focused reading
  default: 'max-w-4xl',   // ~896px - most pages
  wide: 'max-w-6xl',      // ~1152px - dashboards, galleries
  full: 'max-w-none',     // full container width
};

export interface PageLayoutProps {
  children: React.ReactNode;
  /** Page width constraint */
  width?: PageWidth;
  /** Additional classes */
  className?: string;
}

/**
 * Main page container with consistent padding and max-width.
 *
 * @example
 * <PageLayout width="narrow">
 *   <PageHeader title="Blog Post" />
 *   <article>...</article>
 * </PageLayout>
 */
export function PageLayout({
  children,
  width = 'default',
  className
}: PageLayoutProps) {
  return (
    <div className={cn(
      'container mx-auto px-4 py-12 md:py-16',
      widthClasses[width],
      className
    )}>
      {children}
    </div>
  );
}

export interface PageHeaderProps {
  /** Page title (h1) */
  title: string;
  /** Optional subtitle/description */
  subtitle?: string;
  /** Additional content (badges, actions, etc.) */
  children?: React.ReactNode;
  /** Additional classes */
  className?: string;
}

/**
 * Consistent page header with title and optional subtitle.
 *
 * @example
 * <PageHeader
 *   title="Career Timeline"
 *   subtitle="Product leadership journey across enterprise..."
 * />
 */
export function PageHeader({
  title,
  subtitle,
  children,
  className
}: PageHeaderProps) {
  return (
    <header className={cn('mb-12', className)}>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg text-muted-foreground">
          {subtitle}
        </p>
      )}
      {children}
    </header>
  );
}

export interface SectionProps {
  children: React.ReactNode;
  /** Optional section title */
  title?: string;
  /** Additional classes */
  className?: string;
}

/**
 * Content section with consistent vertical spacing.
 *
 * @example
 * <Section title="Experience">
 *   <PositionCard ... />
 * </Section>
 */
export function Section({
  children,
  title,
  className
}: SectionProps) {
  return (
    <section className={cn('py-8 md:py-12', className)}>
      {title && (
        <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      )}
      {children}
    </section>
  );
}
