import { loadProjects } from '@/lib/data-loader';
import { ProjectFilter } from '@/components/project/ProjectFilter';

export const metadata = {
  title: 'Projects - NaxeCode',
  description: 'Full-stack projects, games, tools, and design systems built with Next.js, TypeScript, .NET, and more.',
};

export default function ProjectsPage() {
  const projects = loadProjects();
  const categoriesCount = new Set(projects.map((p: any) => p.category)).size;
  const featuredCount = projects.filter((p: any) => p.featured).length;

  return (
    <main className="min-h-screen pb-24 md:pb-32">
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-3 sm:pt-4 lg:pt-6 space-y-0 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute -left-10 top-10 w-72 h-72 bg-primary/12 blur-3xl" />
          <div className="absolute right-0 bottom-0 w-80 h-80 bg-pink-500/10 blur-3xl" />
        </div>

        <div className="space-y-4 relative">
          <div className="inline-flex items-center gap-2 rounded-full surface-muted px-3 py-1 text-sm text-muted-foreground ring-1 ring-border/60 shadow-sm shadow-primary/10">
            <span className="text-xs uppercase tracking-[0.08em] text-primary">Projects</span>
            <span className="text-xs text-muted-foreground">Builds, experiments, and systems</span>
          </div>
          <div className="space-y-3">
            <h1 className="text-5xl font-bold text-foreground">Projects</h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              A collection of full-stack applications, games, tools, and design systems showcasing my work across web development, AI integration, and fintech.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 pt-1">
            <span className="inline-flex items-center gap-2 rounded-full surface-muted px-3 py-1 text-sm text-foreground/90 border border-border">
              <span className="h-2 w-2 rounded-full bg-primary/70" />
              {projects.length} projects
            </span>
            <span className="inline-flex items-center gap-2 rounded-full surface-muted px-3 py-1 text-sm text-foreground/90 border border-border">
              <span className="h-2 w-2 rounded-full bg-primary/60" />
              {categoriesCount} categories
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary border border-primary/30">
              <span className="h-2 w-2 rounded-full bg-pink-500/80" />
              {featuredCount} featured
            </span>
          </div>
        </div>

        <div className="relative rounded-3xl border border-border/40 bg-gradient-to-br from-surface/80 via-surface-strong/90 to-surface/80 backdrop-blur-2xl p-6 sm:p-8 lg:p-10 shadow-xl shadow-black/10 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/12 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-pink-500/12 rounded-full blur-3xl" />
          </div>
          <ProjectFilter projects={projects} />
        </div>
      </section>
    </main>
  );
}
