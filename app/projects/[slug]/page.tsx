import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { getProjectBySlug, loadCopy } from "@/lib/data-loader";
import { OutboundLink } from "@/components/TrackedLink";
import { IdentityRow } from "@/components/IdentityRow";
import { getBrand } from "@/lib/brand";

// Cosmic Watchlist keeps its screenshots on the detail page as a static pair (brand spec section 11, decision 3).
const watchlistShots = [
  { src: '/projects/landing-header.png', alt: 'Cosmic Watchlist landing page' },
  { src: '/projects/demo-your-collection.png', alt: 'Cosmic Watchlist collection view' },
];

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const copy = loadCopy();

  if (!project) {
    notFound();
  }

  const stack = [
    { label: copy.projectsDetail.stack.frontend, items: project.stack?.frontend },
    { label: copy.projectsDetail.stack.backend, items: project.stack?.backend },
    { label: copy.projectsDetail.stack.database, items: project.stack?.database },
    { label: copy.projectsDetail.stack.tools, items: project.stack?.tools },
  ].filter((group) => group.items && group.items.length > 0);
  const isWatchlist = project.slug === "stargazers-cosmic-watchlist";

  return (
    <div className="mx-auto max-w-reading px-4 sm:px-6 md:px-8">
      <div className="pt-8">
        <Link href="/#projects" className="link">
          <ArrowLeft className="h-4 w-4" />
          {copy.projectsDetail.back}
        </Link>
      </div>

      <article className="section-fade mt-10 space-y-10">
        <header className="space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
            <IdentityRow brand={getBrand(project)} title={project.title} as="h1" titleClassName="text-3xl" />
            <span className="meta pt-2">{project.year}</span>
          </div>
          <p className="lead">{project.summary}</p>
          <div className="flex flex-wrap gap-3">
            {project.github && (
              <OutboundLink href={project.github} label={`${project.title} - GitHub`} className="btn btn-primary">
                <Github className="h-4 w-4" />
                {copy.projectsDetail.viewCode}
              </OutboundLink>
            )}
            {project.demo && (
              <OutboundLink href={project.demo} label={`${project.title} - Live Site`} className="btn btn-secondary">
                <ExternalLink className="h-4 w-4" />
                {copy.projectsDetail.liveSite}
              </OutboundLink>
            )}
          </div>
        </header>

        {isWatchlist && (
          <div className="grid gap-4 sm:grid-cols-2">
            {watchlistShots.map((shot) => (
              <Image
                key={shot.src}
                src={shot.src}
                alt={shot.alt}
                width={1200}
                height={675}
                sizes="(max-width: 640px) 100vw, 380px"
                priority
                className="w-full rounded-lg border border-border/60 object-cover"
              />
            ))}
          </div>
        )}

        {project.highlights && project.highlights.length > 0 && (
          <section className="entry space-y-3">
            <ul className="body list-disc space-y-2 pl-5 marker:text-border">
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="entry space-y-3">
          <h2 className="eyebrow">{copy.projectsDetail.description}</h2>
          <p className="body">{project.description}</p>
        </section>

        {stack.length > 0 && (
          <section className="entry grid gap-6 sm:grid-cols-2">
            {stack.map((group) => (
              <div key={group.label} className="space-y-2">
                <h3 className="eyebrow">{group.label}</h3>
                <ul className="body space-y-1">
                  {group.items!.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {isWatchlist && (
          <section className="entry space-y-3">
            <h2 className="eyebrow">Architecture</h2>
            <Image
              src="/projects/cosmic-watchlist-architecture.png"
              alt="Cosmic Watchlist architecture diagram"
              className="fade-quick w-full rounded-lg border border-border/60 object-cover"
              width={1200}
              height={675}
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </section>
        )}

        <section className="entry space-y-3">
          <h2 className="eyebrow">{copy.projectsDetail.tags}</h2>
          <p className="tags">
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </p>
        </section>
      </article>
    </div>
  );
}
