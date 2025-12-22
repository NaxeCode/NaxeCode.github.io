'use client';

import type React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const handleHoverMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -1.5;
    const rotateY = ((x - centerX) / centerX) * 1.5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.005, 1.005, 1.005)`;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    const spotlight = card.querySelector('.cosmic-spotlight') as HTMLElement;
    const spotlightGreen = card.querySelector('.cosmic-spotlight-green') as HTMLElement;

    if (spotlight) {
      spotlight.style.background = `radial-gradient(circle 400px at ${percentX}% ${percentY}%, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.12) 30%, rgba(6, 182, 212, 0.08) 50%, transparent 70%)`;
    }
    if (spotlightGreen) {
      spotlightGreen.style.background = `radial-gradient(circle 400px at ${percentX}% ${percentY}%, rgba(16, 185, 129, 0.18), rgba(34, 197, 94, 0.14) 30%, rgba(20, 184, 166, 0.1) 50%, transparent 70%)`;
      spotlightGreen.style.opacity = '1';
    }
  };

  const handleHoverLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    const spotlightGreen = card.querySelector('.cosmic-spotlight-green') as HTMLElement;
    if (spotlightGreen) {
      spotlightGreen.style.opacity = '0';
    }
  };

  return (
    <footer className="relative mt-0 pb-6 sm:mt-4 sm:pb-8 lg:mt-6">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-surface/85 via-surface-strong/95 to-surface/85 px-4 py-5 backdrop-blur-xl shadow-lg shadow-primary/5 sm:px-6 sm:py-6 md:px-8"
          onMouseMove={handleHoverMove}
          onMouseLeave={handleHoverLeave}
        >
          <div className="cosmic-spotlight pointer-events-none absolute inset-0 opacity-30 transition-opacity duration-300 group-hover:opacity-60" />
          <div className="cosmic-spotlight-green pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="pointer-events-none absolute inset-0 opacity-0 sm:opacity-20">
            <div className="absolute -left-20 top-0 h-64 w-64 bg-primary/12 blur-3xl" />
            <div className="absolute -bottom-16 right-0 h-72 w-72 bg-pink-500/12 blur-3xl" />
          </div>

          <div className="pointer-events-none absolute inset-0 opacity-0 sm:opacity-30">
            <div
              className="absolute inset-0 w-[200%] -translate-x-1/2 animate-[prismShift_16s_linear_infinite]"
              style={{
                background:
                  'repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(139, 92, 246, 0.04) 80px, rgba(139, 92, 246, 0.04) 160px, transparent 160px, transparent 240px, rgba(236, 72, 153, 0.04) 240px, rgba(236, 72, 153, 0.04) 320px)'
              }}
            />
          </div>

          <div className="relative flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-between sm:gap-4 translate-y-1">
            <div className="flex justify-center gap-2 text-center sm:justify-start sm:text-left">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl border border-primary/30 bg-primary/15 text-primary shadow-md shadow-primary/10">
                ✦
              </span>
              <div className="flex flex-col h-full justify-end">
                <p className="text-sm leading-tight text-muted-foreground translate-y-1.5">
                  © {new Date().getFullYear()} Naxe<span className="text-primary">Code</span>. Crafted with cosmic-ui.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 sm:justify-end sm:gap-4 -translate-y-1">
              <a
                href="https://github.com/naxecode"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary transition-all hover:border-primary/50"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-pink-500/20 opacity-0 transition-opacity group-hover:opacity-100" />
                <Github className="relative z-10 h-4 w-4 transition-transform duration-200 group-hover:rotate-3" />
              </a>

              <a
                href="https://linkedin.com/in/aladdin-ali01"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary transition-all hover:border-primary/50"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-pink-500/20 opacity-0 transition-opacity group-hover:opacity-100" />
                <Linkedin className="relative z-10 h-4 w-4 transition-transform duration-200 group-hover:rotate-3" />
              </a>

              <a
                href="mailto:naxecode@proton.me"
                className="group relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary transition-all hover:border-primary/50"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-pink-500/20 opacity-0 transition-opacity group-hover:opacity-100" />
                <Mail className="relative z-10 h-4 w-4 transition-transform duration-200 group-hover:rotate-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
