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
  const maxVisibleBullets = 3;
  const maxBulletChars = 260;

  const toId = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  const truncateBullet = (bullet: string) => {
    if (bullet.length <= maxBulletChars) {
      return bullet;
    }
    return `${bullet.slice(0, maxBulletChars).trim()}…`;
  };

  const parseMonthYear = (value: string) => {
    const match = value.trim().match(/^([A-Za-z]{3})\s+(\d{4})$/);
    if (!match) return null;
    const month = match[1].toLowerCase();
    const year = Number(match[2]);
    const monthIndex = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'].indexOf(month);
    if (monthIndex < 0 || Number.isNaN(year)) return null;
    return { year, monthIndex };
  };

  const computeDuration = (period: string) => {
    const [startRaw, endRaw] = period.split('–').map((part) => part.trim());
    if (!startRaw || !endRaw) return null;
    const start = parseMonthYear(startRaw);
    const end = endRaw.toLowerCase() === 'present'
      ? { year: new Date().getFullYear(), monthIndex: new Date().getMonth() }
      : parseMonthYear(endRaw);
    if (!start || !end) return null;
    const totalMonths = (end.year - start.year) * 12 + (end.monthIndex - start.monthIndex) + 1;
    if (totalMonths <= 0) return null;
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    if (years === 0) return `${months} mos`;
    if (months === 0) return `${years} yr${years > 1 ? 's' : ''}`;
    return `${years} yr${years > 1 ? 's' : ''} ${months} mos`;
  };

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
          const isExpandable =
            item.bullets.length > maxVisibleBullets ||
            item.bullets.some((bullet) => bullet.length > maxBulletChars);
          const isExpanded = expanded[itemKey] ?? false;
          const visibleBullets = isExpanded
            ? item.bullets
            : item.bullets
              .slice(0, maxVisibleBullets)
              .map((bullet) => truncateBullet(bullet));

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
              <div className="text-right space-y-1">
                <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">{item.period}</p>
                {computeDuration(item.period) && (
                  <p className="text-[11px] text-muted-foreground/80">{computeDuration(item.period)}</p>
                )}
              </div>
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
