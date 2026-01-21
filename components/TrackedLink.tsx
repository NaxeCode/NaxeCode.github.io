"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackOutboundLink, trackProjectClick } from "@/lib/analytics";
import { withOutboundUtm } from "@/lib/utm";

type BaseProps = {
  className?: string;
  children: ReactNode;
};

type ProjectLinkProps = BaseProps & {
  href: string;
  slug: string;
  title: string;
};

type OutboundLinkProps = BaseProps & {
  href: string;
  label: string;
  target?: string;
  rel?: string;
};

export function ProjectLink({ href, slug, title, className, children }: ProjectLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackProjectClick(slug, title)}
      prefetch={false}
    >
      {children}
    </Link>
  );
}

export function OutboundLink({ href, label, className, target = "_blank", rel = "noreferrer", children }: OutboundLinkProps) {
  const trackedHref = withOutboundUtm(href, label);
  return (
    <a
      href={trackedHref}
      target={target}
      rel={rel}
      className={className}
      onClick={() => trackOutboundLink(href, label)}
    >
      {children}
    </a>
  );
}
