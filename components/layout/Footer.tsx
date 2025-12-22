import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/40 mt-16 sm:mt-20 lg:mt-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-8 sm:py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Naxe<span className="text-primary">Code</span>. Built with Next.js & cosmic-ui.
          </p>

          <div className="flex gap-4">
            <a
              href="https://github.com/naxecode"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/aladdin-ali01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:naxecode@proton.me"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
