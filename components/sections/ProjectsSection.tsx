import { ArrowRight, Github } from 'lucide-react';
import type { Project } from '@/types/project';
import type { Copy } from '@/types/copy';
import { ProjectLink, OutboundLink } from '@/components/TrackedLink';

type Props = {
  projects: Project[];
  copy: Copy['sections']['projects'];
};

export function ProjectsSection({ projects, copy }: Props) {
  return (
    <section id="projects" className="scroll-mt-28 space-y-5 section-fade" tabIndex={-1}>
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{copy.label}</p>
        <h2 className="text-3xl font-semibold text-foreground">{copy.heading}</h2>
        <p className="text-muted-foreground text-sm max-reading">{copy.description}</p>
      </div>
      <div className="grid gap-4 md:gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="glass hover-rise relative overflow-hidden p-5 sm:p-6 space-y-3"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary/60 via-cyan-400/50 to-transparent" />
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-reading">{project.summary}</p>
              </div>
              <span className="pill text-[11px]">{project.year}</span>
            </div>
            {project.highlights && project.highlights.length > 0 && (
              <ul className="space-y-1.5 text-sm text-foreground/90 list-disc list-inside max-reading">
                {project.highlights.slice(0, 3).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((tag) => (
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
          </div>
        ))}
      </div>
    </section>
  );
}
