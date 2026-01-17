import { ArrowRight, Mail } from "lucide-react";
import {
  loadProfile,
  loadProjects,
  loadExperience,
  loadJourney,
  loadCopy,
} from "@/lib/data-loader";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { AnchorLink } from "@/components/layout/AnchorLink";

export default function Home() {
  const profile = loadProfile();
  const projects = loadProjects();
  const experience = loadExperience();
  const journey = loadJourney();
  const copy = loadCopy();

  return (
    <main className="min-h-screen pb-16">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 md:px-8 space-y-12">
        <header className="pt-12 sm:pt-14">
          <div className="glass relative overflow-hidden p-6 sm:p-8 space-y-6 section-fade hover-rise">
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-cyan-500/10 via-transparent to-sky-400/5" />
            <div className="absolute -left-14 -top-14 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative space-y-3 max-reading">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {copy.hero.eyebrow}
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                {copy.hero.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{profile.about[0]}</p>
              <p className="text-sm text-foreground/80">
                {copy.site.locationLine}
              </p>
            </div>
            <div className="relative flex flex-wrap gap-3">
              <a
                className="btn-press inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-teal-500/20"
                href={`mailto:${profile.contact.email}`}
              >
                <Mail className="h-4 w-4" />
                {copy.hero.primaryCta}
              </a>
              <AnchorLink
                href="#projects"
                className="btn-press inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground hover:bg-surface-muted/70"
              >
                {copy.hero.secondaryCta} <ArrowRight className="h-4 w-4" />
              </AnchorLink>
            </div>
          </div>
        </header>

        <div className="divider" />

        <div className="space-y-12">
          <ProjectsSection projects={projects} copy={copy.sections.projects} />
          <ExperienceSection experience={experience} copy={copy.sections.experience} />
          <AboutSection profile={profile} copy={copy.sections.about} />
          <JourneySection journey={journey} copy={copy.sections.journey} />
        </div>
      </div>
    </main>
  );
}
