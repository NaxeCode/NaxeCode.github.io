'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/lib/data-loader';
import { Card, CardContent, CardHeader, CardTitle, Badge, buttonVariants } from '@stargazers-stella/cosmic-ui';
import { Github, ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen pb-24 md:pb-32">
      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-16 sm:pt-20 lg:pt-24 space-y-10 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <div className="absolute -left-10 top-10 w-72 h-72 bg-primary/15 blur-3xl" />
          <div className="absolute right-0 bottom-0 w-80 h-80 bg-pink-500/10 blur-3xl" />
        </div>
        <Link
          href="/projects"
          className={buttonVariants({
            variant: 'ghost',
            className: 'inline-flex items-center gap-2 surface-muted border border-border px-4 py-2 rounded-full w-fit hover:border-primary/50 transition-colors relative overflow-hidden',
          })}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-pink-500/10 opacity-0 hover:opacity-100 transition-opacity" />
          <ArrowLeft className="h-4 w-4" />
          <span className="relative z-10">Back to Projects</span>
        </Link>

        <Card
          className="group relative tilt-card cosmic-card border border-border/50 bg-gradient-to-br from-surface/95 via-surface-strong/98 to-surface/95 backdrop-blur-2xl overflow-hidden"
          onMouseMove={(e) => {
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
          }}
          onMouseLeave={(e) => {
            const card = e.currentTarget;
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            const spotlightGreen = card.querySelector('.cosmic-spotlight-green') as HTMLElement;
            if (spotlightGreen) {
              spotlightGreen.style.opacity = '0';
            }
          }}
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
        <div className="absolute top-0 left-0 w-12 h-12 border-l border-t border-primary/30 rounded-tl-2xl" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-r border-b border-primary/30 rounded-br-2xl" />
        <CardHeader className="relative p-6 sm:p-8 md:p-10 lg:p-12">
          <div className="flex items-start justify-between gap-4 mb-6">
            <CardTitle className="text-5xl text-foreground">{project.title}</CardTitle>
            <Badge className="bg-gradient-to-r from-primary/30 to-pink-500/30 text-primary border-primary/40 shadow-lg shadow-primary/10 shrink-0">
              {project.year}
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">{project.summary}</p>

          <div className="flex flex-wrap gap-2 mt-6">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-border text-muted-foreground surface-muted">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-8 px-6 sm:px-8 md:px-10 lg:px-12 pb-6 sm:pb-8 md:pb-10 lg:pb-12">
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">About</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">{project.description}</p>
          </div>

          {project.stack && (
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Tech Stack</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {project.stack.frontend && project.stack.frontend.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Frontend</h4>
                    <ul className="space-y-1">
                      {project.stack.frontend.map((tech) => (
                        <li key={tech} className="text-sm text-muted-foreground">
                          • {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.stack.backend && project.stack.backend.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Backend</h4>
                    <ul className="space-y-1">
                      {project.stack.backend.map((tech) => (
                        <li key={tech} className="text-sm text-muted-foreground">
                          • {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.stack.database && project.stack.database.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Database</h4>
                    <ul className="space-y-1">
                      {project.stack.database.map((tech) => (
                        <li key={tech} className="text-sm text-muted-foreground">
                          • {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.stack.tools && project.stack.tools.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Tools</h4>
                    <ul className="space-y-1">
                      {project.stack.tools.map((tech) => (
                        <li key={tech} className="text-sm text-muted-foreground">
                          • {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: 'default',
                  className: 'bg-primary text-primary-foreground',
                })}
              >
                <Github className="h-4 w-4 mr-2" />
                View on GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: 'outline',
                })}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Live Demo
              </a>
            )}
          </div>
        </CardContent>
      </Card>
      </section>
    </main>
  );
}
