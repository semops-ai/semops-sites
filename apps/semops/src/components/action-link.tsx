import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface ActionLinkProps {
 href: string;
 children: React.ReactNode;
 /** Resting state color */
 variant?: 'default' | 'muted';
 /** External link (opens in new tab) */
 external?: boolean;
 className?: string;
}

const variantClasses = {
 default: 'font-medium',
 muted: 'text-muted-foreground',
};

export function ActionLink({
 href,
 children,
 variant = 'default',
 external = false,
 className,
}: ActionLinkProps) {
 const classes = cn(
 'text-sm hover:text-secondary transition-colors no-underline',
 variantClasses[variant],
 className
 );

 if (external) {
 return (
 <a
 href={href}
 target="_blank"
 rel="noopener noreferrer"
 className={classes}
 >
 {children}
 </a>
 );
 }

 return (
 <Link href={href} className={classes}>
 {children}
 </Link>
 );
}
