/* eslint-disable @next/next/no-img-element -- static SVG tile; the export has no image optimizer */
import { cn } from '@/lib/utils';
import type { Brand } from '@/lib/brand';

type Props = {
  brand: Brand | null;
  size?: number;
  className?: string;
};

/** The project's glass tile from the brand generator (public/tiles/<repo>.svg). The only glass on a page. */
export function ProjectMark({ brand, size = 40, className }: Props) {
  if (!brand) return null;
  return (
    <img
      src={brand.tile}
      alt=""
      width={size}
      height={size}
      decoding="async"
      className={cn('tile', className)}
    />
  );
}
