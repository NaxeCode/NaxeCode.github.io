import type { Metadata } from 'next';
import { getProjectBySlug, loadProjects } from '@/lib/data-loader';

export async function generateStaticParams() {
  const projects = loadProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  // Each repo's social card (`.github/brand/social-preview.png`) doubles as its OG image.
  const repo = project.github?.match(/^https:\/\/github\.com\/([^/]+\/[^/#?]+)/)?.[1];
  const image = repo
    ? `https://raw.githubusercontent.com/${repo}/HEAD/.github/brand/social-preview.png`
    : '/og.png';
  return {
    title: `${project.title} · Aladdin Ali`,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      url: `https://naxecode.github.io/projects/${project.slug}/`,
      images: [{ url: image, width: 1280, height: 640, alt: project.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.summary,
      images: [image],
    },
  };
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
