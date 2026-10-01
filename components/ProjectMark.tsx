/* eslint-disable @next/next/no-img-element -- remote SVG from the repo; static export has no image optimizer */
import { cn } from '@/lib/utils';

type Props = {
  github?: string;
  size?: number;
  className?: string;
};

/** The repo's brand tile (`.github/brand/logo.svg`), so the site matches the GitHub cards. */
export function ProjectMark({ github, size = 40, className }: Props) {
  const match = github?.match(/^https:\/\/github\.com\/([^/]+)\/([^/#?]+)/);
  if (!match) return null;
  const [, owner, repo] = match;
  return (
    <img
      src={`https://raw.githubusercontent.com/${owner}/${repo}/HEAD/.github/brand/logo.svg`}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={cn('shrink-0 rounded-[10px] shadow-[0_8px_30px_-12px_rgba(124,131,255,0.55)]', className)}
    />
  );
}
