import type { ElementType, ReactNode } from 'react';
import { ProjectMark } from '@/components/ProjectMark';
import type { Brand } from '@/lib/brand';
import { cn } from '@/lib/utils';

type Props = {
  brand: Brand | null;
  title: ReactNode;
  as?: ElementType;
  titleClassName?: string;
  className?: string;
};

/**
 * Project identity row (brand spec section 6): 40 px tile, name, `CATEGORY · TECH` in the band color, status pill.
 * The same row identifies a project on the profile grid, the README, the social card and here.
 */
export function IdentityRow({ brand, title, as: Title = 'h3', titleClassName, className }: Props) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <ProjectMark brand={brand} />
      <div className="min-w-0 space-y-1">
        <Title className={cn('entry-title leading-none', titleClassName)}>{title}</Title>
        {brand && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="category" style={{ color: brand.color }}>
              {brand.band} · {brand.tech}
            </span>
            <span className="status" style={{ color: brand.statusColor }}>
              {brand.status}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
