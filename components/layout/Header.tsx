'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonVariants } from '@stargazers-stella/cosmic-ui';
import { Github, Linkedin } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <nav className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-semibold text-foreground">
          Naxe<span className="text-primary">Code</span>
        </Link>

        <div className="flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition ${
                pathname === link.href
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex gap-2">
          <a
            href="https://github.com/naxecode"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: 'ghost', size: 'sm' })}
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com/in/aladdin-ali01"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: 'ghost', size: 'sm' })}
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </nav>
    </header>
  );
}
