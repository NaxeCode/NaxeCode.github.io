import type { ExperienceItem } from '@/types/experience';
import type { Copy } from '@/types/copy';

type Props = {
  experience: ExperienceItem[];
  copy: Copy['sections']['experience'];
};

export function ExperienceSection({ experience, copy }: Props) {
  return (
    <section id="experience" className="scroll-mt-28 space-y-5 section-fade" tabIndex={-1}>
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{copy.label}</p>
        <h2 className="text-3xl font-semibold text-foreground">{copy.heading}</h2>
        <p className="text-muted-foreground text-sm max-reading">
          {copy.description}
        </p>
      </div>
      <div className="glass divide-y divide-border/60">
        {experience.map((item) => (
          <div key={`${item.role}-${item.company}-${item.period}`} className="p-5 sm:p-6 space-y-3">
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
            <ul className="space-y-1.5 text-sm text-foreground/90 list-disc list-inside max-reading">
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
