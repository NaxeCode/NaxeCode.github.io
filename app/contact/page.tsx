import { ArrowUpRight } from 'lucide-react';
import { loadProfile } from '@/lib/data-loader';

export const metadata = {
  title: 'Contact | Aladdin Ali',
  description: 'Contact Aladdin Ali about applied AI, .NET and graphics engineering.',
};

export default function ContactPage() {
  const { contact } = loadProfile();
  return (
    <div className="portfolio-shell inner-page contact-page">
      <header className="page-intro">
        <p className="intro-byline">Contact</p>
        <h1>Get in touch</h1>
        <p>
          For engineering roles or a question about something I built, email me. I’m based in South
          Florida and open to relocating within the United States.
        </p>
      </header>
      <a className="contact-address" href={`mailto:${contact.email}`}>
        {contact.email}
        <ArrowUpRight size={24} aria-hidden="true" />
      </a>
      <div className="contact-links">
        <a href={contact.linkedin}>
          LinkedIn
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <a href={contact.github}>
          GitHub
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
