'use client';

import { motion } from 'framer-motion';
import type { Profile } from '@/types/profile';
import type { Copy } from '@/types/copy';
import { OutboundLink } from '@/components/TrackedLink';
import { useInView } from '@/hooks/useInView';
import { useSectionTracking } from '@/hooks/useSectionTracking';
import { fadeInUp } from '@/lib/motion';

type Props = {
  profile: Profile;
  copy: Copy['sections']['about'];
};

export function AboutSection({ profile, copy }: Props) {
  const { ref, inView } = useInView({ threshold: 0.2 });
  useSectionTracking({ sectionId: 'about', threshold: 0.5 });

  return (
    <motion.section
      id="about"
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="scroll-mt-28"
      tabIndex={-1}
    >
      <div className="glass relative overflow-hidden p-6 sm:p-8 space-y-6 hover-rise">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/10 via-transparent to-cyan-400/5" />
        <div className="relative space-y-1">
          <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{copy.label}</p>
          <h2 className="text-3xl font-semibold text-foreground">{copy.heading}</h2>
          <p className="text-sm text-muted-foreground">{profile.title}</p>
        </div>
        <div className="relative space-y-3 max-reading text-base text-muted-foreground leading-relaxed">
          {profile.about.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className="relative rounded-xl border border-border/70 bg-surface-muted/80 px-4 py-3 text-sm text-foreground/90">
          <span className="font-semibold text-primary">{copy.buildingLabel}</span> {profile.buildingNow}
        </div>
        <div className="relative space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            {copy.skillsLabel}
          </p>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="pill border-primary/30 bg-primary/10 text-primary"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="relative flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.contact.email}`}
            className="btn-press inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-teal-500/25"
          >
            {copy.emailCta}
          </a>
          <OutboundLink
            href={profile.contact.github}
            label={copy.githubCta}
            className="btn-press inline-flex items-center justify-center rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-surface-muted/70"
          >
            {copy.githubCta}
          </OutboundLink>
          <OutboundLink
            href={profile.contact.linkedin}
            label={copy.linkedinCta}
            className="btn-press inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-foreground hover:text-primary hover:bg-surface-muted/70"
          >
            {copy.linkedinCta}
          </OutboundLink>
        </div>
      </div>
    </motion.section>
  );
}
