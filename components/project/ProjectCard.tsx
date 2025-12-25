import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, buttonVariants } from '@stargazers-stella/cosmic-ui';
import { Github, ArrowRight } from 'lucide-react';
import type { Project } from '@/types/project';
import { trackLinkClick, trackProjectView } from '@/lib/analytics';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card
      className="group relative tilt-card cosmic-card border border-border/50 bg-gradient-to-br from-surface/95 via-surface-strong/98 to-surface/95 backdrop-blur-2xl overflow-hidden h-full flex flex-col"
      onMouseMove={(e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -2;
        const rotateY = ((x - centerX) / centerX) * 2;

        // Tilt the card itself
        const cardElement = card as HTMLElement;
        if (cardElement) {
          cardElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
        }

        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;

        const spotlight = card.querySelector('.cosmic-spotlight') as HTMLElement;
        const spotlightGreen = card.querySelector('.cosmic-spotlight-green') as HTMLElement;

        if (spotlight) {
          spotlight.style.background = `radial-gradient(circle 400px at ${percentX}% ${percentY}%, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.12) 30%, rgba(6, 182, 212, 0.08) 50%, transparent 70%)`;
        }

        if (spotlightGreen) {
          spotlightGreen.style.background = `radial-gradient(circle 400px at ${percentX}% ${percentY}%, rgba(16, 185, 129, 0.18), rgba(34, 197, 94, 0.14) 30%, rgba(20, 184, 166, 0.1) 50%, transparent 70%)`;
          const target = e.target as HTMLElement;
          const isClickable = target.closest('a, button, [role="button"]');
          spotlightGreen.style.opacity = isClickable ? '1' : '0';
        }
      }}
      onMouseLeave={(e) => {
        const cardElement = e.currentTarget as HTMLElement;
        if (cardElement) {
          cardElement.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        }
        const spotlightGreen = e.currentTarget.querySelector('.cosmic-spotlight-green') as HTMLElement;
        if (spotlightGreen) {
          spotlightGreen.style.opacity = '0';
        }
      }}
    >
      {/* Hover spotlights */}
      <div className="cosmic-spotlight absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none" />
      <div className="cosmic-spotlight-green absolute inset-0 pointer-events-none" />
      {/* Prismatic overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              'repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(139, 92, 246, 0.03) 80px, rgba(139, 92, 246, 0.03) 160px, transparent 160px, transparent 240px, rgba(236, 72, 153, 0.03) 240px, rgba(236, 72, 153, 0.03) 320px)',
            transform: 'translateX(-50%)',
            width: '200%',
            animation: 'prismShift 20s linear infinite',
          }}
        />
      </div>
      {/* Edge glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-pink-500/5" />
      </div>
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-10 h-10 border-l border-t border-primary/30 rounded-tl-2xl" />
      <div className="absolute bottom-0 right-0 w-10 h-10 border-r border-b border-primary/30 rounded-br-2xl" />

      <CardHeader className="relative p-6 sm:p-8 lg:p-10 pb-4 sm:pb-6 lg:pb-6">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-foreground flex-1 leading-tight text-xl sm:text-2xl font-bold group-hover:text-primary transition-colors">
            <Link href={`/projects/${project.slug}`} className="hover:text-primary transition flex-1">
              {project.title}
            </Link>
          </CardTitle>
          <Badge className="bg-gradient-to-r from-primary/30 to-pink-500/30 text-primary border-primary/40 shadow-lg shadow-primary/10">
            {project.year}
          </Badge>
        </div>
        <CardDescription className="text-muted-foreground mt-3">{project.summary}</CardDescription>
      </CardHeader>

      <CardContent className="relative pt-0 px-6 sm:px-8 lg:px-10 pb-6 sm:pb-8 lg:pb-10 flex-1 flex flex-col justify-end">
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, index) => (
            <Badge
              key={tag}
              variant="outline"
              className="relative border-primary/30 text-foreground/80 bg-surface-muted/60 backdrop-blur-sm hover:border-primary/60 hover:text-primary transition-all cursor-default"
              style={{ animation: `fadeIn 0.4s ease-out ${index * 0.05}s both` }}
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackLinkClick(project.github!, `${project.title} - GitHub`)}
              className={buttonVariants({
                variant: 'outline',
                size: 'sm',
                className:
                  'relative overflow-hidden border-primary/40 text-foreground bg-surface-muted/70 backdrop-blur-sm hover:border-primary/60',
              })}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Github className="h-4 w-4 mr-2 relative z-10" />
              <span className="relative z-10">Code</span>
            </a>
          )}
          <Link
            href={`/projects/${project.slug}`}
            onClick={() => trackProjectView(project.slug, project.title)}
            className={buttonVariants({
              variant: 'ghost',
              size: 'sm',
              className:
                'relative text-primary px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-pink-500/20 border border-primary/40 backdrop-blur-sm overflow-hidden hover:shadow-lg hover:shadow-primary/20',
            })}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-primary/40 to-pink-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center">
              Details <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
