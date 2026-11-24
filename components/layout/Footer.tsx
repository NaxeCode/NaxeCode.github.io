import Link from 'next/link';
import { loadProfile } from '@/lib/data-loader';

export function Footer() {
  const { contact } = loadProfile();
  return (
    <footer className="portfolio-shell site-footer">
      <span>© {new Date().getFullYear()} Aladdin Ali</span>
      <nav aria-label="Footer navigation">
        <a href={contact.github}>GitHub</a>
        <a href={contact.linkedin}>LinkedIn</a>
        <a href={contact.x}>X</a>
        <Link href="/contact/">Contact</Link>
      </nav>
    </footer>
  );
}
