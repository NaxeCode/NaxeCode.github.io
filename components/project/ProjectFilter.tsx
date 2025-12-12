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
    <div>
      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map((cat) => (
          <Button
            key={cat.value}
            variant={filter === cat.value ? 'default' : 'outline'}
            onClick={() => setFilter(cat.value)}
            className={filter === cat.value ? 'bg-primary text-primary-foreground' : 'border-border'}
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
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects found in this category.</p>
        </div>
      )}
    </div>
  );
}
