import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BackLinkProps {
 href: string;
 children: React.ReactNode;
 className?: string;
}

export function BackLink({ href, children, className }: BackLinkProps) {
 return (
 <Link
 href={href}
 className={cn(
 'inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors no-underline mb-8',
 className
 )}
 >
 <ArrowLeft className="w-4 h-4" />
 {children}
 </Link>
 );
}
