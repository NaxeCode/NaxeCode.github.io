import { z } from 'zod';
import { projectSchema, type Project } from '@/types/project';
import { skillsCategorySchema, type SkillsCategory } from '@/types/skill';
import projectsData from '@/data/projects.json';
import skillsData from '@/data/skills.json';
import aboutData from '@/data/about.json';

export function loadProjects(): Project[] {
  return z.array(projectSchema).parse(projectsData);
}

export function getProjectBySlug(slug: string): Project | null {
  const projects = loadProjects();
  return projects.find((p) => p.slug === slug) || null;
}

export function getFeaturedProjects(): Project[] {
  return loadProjects().filter((p) => p.featured);
}

export function loadSkills(): SkillsCategory[] {
  return z.array(skillsCategorySchema).parse(skillsData);
}

export function loadAbout() {
  return aboutData;
}
