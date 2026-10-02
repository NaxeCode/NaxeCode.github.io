'use client';

import { Github, Linkedin, Mail } from 'lucide-react';
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
      className="scroll-mt-20 space-y-10"
      tabIndex={-1}
    >
      <div className="space-y-3">
        <p className="eyebrow">{copy.label}</p>
        <h2 className="h2">{copy.heading}</h2>
        <p className="body">{profile.title}</p>
      </div>
      <div className="grid gap-x-12 gap-y-8 md:grid-cols-[minmax(0,62ch)_1fr]">
        <div className="entry body space-y-4 pt-6">
          {profile.about.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className="space-y-8">
          <div className="entry space-y-2">
            <p className="eyebrow">{copy.buildingLabel.replace(/:$/, '')}</p>
            <p className="body">{profile.buildingNow}</p>
          </div>
          <div className="entry space-y-2">
            <p className="eyebrow">{copy.skillsLabel}</p>
            <p className="tags leading-relaxed">
              {profile.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </p>
          </div>
          <div className="entry flex flex-wrap items-center gap-x-5 gap-y-3">
            <a href={`mailto:${profile.contact.email}`} className="btn btn-secondary">
              <Mail className="h-4 w-4" />
              {copy.emailCta}
            </a>
            <OutboundLink href={profile.contact.github} label={copy.githubCta} className="link">
              <Github className="h-4 w-4" />
              {copy.githubCta}
            </OutboundLink>
            <OutboundLink href={profile.contact.linkedin} label={copy.linkedinCta} className="link">
              <Linkedin className="h-4 w-4" />
              {copy.linkedinCta}
            </OutboundLink>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
