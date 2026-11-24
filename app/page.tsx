import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Background, DigestFeature, Flagships, MoreWork } from '@/components/Portfolio';

export default function HomePage() {
  return (
    <div className="portfolio-shell">
      <header className="portfolio-intro">
        <div>
          <p className="intro-byline">
            <strong>Aladdin Ali</strong> <span aria-hidden="true">/</span> Software engineer
          </p>
          <h1>
            Applied AI, .NET
            <br /> and graphics.
          </h1>
        </div>
        <div className="intro-prose">
          <p>
            I built graphics diagnostics for game engines and C# tools for regulated simulations. When an
            AI system gets something wrong, I want the next engineer to be able to trace the decision and
            replay it.
          </p>
          <Link className="text-action" href="/about/">
            My background
            <ArrowRight aria-hidden="true" size={15} />
          </Link>
        </div>
      </header>
      <section id="projects" className="selected-work" aria-labelledby="selected-title">
        <div className="group-line">
          <h2 id="selected-title">Selected work</h2>
          <Link href="/projects/">
            Project index
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
        <Flagships />
        <DigestFeature />
      </section>
      <MoreWork />
      <Background />
    </div>
  );
}
