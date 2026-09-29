import { loadCopy, loadProfile } from "@/lib/data-loader";

export function Footer() {
  const year = new Date().getFullYear();
  const copy = loadCopy();
  const profile = loadProfile();

  return (
    <footer className="border-t border-border/60 bg-background/80 mt-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
        <span className="text-foreground/80">© {year} {copy.footer.copyrightName}</span>
        <div className="flex items-center gap-3">
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary"
          >
            {copy.footer.github}
          </a>
          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary"
          >
            {copy.footer.linkedin}
          </a>
          <a
            href={profile.contact.x}
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary"
          >
            {copy.footer.x}
          </a>
          <a href={`mailto:${profile.contact.email}`} className="hover:text-primary">
            {copy.footer.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
