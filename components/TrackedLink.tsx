"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackOutboundLink, trackProjectClick } from "@/lib/analytics";

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
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      onClick={() => trackOutboundLink(href, label)}
    >
      {children}
    </a>
  );
}
