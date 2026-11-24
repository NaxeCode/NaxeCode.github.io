'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';

export default function Header() {
  const path = usePathname() || '/';
  return (
    <header className="site-header">
      <nav aria-label="Main navigation" className="portfolio-shell masthead">
        <Link className="masthead-brand" href="/" aria-label="Naxe, Aladdin Ali's home">
          {/* eslint-disable-next-line @next/next/no-img-element -- an exported static SVG mark */}
          <img src="/icon.svg" alt="" width="34" height="34" />
          <span>Naxe</span>
        </Link>
        <div className="masthead-links">
          <Link href="/projects/" aria-current={path.startsWith('/projects') ? 'page' : undefined}>
            Work
          </Link>
          <Link href="/about/" aria-current={path.startsWith('/about') ? 'page' : undefined}>
            About
          </Link>
          <a href="https://github.com/NaxeCode">
            GitHub <ArrowUpRight aria-hidden="true" size={13} />
          </a>
          <Link
            href="/contact/"
            className="nav-contact"
            aria-current={path.startsWith('/contact') ? 'page' : undefined}
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
