'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
 { href: '/', label: 'Home' },
 { href: '/blog', label: 'Blog' },
 { href: '/consulting', label: 'Consulting' },
];

export function Nav {
 const pathname = usePathname;

 return (
 <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
 <div className="container mx-auto px-4">
 <div className="flex h-[74px] md:h-[82px] items-center justify-between">
 {/* Logo */}
 <Link href="/" className="no-underline hover:no-underline">
 <Image
 src="/images/web-name-logo.png"
 alt="Tim J Mitchell"
 width={180}
 height={32}
 className="h-7 md:h-8 w-auto"
 priority
 />
 </Link>

 {/* Navigation Links */}
 <nav className="flex items-center gap-1 md:gap-2">
 {navItems.map((item) => {
 const isActive =
 item.href === '/'
 ? pathname === '/'
 : pathname.startsWith(item.href);

 return (
 <Link
 key={item.href}
 href={item.href}
 className={cn(
 'px-2 md:px-3 py-1.5 text-sm rounded-md transition-colors no-underline hover:no-underline',
 isActive
 ? 'bg-primary/10 text-primary font-medium'
 : 'text-muted-foreground hover:text-foreground hover:bg-muted'
 )}
 >
 {item.label}
 </Link>
 );
 })}
 </nav>
 </div>
 </div>
 </header>
 );
}
