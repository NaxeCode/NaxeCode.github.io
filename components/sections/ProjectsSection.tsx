'use client';

import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Project } from '@/types/project';
import type { Copy } from '@/types/copy';
import { ProjectLink, OutboundLink } from '@/components/TrackedLink';
import { IdentityRow } from '@/components/IdentityRow';
import { getBrand } from '@/lib/brand';
import { useInView } from '@/hooks/useInView';
import { useSectionTracking } from '@/hooks/useSectionTracking';
import { staggerContainer, staggerItem } from '@/lib/motion';

type Props = {
  projects: Project[];
  copy: Copy['sections']['projects'];
};

export function ProjectsSection({ projects, copy }: Props) {
  const { ref, inView } = useInView({ threshold: 0.05 });
  useSectionTracking({ sectionId: 'projects', threshold: 0.5 });

  if (!projects || projects.length === 0) return null;

  const featured = projects.filter((project) => project.featured);
  const primary = featured[0] ?? projects[0];

  return (
    <section id="projects" className="scroll-mt-20 space-y-10" tabIndex={-1}>
      <div className="space-y-3">
        <p className="eyebrow">{copy.label}</p>
        <h2 className="h2">{copy.heading}</h2>
        <p className="body max-reading">{copy.description}</p>
      </div>
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {projects.map((project) => {
          const isPrimary = project.slug === primary.slug;
          const highlights = isPrimary ? project.highlights?.slice(0, 4) ?? [] : [];
          return (
            <motion.article key={project.slug} variants={staggerItem} className="entry space-y-4 pb-8">
              <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                <IdentityRow brand={getBrand(project)} title={project.title} />
                <span className="meta pt-2">{project.year}</span>
              </div>
              <p className="body max-reading">{project.summary}</p>
              {highlights.length > 0 && (
                <ul className="body max-reading list-disc space-y-1 pl-5 marker:text-border">
                  {highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              <p className="tags">
                {project.tags.slice(0, 4).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
                {project.github && (
                  <OutboundLink href={project.github} label={`${project.title} - GitHub`} className="link">
                    <Github className="h-4 w-4" />
                    {copy.actions.code}
                  </OutboundLink>
                )}
                {project.demo && (
                  <OutboundLink href={project.demo} label={`${project.title} - Live Site`} className="link">
                    <ExternalLink className="h-4 w-4" />
                    {copy.actions.live}
                  </OutboundLink>
                )}
                <ProjectLink
                  href={`/projects/${project.slug}`}
                  slug={project.slug}
                  title={project.title}
                  className="link-strong"
                >
                  {copy.actions.details} <ArrowRight className="h-4 w-4" />
                </ProjectLink>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
