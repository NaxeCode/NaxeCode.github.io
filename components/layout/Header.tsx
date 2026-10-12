'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnchorLink } from "./AnchorLink";
import { loadCopy } from "@/lib/data-loader";
import { useActiveSection } from "@/hooks/useActiveSection";

const SECTIONS = ['about', 'projects', 'experience', 'journey'] as const;

export default function Header() {
  const copy = loadCopy();
  const pathname = usePathname();
  const activeSection = useActiveSection([...SECTIONS]);
  const isHomepage = pathname === '/';
  const NavLink = isHomepage ? AnchorLink : Link;

  return (
    // Header (spec section 6): mark, wordmark hidden under 640 px, four text links, aurora underline on the active
    // one, a bottom fade and no border.
    <header className="sticky top-0 z-40">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/85 to-transparent" />
      <nav className="mx-auto flex h-14 max-w-page items-center justify-between gap-3 px-4 sm:px-6 md:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 text-foreground">
          {/* eslint-disable-next-line @next/next/no-img-element -- static SVG mark */}
          <img src="/icon.svg" alt="" width={28} height={28} className="tile h-6 w-6 sm:h-7 sm:w-7" />
          <span className="hidden text-base font-semibold sm:inline">{copy.site.brand}</span>
        </Link>
        <div className="flex items-center gap-0 sm:gap-2">
          {SECTIONS.map((id) => {
            const isActive = isHomepage && activeSection === id;
            return (
              <NavLink
                key={id}
                href={isHomepage ? `#${id}` : `/#${id}`}
                className={`relative px-1.5 py-2 text-xs font-medium sm:px-3 sm:text-sm ${
                  isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {copy.nav[id]}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-1.5 -bottom-0.5 h-0.5 rounded-full transition-opacity duration-200 sm:inset-x-3"
                  style={{ background: 'var(--aura)', opacity: isActive ? 1 : 0 }}
                />
              </NavLink>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
