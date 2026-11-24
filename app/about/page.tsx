import Link from 'next/link';
import { loadExperience } from '@/lib/data-loader';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Background | Aladdin Ali',
  description:
    'Aladdin Ali’s work in game graphics, full-stack engineering, C# diagnostics and applied AI.',
};

export default function AboutPage() {
  const experience = loadExperience();
  return (
    <article className="portfolio-shell inner-page">
      <header className="page-intro">
        <p className="intro-byline">About</p>
        <h1>Aladdin Ali</h1>
        <p>
          I’m a software engineer in South Florida. I started by making games and moved from engine
          graphics into backend services, enterprise C# tooling and applied AI.
        </p>
      </header>
      <section className="about-story">
        <h2>How I work</h2>
        <div>
          <p>
            In graphics, “it looks wrong” is often the first bug report. Capturing the frame, isolating a
            change and checking the result gave me a way to make progress. I use the same approach when a
            model borrows the wrong source or a service loses track of an external operation.
          </p>
          <Link className="text-action" href="/projects/">
            Explore my public work
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section className="career-list" id="experience">
        <h2 className="group-title">Professional experience</h2>
        {experience.map((item) => (
          <section className="career-row" key={item.company}>
            <div>
              <h3>{item.company}</h3>
              <span>
                {item.role} / {item.period}
              </span>
            </div>
            <div>
              {item.bullets.map((bullet) => (
                <p key={bullet}>{bullet}</p>
              ))}
            </div>
          </section>
        ))}
      </section>
    </article>
  );
}
