import Link from "next/link";
import type { ReactNode } from "react";

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

export function ProjectLink({ href, className, children }: ProjectLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      prefetch={false}
    >
      {children}
    </Link>
  );
}

export function OutboundLink({ href, className, target = "_blank", rel = "noreferrer", children }: OutboundLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
    >
      {children}
    </a>
  );
}
