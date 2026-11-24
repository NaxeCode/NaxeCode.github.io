/**
 * Brand bands and status per repository.
 *
 * Source of truth: NaxeCode/NaxeCode/.github/brand/gen.py (PROJECTS table). The portfolio follows it; it never
 * invents a band. Keyed by the GitHub repository name because the site's own `category` field predates the brand.
 * Tiles are the generator's logo.svg for each repo, copied to public/tiles/<repo>.svg.
 */
import type { Project } from '@/types/project';

export type Band = 'SYSTEMS' | 'TOOLS' | 'GAMES' | 'WEB';
export type Status = 'active' | 'wip' | 'prototype' | 'archived';

export const BAND_COLOR: Record<Band, string> = {
  SYSTEMS: '#22baf3',
  TOOLS: '#7c83ff',
  GAMES: '#cb69f3',
  WEB: '#fea334',
};

export const STATUS_COLOR: Record<Status, string> = {
  active: '#22baf3',
  wip: '#fea334',
  prototype: '#cb69f3',
  archived: '#8b95ad',
};

type Entry = { band: Band; status: Status; tech: string; accent?: string };

const REPOS: Record<string, Entry> = {
  'Cosmic-Digest': { band: 'SYSTEMS', status: 'active', tech: '.NET' },
  pulse: { band: 'SYSTEMS', status: 'wip', tech: 'Next.js' },
  'Photon-Trail': { band: 'SYSTEMS', status: 'wip', tech: 'Next.js' },
  'Cosmic-Watchlist': { band: 'SYSTEMS', status: 'active', tech: 'Next.js' },
  activitymux: { band: 'TOOLS', status: 'active', tech: 'Rust' },
  'jp-assist': { band: 'TOOLS', status: 'active', tech: 'Python' },
  'caelestia-shell-naxecode': { band: 'TOOLS', status: 'active', tech: 'Quickshell' },
  Minnen: { band: 'GAMES', status: 'wip', tech: 'Haxe' },
  Ahmar: { band: 'GAMES', status: 'prototype', tech: 'Haxe', accent: '#ff6592' },
};

export type Brand = {
  repo: string;
  band: Band;
  color: string;
  status: Status;
  statusColor: string;
  tech: string;
  tile: string;
};

export function repoName(github?: string): string | null {
  return github?.match(/^https:\/\/github\.com\/[^/]+\/([^/#?]+)/)?.[1] ?? null;
}

export function getBrand(project: Pick<Project, 'github'>): Brand | null {
  const repo = repoName(project.github);
  const entry = repo ? REPOS[repo] : undefined;
  if (!repo || !entry) return null;
  return {
    repo,
    band: entry.band,
    color: entry.accent ?? BAND_COLOR[entry.band],
    status: entry.status,
    statusColor: STATUS_COLOR[entry.status],
    tech: entry.tech,
    tile: `/tiles/${repo}.svg`,
  };
}
