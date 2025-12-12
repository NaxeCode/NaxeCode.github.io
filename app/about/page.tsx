'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@stargazers-stella/cosmic-ui';
import { loadSkills, loadAbout } from '@/lib/data-loader';
import { SkillsVisualization } from '@/components/skills/SkillsVisualization';

export default function AboutPage() {
  const skills = loadSkills();
  const about = loadAbout();

  return (
    <div className="container mx-auto max-w-5xl px-4 py-20 lg:py-24 space-y-14 lg:space-y-16">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full surface-muted px-3 py-1 text-sm text-muted-foreground ring-1 ring-border/60">
          <span className="text-xs uppercase tracking-[0.08em] text-primary">About</span>
          <span className="text-xs text-muted-foreground">Story, skills, and what I build</span>
        </div>
        <div className="space-y-3">
          <h1 className="text-5xl font-bold text-foreground">About Me</h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{about.bio}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="rounded-full surface-muted px-3 py-1 text-xs text-muted-foreground border border-border/60">
              Product-minded engineer
            </span>
            <span className="rounded-full surface-muted px-3 py-1 text-xs text-muted-foreground border border-border/60">
              Fintech + AI
            </span>
            <span className="rounded-full surface-muted px-3 py-1 text-xs text-muted-foreground border border-border/60">
              Design systems
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
        {/* Journey */}
        <Card className="cosmic-card surface border-border backdrop-blur-xl h-full">
          <CardHeader className="p-6 sm:p-7 lg:p-8">
            <CardTitle className="text-2xl text-foreground">Journey</CardTitle>
            <CardDescription className="text-base mt-1">My path as a developer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 px-6 sm:px-7 lg:px-8 pb-6 sm:pb-7 lg:pb-8">
            {about.journey.map((experience: any, index: number) => (
              <div key={index} className="relative pl-4 sm:pl-5">
                <div className="absolute left-0 top-0 h-full w-px bg-border/70" />
                <div className="absolute left-0 top-2 h-2 w-2 rounded-full bg-primary" />
                <h3 className="text-lg font-semibold text-foreground">{experience.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{experience.period}</p>
                <p className="text-muted-foreground leading-relaxed">{experience.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* What I Build */}
        <Card className="cosmic-card surface border-border backdrop-blur-xl h-full">
          <CardHeader className="p-6 sm:p-7 lg:p-8">
            <CardTitle className="text-2xl text-foreground">What I build</CardTitle>
            <CardDescription className="text-base mt-1">Where I focus my energy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-6 sm:px-7 lg:px-8 pb-6 sm:pb-7 lg:pb-8">
            {about.highlights.map((highlight: string, index: number) => (
              <p key={index} className="text-muted-foreground leading-relaxed">
                {highlight}
              </p>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Skills */}
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-foreground">Skills & Expertise</h2>
        <SkillsVisualization categories={skills} />
      </div>
    </div>
  );
}
