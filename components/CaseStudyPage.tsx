import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { LabLink, StudyVisual } from './Portfolio';
import type { CaseStudy } from '@/lib/case-studies';

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  return (
    <article className="portfolio-shell case-page">
      <Link href="/projects/" className="back-link">
        <ArrowLeft size={15} aria-hidden="true" />
        All work
      </Link>
      <header className="case-heading">
        <p className="work-discipline">{study.discipline}</p>
        <h1>{study.name}</h1>
        <p className="case-intro">{study.summary}</p>
        <LabLink study={study} />
      </header>
      <figure className="case-visual">
        <StudyVisual study={study} preload />
        <figcaption>{study.caption}</figcaption>
      </figure>
      <div className="case-notes">
        {study.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            <div>
              <p>{section.body}</p>
              {section.link && (
                <a className="text-action" href={section.link.href}>
                  {section.link.label}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              )}
            </div>
          </section>
        ))}
        {study.sources.length > 0 && (
          <section>
            <h2>Inspect the implementation</h2>
            <ul className="source-list">
              {study.sources.map((source) => (
                <li key={source.href}>
                  <a href={source.href}>
                    <span>
                      {source.title}
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </span>
                    <small>{source.detail}</small>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}
