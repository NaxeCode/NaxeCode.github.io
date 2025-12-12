'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/lib/data-loader';
import { Card, CardContent, CardHeader, CardTitle, Badge, buttonVariants } from '@stargazers-stella/cosmic-ui';
import { Github, ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <Link
        href="/projects"
        className={buttonVariants({
          variant: 'ghost',
          className: 'mb-12 -ml-4',
        })}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Projects
      </Link>

      <Card className="cosmic-card surface border-border backdrop-blur-xl">
        <CardHeader className="p-6 sm:p-8 md:p-10 lg:p-12">
          <div className="flex items-start justify-between gap-4 mb-6">
            <CardTitle className="text-5xl text-foreground">{project.title}</CardTitle>
            <Badge className="bg-primary/20 text-primary border-primary/30 shrink-0">{project.year}</Badge>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">{project.summary}</p>

          <div className="flex flex-wrap gap-2 mt-6">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-border text-muted-foreground surface-muted">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-8 px-6 sm:px-8 md:px-10 lg:px-12 pb-6 sm:pb-8 md:pb-10 lg:pb-12">
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">About</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">{project.description}</p>
          </div>

          {project.stack && (
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Tech Stack</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {project.stack.frontend && project.stack.frontend.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Frontend</h4>
                    <ul className="space-y-1">
                      {project.stack.frontend.map((tech) => (
                        <li key={tech} className="text-sm text-muted-foreground">
                          • {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.stack.backend && project.stack.backend.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Backend</h4>
                    <ul className="space-y-1">
                      {project.stack.backend.map((tech) => (
                        <li key={tech} className="text-sm text-muted-foreground">
                          • {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.stack.database && project.stack.database.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Database</h4>
                    <ul className="space-y-1">
                      {project.stack.database.map((tech) => (
                        <li key={tech} className="text-sm text-muted-foreground">
                          • {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.stack.tools && project.stack.tools.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Tools</h4>
                    <ul className="space-y-1">
                      {project.stack.tools.map((tech) => (
                        <li key={tech} className="text-sm text-muted-foreground">
                          • {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: 'default',
                  className: 'bg-primary text-primary-foreground',
                })}
              >
                <Github className="h-4 w-4 mr-2" />
                View on GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: 'outline',
                })}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Live Demo
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
