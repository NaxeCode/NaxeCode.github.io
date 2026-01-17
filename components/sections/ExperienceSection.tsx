'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { ExperienceItem } from '@/types/experience';
import type { Copy } from '@/types/copy';
import { useInView } from '@/hooks/useInView';
import { useSectionTracking } from '@/hooks/useSectionTracking';
import { staggerContainer, staggerItem } from '@/lib/motion';

type Props = {
  experience: ExperienceItem[];
  copy: Copy['sections']['experience'];
};

export function ExperienceSection({ experience, copy }: Props) {
  const { ref, inView } = useInView({ threshold: 0.1 });
  useSectionTracking({ sectionId: 'experience', threshold: 0.5 });
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toId = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  return (
    <section id="experience" className="scroll-mt-28 space-y-5" tabIndex={-1}>
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{copy.label}</p>
        <h2 className="text-3xl font-semibold text-foreground">{copy.heading}</h2>
        <p className="text-muted-foreground text-sm max-reading">
          {copy.description}
        </p>
      </div>
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="surface divide-y divide-border/60"
      >
        {experience.map((item) => {
          const itemKey = `${item.role}-${item.company}-${item.period}`;
          const listId = `experience-${toId(itemKey)}`;
          const isExpandable = item.bullets.length > 3;
          const isExpanded = expanded[itemKey] ?? false;
          const visibleBullets = isExpandable && !isExpanded
            ? item.bullets.slice(0, 3)
            : item.bullets;

          return (
          <motion.div
            key={itemKey}
            variants={staggerItem}
            className="p-5 sm:p-6 space-y-3"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div className="space-y-1">
                <p className="text-lg font-semibold text-foreground">
                  {item.role} · {item.company}
                </p>
                {item.location && (
                  <p className="text-xs text-muted-foreground">{item.location}</p>
                )}
              </div>
              <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">{item.period}</p>
            </div>
            <div
              id={listId}
              className="space-y-1.5 text-sm text-foreground/90 max-reading"
            >
              {visibleBullets.map((bullet) => (
                <p key={bullet}>{bullet}</p>
              ))}
            </div>
            {isExpandable && (
              <button
                type="button"
                aria-expanded={isExpanded}
                aria-controls={listId}
                onClick={() =>
                  setExpanded((current) => ({
                    ...current,
                    [itemKey]: !isExpanded,
                  }))
                }
                className="text-sm font-semibold text-primary hover:text-primary/80"
              >
                {isExpanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
