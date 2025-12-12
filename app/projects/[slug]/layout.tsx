import { loadProjects } from '@/lib/data-loader';

export async function generateStaticParams() {
  const projects = loadProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
