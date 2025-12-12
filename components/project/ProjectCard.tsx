import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, buttonVariants } from '@stargazers-stella/cosmic-ui';
import { Github, ArrowRight } from 'lucide-react';
import type { Project } from '@/types/project';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="cosmic-card border-border surface backdrop-blur-xl group h-full flex flex-col">
      <CardHeader className="p-6 sm:p-8 lg:p-10">
        <CardTitle className="text-foreground flex items-start justify-between gap-2">
          <Link href={`/projects/${project.slug}`} className="hover:text-primary transition flex-1">
            {project.title}
          </Link>
          <Badge className="bg-primary/20 text-primary border-primary/30 shrink-0">{project.year}</Badge>
        </CardTitle>
        <CardDescription className="text-muted-foreground">{project.summary}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0 px-6 sm:px-8 lg:px-10 pb-6 sm:pb-8 lg:pb-10 flex-1 flex flex-col justify-end">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 4).map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="border-border text-muted-foreground surface-muted"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: 'outline',
                size: 'sm',
                className: 'border-border text-foreground',
              })}
            >
              <Github className="h-4 w-4 mr-2" />
              Code
            </a>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className={buttonVariants({
              variant: 'ghost',
              size: 'sm',
              className: 'text-foreground',
            })}
          >
            Details <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
