'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnchorLink } from "./AnchorLink";
import { loadCopy } from "@/lib/data-loader";
import { useActiveSection } from "@/hooks/useActiveSection";

export default function Header() {
  const copy = loadCopy();
  const pathname = usePathname();
  const activeSection = useActiveSection(['about', 'projects', 'experience', 'journey']);

  // Only show active section indicator on homepage
  const isHomepage = pathname === '/';

  const getLinkClass = (sectionId: string) => {
    const baseClass = "rounded-lg px-3 py-2 text-sm font-medium transition-colors";
    const isActive = isHomepage && activeSection === sectionId;

    if (isActive) {
      return `${baseClass} text-primary bg-primary/10 border border-primary/30`;
    }

    return `${baseClass} text-foreground/90 hover:text-primary hover:bg-surface-muted/80`;
  };

  // If on homepage, use AnchorLink for smooth scrolling
  // If on other pages, use regular Link to navigate to homepage first
  const NavLink = isHomepage ? AnchorLink : Link;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl shadow-[0_10px_60px_-45px_rgba(59,130,246,0.6)]">
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
          {copy.site.brand}
        </Link>
        <div className="flex items-center gap-2">
          <NavLink
            href={isHomepage ? "#about" : "/#about"}
            className={getLinkClass('about')}
          >
            {copy.nav.about}
          </NavLink>
          <NavLink
            href={isHomepage ? "#projects" : "/#projects"}
            className={getLinkClass('projects')}
          >
            {copy.nav.projects}
          </NavLink>
          <NavLink
            href={isHomepage ? "#experience" : "/#experience"}
            className={getLinkClass('experience')}
          >
            {copy.nav.experience}
          </NavLink>
          <NavLink
            href={isHomepage ? "#journey" : "/#journey"}
            className={getLinkClass('journey')}
          >
            {copy.nav.journey}
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
