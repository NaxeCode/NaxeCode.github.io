import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { getProjectBySlug, loadCopy } from "@/lib/data-loader";
import { OutboundLink } from "@/components/TrackedLink";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const copy = loadCopy();

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 space-y-6">
        <div className="pt-8">
          <Link
            href="/#projects"
            className="btn-press inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-surface-muted/70"
          >
            <ArrowLeft className="h-4 w-4" />
            {copy.projectsDetail.back}
          </Link>
        </div>

        <div className="glass relative overflow-hidden p-6 sm:p-8 space-y-4 hover-rise">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/10 via-transparent to-cyan-400/5" />
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold text-foreground">{project.title}</h1>
              <p className="text-muted-foreground text-base">{project.summary}</p>
            </div>
            <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
              {project.year}
            </span>
          </div>

          {project.highlights && project.highlights.length > 0 && (
            <ul className="space-y-2 text-sm text-foreground/90 list-disc list-inside">
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}

          <div className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">{copy.projectsDetail.tags}</h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border/70 bg-surface-muted px-3 py-1 text-xs font-semibold text-foreground/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">{copy.projectsDetail.description}</h2>
            <p className="text-muted-foreground leading-relaxed">{project.description}</p>
          </div>

          {project.stack && (
            <div className="grid gap-4 sm:grid-cols-2">
              {project.stack.frontend && project.stack.frontend.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">{copy.projectsDetail.stack.frontend}</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {project.stack.frontend.map((tech) => (
                      <li key={tech}>• {tech}</li>
                    ))}
                  </ul>
                </div>
              )}
              {project.stack.backend && project.stack.backend.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">{copy.projectsDetail.stack.backend}</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {project.stack.backend.map((tech) => (
                      <li key={tech}>• {tech}</li>
                    ))}
                  </ul>
                </div>
              )}
              {project.stack.database && project.stack.database.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">{copy.projectsDetail.stack.database}</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {project.stack.database.map((tech) => (
                      <li key={tech}>• {tech}</li>
                    ))}
                  </ul>
                </div>
              )}
              {project.stack.tools && project.stack.tools.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">{copy.projectsDetail.stack.tools}</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {project.stack.tools.map((tech) => (
                      <li key={tech}>• {tech}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            {project.github && (
              <OutboundLink
                href={project.github}
                label={`${project.title} - GitHub`}
                className="btn-press inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                <Github className="h-4 w-4" />
                {copy.projectsDetail.viewCode}
              </OutboundLink>
            )}
            {project.demo && (
              <OutboundLink
                href={project.demo}
                label={`${project.title} - Demo`}
                className="btn-press inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground"
              >
                <ExternalLink className="h-4 w-4" />
                {copy.projectsDetail.liveDemo}
              </OutboundLink>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
