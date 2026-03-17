import Link from 'next/link';
import { Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-12 mt-auto">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand & Links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <Link
              href="/"
              className="font-semibold font-display text-lg no-underline text-foreground"
            >
              Tim Mitchell
            </Link>
            <nav className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground no-underline">
                Home
              </Link>
              <Link
                href="/consulting"
                className="hover:text-foreground no-underline"
              >
                Consulting
              </Link>
            </nav>
          </div>

          {/* Social & Contact */}
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com/in/semops-ai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted/80 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:hello@semops-ai.com"
              className="text-sm text-muted-foreground hover:text-foreground no-underline"
            >
              hello@semops-ai.com
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="divider" />
        <p className="text-center text-sm text-muted-foreground">
          &copy; {currentYear} Tim Mitchell. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
