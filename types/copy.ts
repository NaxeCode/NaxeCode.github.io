import { z } from 'zod';

export const copySchema = z.object({
  site: z.object({
    brand: z.string(),
    title: z.string(),
    description: z.string(),
    ogTitle: z.string(),
    ogDescription: z.string(),
    locationLine: z.string(),
  }),
  nav: z.object({
    about: z.string(),
    projects: z.string(),
    experience: z.string(),
    journey: z.string(),
  }),
  hero: z.object({
    eyebrow: z.string(),
    title: z.string(),
    primaryCta: z.string(),
    secondaryCta: z.string(),
  }),
  sections: z.object({
    about: z.object({
      label: z.string(),
      heading: z.string(),
      buildingLabel: z.string(),
      skillsLabel: z.string(),
      emailCta: z.string(),
      githubCta: z.string(),
      linkedinCta: z.string(),
    }),
    projects: z.object({
      label: z.string(),
      heading: z.string(),
      description: z.string(),
      actions: z.object({
        code: z.string(),
        details: z.string(),
      }),
    }),
    experience: z.object({
      label: z.string(),
      heading: z.string(),
      description: z.string(),
    }),
    journey: z.object({
      label: z.string(),
      heading: z.string(),
      description: z.string(),
    }),
  }),
  projectsDetail: z.object({
    back: z.string(),
    tags: z.string(),
    description: z.string(),
    stack: z.object({
      frontend: z.string(),
      backend: z.string(),
      database: z.string(),
      tools: z.string(),
    }),
    viewCode: z.string(),
    liveDemo: z.string(),
  }),
  stubs: z.object({
    about: z.object({
      eyebrow: z.string(),
      title: z.string(),
      body: z.string(),
      cta: z.string(),
    }),
    projects: z.object({
      eyebrow: z.string(),
      title: z.string(),
      body: z.string(),
      cta: z.string(),
    }),
    contact: z.object({
      eyebrow: z.string(),
      title: z.string(),
      body: z.string(),
      ctaEmail: z.string(),
      ctaAbout: z.string(),
    }),
  }),
  footer: z.object({
    copyrightName: z.string(),
    github: z.string(),
    linkedin: z.string(),
    email: z.string(),
  }),
  notFound: z.object({
    title: z.string(),
    description: z.string(),
    primaryCta: z.string(),
    secondaryCta: z.string(),
  }),
});

export type Copy = z.infer<typeof copySchema>;
