import { loadCopy, loadProfile } from "@/lib/data-loader";

export function Footer() {
  const year = new Date().getFullYear();
  const copy = loadCopy();
  const profile = loadProfile();
  const links = [
    { href: profile.contact.github, label: copy.footer.github },
    { href: profile.contact.linkedin, label: copy.footer.linkedin },
    { href: profile.contact.x, label: copy.footer.x },
    { href: `mailto:${profile.contact.email}`, label: copy.footer.email },
  ];

  return (
    // Footer (spec section 6): mono, copyright left, links right, one hairline above.
    <footer className="mx-auto mt-28 max-w-page px-4 sm:px-6 md:px-8 md:mt-36">
      <div className="rule flex flex-col items-start justify-between gap-3 py-6 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:text-[13px]">
        <span>© {year} {copy.footer.copyrightName}</span>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'}
              className="hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
