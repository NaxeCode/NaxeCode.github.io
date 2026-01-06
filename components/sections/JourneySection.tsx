import type { JourneyItem } from '@/types/journey';
import type { Copy } from '@/types/copy';

type Props = {
  journey: JourneyItem[];
  copy: Copy['sections']['journey'];
};

export function JourneySection({ journey, copy }: Props) {
  return (
    <section id="journey" className="scroll-mt-28 space-y-5 section-fade" tabIndex={-1}>
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{copy.label}</p>
        <h2 className="text-3xl font-semibold text-foreground">{copy.heading}</h2>
        <p className="text-muted-foreground text-sm max-reading">
          {copy.description}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {journey.map((item) => (
          <div
            key={item.title}
            className="glass hover-rise rounded-2xl p-4 md:p-5 space-y-2"
          >
            <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">{item.period}</p>
            <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.summary}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
