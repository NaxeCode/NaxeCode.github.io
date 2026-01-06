'use client';

import { motion } from 'framer-motion';
import type { JourneyItem } from '@/types/journey';
import type { Copy } from '@/types/copy';
import { useInView } from '@/hooks/useInView';
import { staggerContainer, staggerItem } from '@/lib/motion';

type Props = {
  journey: JourneyItem[];
  copy: Copy['sections']['journey'];
};

export function JourneySection({ journey, copy }: Props) {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section id="journey" className="scroll-mt-28 space-y-5" tabIndex={-1}>
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
        className="grid gap-4 md:grid-cols-3"
      >
        {journey.map((item) => (
          <motion.div
            key={item.title}
            variants={staggerItem}
            className="glass hover-rise rounded-2xl p-4 md:p-5 space-y-2"
          >
            <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">{item.period}</p>
            <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.summary}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
