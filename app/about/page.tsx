'use client';

import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@stargazers-stella/cosmic-ui';
import { loadSkills, loadAbout } from '@/lib/data-loader';
import { SkillsVisualization } from '@/components/skills/SkillsVisualization';

export default function AboutPage() {
  const skills = loadSkills();
  const about = loadAbout();

  const handleInteractiveHover = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -2;
    const rotateY = ((x - centerX) / centerX) * 2;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;

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

  const handleInteractiveLeave = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    const spotlightGreen = card.querySelector('.cosmic-spotlight-green') as HTMLElement;
    if (spotlightGreen) {
      spotlightGreen.style.opacity = '0';
    }
  };

  return (
    <main className="min-h-screen pb-4">
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-3 sm:pt-4 lg:pt-6 space-y-0 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <div className="absolute -left-10 top-10 w-72 h-72 bg-primary/15 blur-3xl" />
          <div className="absolute right-0 bottom-0 w-80 h-80 bg-pink-500/10 blur-3xl" />
        </div>
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full surface-muted px-3 py-1 text-sm text-muted-foreground ring-1 ring-border/60">
            <span className="text-xs uppercase tracking-[0.08em] text-primary">About</span>
            <span className="text-xs text-muted-foreground">Story, skills, and what I build</span>
          </div>
          <div className="space-y-3">
            <h1 className="text-5xl font-bold text-foreground">About Me</h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{about.bio}</p>
            <div className="flex flex-wrap gap-2 pt-1 pb-6">
              <span className="rounded-full surface-muted px-3 py-1 text-xs text-muted-foreground border border-border/60">
                Product-minded engineer
              </span>
              <span className="rounded-full surface-muted px-3 py-1 text-xs text-muted-foreground border border-border/60">
                Fintech + AI
              </span>
              <span className="rounded-full surface-muted px-3 py-1 text-xs text-muted-foreground border border-border/60">
                Design systems
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
          {/* Journey */}
          <Card
            className="group relative tilt-card cosmic-card border border-border/50 bg-gradient-to-br from-surface/95 via-surface-strong/98 to-surface/95 backdrop-blur-2xl overflow-hidden h-full"
            onMouseMove={handleInteractiveHover}
            onMouseLeave={handleInteractiveLeave}
          >
            <div className="cosmic-spotlight absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none" />
            <div className="cosmic-spotlight-green absolute inset-0 pointer-events-none transition-opacity duration-300" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background:
                    'repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(139, 92, 246, 0.03) 80px, rgba(139, 92, 246, 0.03) 160px, transparent 160px, transparent 240px, rgba(236, 72, 153, 0.03) 240px, rgba(236, 72, 153, 0.03) 320px)',
                  transform: 'translateX(-50%)',
                  width: '200%',
                  animation: 'prismShift 20s linear infinite',
                }}
              />
            </div>
            <div className="absolute top-0 left-0 w-10 h-10 border-l border-t border-primary/30 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-r border-b border-primary/30 rounded-br-2xl" />
            <CardHeader className="p-6 sm:p-7 lg:p-8">
              <CardTitle className="text-2xl text-foreground">Journey</CardTitle>
              <CardDescription className="text-base mt-1">My path as a developer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 px-6 sm:px-7 lg:px-8 pb-6 sm:pb-7 lg:pb-8">
              {about.journey.map((experience: any, index: number) => (
                <div key={index} className="relative pl-4 sm:pl-5">
                  <div className="absolute left-0 top-0 h-full w-px bg-border/70" />
                  <div className="absolute left-0 top-2 h-2 w-2 rounded-full bg-primary" />
                  <h3 className="text-lg font-semibold text-foreground">{experience.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{experience.period}</p>
                  <p className="text-muted-foreground leading-relaxed">{experience.description}</p>
                </div>
              ))}
              </CardContent>
            </Card>

          {/* Skills & Expertise */}
          <Card
            className="group relative tilt-card cosmic-card border border-border/50 bg-gradient-to-br from-surface/95 via-surface-strong/98 to-surface/95 backdrop-blur-2xl overflow-hidden h-full"
            onMouseMove={handleInteractiveHover}
            onMouseLeave={handleInteractiveLeave}
          >
            <div className="cosmic-spotlight absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none" />
            <div className="cosmic-spotlight-green absolute inset-0 pointer-events-none transition-opacity duration-300" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background:
                    'repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(139, 92, 246, 0.03) 80px, rgba(139, 92, 246, 0.03) 160px, transparent 160px, transparent 240px, rgba(236, 72, 153, 0.03) 240px, rgba(236, 72, 153, 0.03) 320px)',
                  transform: 'translateX(-50%)',
                  width: '200%',
                  animation: 'prismShift 20s linear infinite',
                }}
              />
            </div>
            <div className="absolute top-0 left-0 w-10 h-10 border-l border-t border-primary/30 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-r border-b border-primary/30 rounded-br-2xl" />
            <CardHeader className="p-6 sm:p-7 lg:p-8">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-2xl text-foreground">Skills & Expertise</CardTitle>
                  <CardDescription className="text-base mt-1">C#/.NET backend focus plus full-stack delivery</CardDescription>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/30 px-3 py-1 text-xs text-primary font-semibold">
                  ✦ curated
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 px-6 sm:px-7 lg:px-8 pb-6 sm:pb-7 lg:pb-8">
              <div className="grid gap-3 sm:gap-4 lg:gap-5">
                <div className="rounded-xl surface-muted border border-border/50 px-3 py-2 text-sm text-muted-foreground">
                  Full-stack shipping with C#/.NET APIs, background workers, and React/Next.js frontends.
                </div>
                <div className="rounded-xl surface-muted border border-border/50 px-3 py-2 text-sm text-muted-foreground">
                  Design systems, dashboards, finance/AI flows, and desktop UI (WPF, MVVM).
                </div>
              </div>
              <div className="mt-2">
                <SkillsVisualization categories={skills} />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
