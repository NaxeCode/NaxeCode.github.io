import { loadProjects } from '@/lib/data-loader';
import { ProjectFilter } from '@/components/project/ProjectFilter';

export const metadata = {
  title: 'Projects - NaxeCode',
  description: 'Full-stack projects, games, tools, and design systems built with Next.js, TypeScript, .NET, and more.',
};

export default function ProjectsPage() {
  const projects = loadProjects();

  return (
    <div className="container mx-auto max-w-6xl px-4 py-16">
      <div className="mb-16">
        <h1 className="text-5xl font-bold text-foreground mb-6">Projects</h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          A collection of full-stack applications, games, tools, and design systems showcasing my work across web development, AI integration, and fintech.
        </p>
      </div>

      <ProjectFilter projects={projects} />
    </div>
  );
}
