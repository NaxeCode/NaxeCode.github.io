import { z } from 'zod';
import { projectSchema, type Project } from '@/types/project';
import { profileSchema, type Profile } from '@/types/profile';
import { experienceSchema, type ExperienceItem } from '@/types/experience';
import { journeySchema, type JourneyItem } from '@/types/journey';
import { copySchema, type Copy } from '@/types/copy';
import projectsData from '@/data/projects.json';
import profileData from '@/data/profile.json';
import experienceData from '@/data/experience.json';
import journeyData from '@/data/journey.json';
import copyData from '@/data/copy.json';

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

export function loadProfile(): Profile {
  return profileSchema.parse(profileData);
}

export function loadExperience(): ExperienceItem[] {
  return experienceSchema.parse(experienceData);
}

export function loadJourney(): JourneyItem[] {
  return journeySchema.parse(journeyData);
}

export function loadCopy(): Copy {
  return copySchema.parse(copyData);
}
