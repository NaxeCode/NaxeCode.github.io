'use client';

import { useState } from 'react';
import { Button } from '@stargazers-stella/cosmic-ui';
import type { Project } from '@/types/project';
import { ProjectCard } from './ProjectCard';

const categories = [
  { value: 'all', label: 'All' },
  { value: 'full-stack', label: 'Full-Stack' },
  { value: 'game', label: 'Games' },
  { value: 'tool', label: 'Tools' },
  { value: 'design-system', label: 'Design Systems' },
];

export function ProjectFilter({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <Button
            key={cat.value}
            variant={filter === cat.value ? 'default' : 'outline'}
            onClick={() => setFilter(cat.value)}
            className={
              filter === cat.value
                ? 'bg-gradient-to-r from-primary/60 to-pink-500/60 text-primary-foreground border border-primary/50 shadow-lg shadow-primary/20'
                : 'border-border/70 surface-muted text-foreground hover:border-primary/50'
            }
          >
            {cat.label}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="relative text-center py-12 border border-border/50 rounded-2xl surface-muted backdrop-blur-md overflow-hidden">
          <div className="cosmic-spotlight absolute inset-0 opacity-40 pointer-events-none" />
          <p className="relative text-muted-foreground">No projects found in this category.</p>
        </div>
      )}
    </div>
  );
}
