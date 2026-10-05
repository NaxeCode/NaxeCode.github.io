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
    <div className="mx-auto max-w-page px-4 sm:px-6 md:px-8">
      {/* Hero: open type on the sky. The eyebrow is the one place the aurora colors a label. */}
      <header className="section-fade pt-16 sm:pt-24">
        <div className="max-w-reading space-y-6">
          <p className="eyebrow-aura">{copy.hero.eyebrow}</p>
          <h1 className="display">{copy.hero.title}</h1>
          <p className="lead max-reading">{profile.about[0]}</p>
          <p className="meta">{copy.site.locationLine}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a className="btn btn-primary" href={`mailto:${profile.contact.email}`}>
              <Mail className="h-4 w-4" />
              {copy.hero.primaryCta}
            </a>
            <AnchorLink href="#projects" className="btn btn-secondary">
              {copy.hero.secondaryCta} <ArrowRight className="h-4 w-4" />
            </AnchorLink>
          </div>
        </div>
      </header>

      <div className="mt-28 space-y-28 md:mt-36 md:space-y-36">
        <ProjectsSection projects={projects} copy={copy.sections.projects} />
        <ExperienceSection experience={experience} copy={copy.sections.experience} />
        <AboutSection profile={profile} copy={copy.sections.about} />
        <JourneySection journey={journey} copy={copy.sections.journey} />
      </div>
    </div>
  );
}
