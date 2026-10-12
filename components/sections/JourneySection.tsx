'use client';

import { motion } from 'framer-motion';
import type { JourneyItem } from '@/types/journey';
import type { Copy } from '@/types/copy';
import { useInView } from '@/hooks/useInView';
import { useSectionTracking } from '@/hooks/useSectionTracking';
import { staggerContainer, staggerItem } from '@/lib/motion';

type Props = {
  journey: JourneyItem[];
  copy: Copy['sections']['journey'];
};

export function JourneySection({ journey, copy }: Props) {
  const { ref, inView } = useInView({ threshold: 0.1 });
  useSectionTracking({ sectionId: 'journey', threshold: 0.5 });

  return (
    <section id="journey" className="scroll-mt-20 space-y-10" tabIndex={-1}>
      <div className="space-y-3">
        <p className="eyebrow">{copy.label}</p>
        <h2 className="h2">{copy.heading}</h2>
        <p className="body max-reading">{copy.description}</p>
      </div>
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid gap-x-8 md:grid-cols-3"
      >
        {journey.map((item) => (
          <motion.div key={item.title} variants={staggerItem} className="entry space-y-2 pb-8">
            <p className="meta">{item.period}</p>
            <h3 className="entry-title">{item.title}</h3>
            <p className="body">{item.summary}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
