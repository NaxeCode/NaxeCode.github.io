'use client';

import { ArrowRight, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Project } from '@/types/project';
import type { Copy } from '@/types/copy';
import { ProjectLink, OutboundLink } from '@/components/TrackedLink';
import { useInView } from '@/hooks/useInView';
import { useSectionTracking } from '@/hooks/useSectionTracking';
import { staggerContainer, staggerItem } from '@/lib/motion';

type Props = {
  projects: Project[];
  copy: Copy['sections']['projects'];
};

export function ProjectsSection({ projects, copy }: Props) {
  const { ref, inView } = useInView({ threshold: 0.1 });
  useSectionTracking({ sectionId: 'projects', threshold: 0.5 });

  if (!projects || projects.length === 0) {
    return null;
  }

  const featured = projects.filter((project) => project.featured);
  const primary = featured[0] ?? projects[0];
  const compact = projects.filter((project) => project.slug !== primary.slug);
  const hasCompact = compact.length > 0;
  const isWatchlistPrimary = primary.slug === 'stargazers-cosmic-watchlist';

  return (
    <section id="projects" className="scroll-mt-28 space-y-5" tabIndex={-1}>
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{copy.label}</p>
        <h2 className="text-3xl font-semibold text-foreground">{copy.heading}</h2>
        <p className="text-muted-foreground text-sm max-reading">{copy.description}</p>
      </div>
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid gap-4 md:gap-6 md:grid-cols-12"
      >
        <motion.article
          key={primary.slug}
          variants={staggerItem}
          className={`glass hover-rise relative overflow-hidden p-5 sm:p-6 space-y-3 ${
            hasCompact ? 'md:col-span-7' : 'md:col-span-12'
          }`}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary/60 via-cyan-400/50 to-transparent" />
          {isWatchlistPrimary && (
            <div className="relative overflow-hidden rounded-xl border border-border/60">
              <img
                src="/projects/cosmic-watchlist-hero.png"
                alt="Cosmic Watchlist hero"
                className="h-44 w-full object-cover sm:h-52"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 text-sm font-semibold uppercase tracking-[0.3em] text-white">
                Cosmic Watchlist
              </div>
            </div>
          )}
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              {!isWatchlistPrimary && (
                <h3 className="text-2xl font-semibold text-foreground">{primary.title}</h3>
              )}
              <p className="text-sm text-muted-foreground leading-relaxed max-reading">{primary.summary}</p>
            </div>
            <span className="pill text-[11px]">{primary.year}</span>
          </div>
          {primary.highlights && primary.highlights.length > 0 && (
            <ul className="space-y-1.5 text-sm text-foreground/90 list-disc list-inside max-reading">
              {primary.highlights.slice(0, 6).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          <div className="flex flex-wrap gap-2">
            {primary.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="pill">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-3 pt-1 text-sm">
            {primary.github && (
              <OutboundLink
                href={primary.github}
                label={`${primary.title} - GitHub`}
                className="inline-flex items-center gap-1 text-foreground hover:text-primary"
              >
                <Github className="h-4 w-4" />
                {copy.actions.code}
              </OutboundLink>
            )}
            <ProjectLink
              href={`/projects/${primary.slug}`}
              slug={primary.slug}
              title={primary.title}
              className="inline-flex items-center gap-1 text-primary hover:text-primary/80"
            >
              {copy.actions.details} <ArrowRight className="h-3.5 w-3.5" />
            </ProjectLink>
          </div>
        </motion.article>
        {hasCompact && (
          <div className="space-y-4 md:col-span-5">
            {compact.map((project) => (
              <motion.article
                key={project.slug}
                variants={staggerItem}
                className="surface relative overflow-hidden p-4 sm:p-5 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-reading">{project.summary}</p>
                  </div>
                  <span className="pill text-[11px]">{project.year}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="pill">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 pt-1 text-sm">
                  {project.github && (
                    <OutboundLink
                      href={project.github}
                      label={`${project.title} - GitHub`}
                      className="inline-flex items-center gap-1 text-foreground hover:text-primary"
                    >
                      <Github className="h-4 w-4" />
                      {copy.actions.code}
                    </OutboundLink>
                  )}
                  <ProjectLink
                    href={`/projects/${project.slug}`}
                    slug={project.slug}
                    title={project.title}
                    className="inline-flex items-center gap-1 text-primary hover:text-primary/80"
                  >
                    {copy.actions.details} <ArrowRight className="h-3.5 w-3.5" />
                  </ProjectLink>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
