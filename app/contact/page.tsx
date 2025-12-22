'use client';

import type React from 'react';
import { ContactForm } from '@/components/contact/ContactForm';
import { Card, CardContent } from '@stargazers-stella/cosmic-ui';
import { Mail, Github, Linkedin } from 'lucide-react';

export default function ContactPage() {
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
    <main className="min-h-screen pb-24 md:pb-32">
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-16 sm:pt-20 lg:pt-24 space-y-12 lg:space-y-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <div className="absolute -left-10 top-10 w-72 h-72 bg-primary/15 blur-3xl" />
          <div className="absolute right-0 bottom-0 w-80 h-80 bg-pink-500/10 blur-3xl" />
        </div>
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full surface-muted px-3 py-1 text-sm text-muted-foreground ring-1 ring-border/60">
            <span className="text-xs uppercase tracking-[0.08em] text-primary">Contact</span>
            <span className="text-xs text-muted-foreground">Collaboration and new projects</span>
          </div>
          <div className="space-y-3">
            <h1 className="text-5xl font-bold text-foreground">Contact</h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Let&apos;s connect! Whether you have a project in mind, want to collaborate, or just want to say hi.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1fr_0.8fr]">
          <ContactForm />

          <div className="space-y-6">
            <Card
              className="group relative tilt-card cosmic-card border border-border/50 bg-gradient-to-br from-surface/95 via-surface-strong/98 to-surface/95 backdrop-blur-2xl overflow-hidden"
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
              <CardContent className="p-6 sm:p-8 lg:p-10 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Other ways to reach me</h3>
                  <div className="space-y-3">
                    <a
                      href="mailto:naxecode@proton.me"
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                      <span>naxecode@proton.me</span>
                    </a>
                    <a
                      href="https://github.com/naxecode"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="h-5 w-5" />
                      <span>@naxecode</span>
                    </a>
                    <a
                      href="https://linkedin.com/in/aladdin-ali01"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span>Aladdin Ali</span>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="group relative tilt-card cosmic-card border border-border/50 bg-gradient-to-br from-surface/95 via-surface-strong/98 to-surface/95 backdrop-blur-2xl overflow-hidden"
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
              <CardContent className="p-6 sm:p-8 lg:p-10">
                <h3 className="text-lg font-semibold text-foreground mb-3">Quick response</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I typically respond within 24-48 hours. For urgent inquiries, feel free to reach out via email directly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
