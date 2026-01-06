"use client";

import type { ReactNode } from "react";

type Props = {
  href: string;
  className?: string;
  children: ReactNode;
};

export function AnchorLink({ href, className, children }: Props) {
  const isAnchor = href.startsWith("#");

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isAnchor) return;
    event.preventDefault();

    const id = href.slice(1);
    const target = document.getElementById(id);
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (target) {
      target.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "start",
      });
      if (typeof target.focus === "function") {
        target.focus({ preventScroll: true } as any);
      }
    }

    window.history.replaceState(null, "", href);
  };

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
