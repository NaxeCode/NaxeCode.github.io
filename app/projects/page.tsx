import { PortfolioTour } from '@/components/PortfolioTour';
import { DigestFeature, Flagships, SimulationStudies, MoreWork, ProjectArchive } from '@/components/Portfolio';

export const metadata = {
  title: 'Engineering work | Aladdin Ali',
  description:
    'Explore interactive graphics, machine learning, C# service recovery, financial reconciliation, fluid dynamics, rigid-body rotation and audio tools.',
};

export default function ProjectsPage() {
  return (
    <div className="portfolio-shell">
      <header className="page-intro">
        <p className="intro-byline">Aladdin Ali</p>
        <h1>Engineering work</h1>
        <p>
          Open a lab to work through an example, or read its case study for the implementation and its
          limits.
        </p>
      </header>
      <section aria-label="Selected work">
        <Flagships />
        <DigestFeature />
      </section>
      <PortfolioTour />
      <SimulationStudies />
      <MoreWork />
      <ProjectArchive />
    </div>
  );
}
