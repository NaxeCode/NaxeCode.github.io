import type { Metadata } from 'next';
import { getStudy, studies } from '@/lib/case-studies';
import { getProjectBySlug, loadProjects } from '@/lib/data-loader';

export async function generateStaticParams() {
  return Array.from(new Set([...studies, ...loadProjects()].map(item => item.slug)), slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = getStudy(slug);
  if (study) {
    const title = `${study.name} | Aladdin Ali`;
    const image = study.image ?? '/labs/frame-triage/assets/lead-reference.png';
    return { title, description: study.summary, alternates: { canonical: `/projects/${slug}/` },
      openGraph: { title, description: study.summary, url: `/projects/${slug}/`, images: [image] },
      twitter: { card: 'summary_large_image', title, description: study.summary, images: [image] } };
  }
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
      url: `https://naxe.dev/projects/${project.slug}/`,
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
