import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, BookOpen, Headphones } from 'lucide-react';
import { FrameComparison } from '@/components/FrameComparison';
import { loadProjects } from '@/lib/data-loader';
import { studies, type CaseStudy } from '@/lib/case-studies';

export function LabLink({ study }: { study: CaseStudy }) {
  // The labs are standalone static documents. Use a document navigation.
  return (
    <a className="lab-link" href={study.lab}>
      {study.action}
      <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  );
}

function CaseLink({ study }: { study: CaseStudy }) {
  return (
    <Link href={`/projects/${study.slug}/`} className="read-link">
      <BookOpen size={15} aria-hidden="true" />
      Case study<span className="sr-only"> for {study.name}</span>
    </Link>
  );
}

export function StudyVisual({ study, preload = false }: { study: CaseStudy; preload?: boolean }) {
  if (study.slug === 'frame-triage') return <FrameComparison />;
  return (
    <a
      className={`study-shot shot-${study.slug}`}
      href={study.lab}
      aria-label={`Open ${study.name} lab`}
    >
      <Image
        src={study.image!}
        alt={study.alt!}
        width={1080}
        height={670}
        priority={preload}
        sizes="(max-width: 720px) 100vw, 560px"
      />
      <span className="shot-open" aria-hidden="true">
        <ArrowUpRight size={18} />
      </span>
    </a>
  );
}

export function Flagships() {
  return (
    <div className="flagships">
      {studies.slice(0, 2).map((study) => (
        <article key={study.slug} className={`flagship study-${study.slug}`}>
          <StudyVisual study={study} preload />
          <div className="study-copy">
            <p className="work-discipline">{study.discipline}</p>
            <h3>
              <Link href={`/projects/${study.slug}/`}>{study.name}</Link>
            </h3>
            <p className="work-summary">{study.summary}</p>
            <div className="work-links">
              <LabLink study={study} />
              <CaseLink study={study} />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function DigestFeature() {
  const digest = studies[2];
  return (
    <article className="digest-feature">
      <div className="digest-figure">
        <StudyVisual study={digest} />
      </div>
      <div className="study-copy">
        <p className="work-discipline">{digest.discipline}</p>
        <h3>
          <Link href="/projects/cosmic-digest/">Cosmic Digest</Link>
        </h3>
        <p className="work-summary">{digest.summary}</p>
        <div className="work-links">
          <LabLink study={digest} />
          <CaseLink study={digest} />
        </div>
      </div>
    </article>
  );
}

export function MoreWork() {
  return (
    <section className="more-work" aria-labelledby="other-work-title">
      <h2 className="group-title" id="other-work-title">
        Sound, games and tools
      </h2>
      <div className="audio-entry">
        <div className="audio-mark">
          <Headphones aria-hidden="true" size={25} strokeWidth={1.4} />
        </div>
        <div>
          <h3>
            <Link href="/projects/lmms-nebula/">LMMS-Nebula</Link>
          </h3>
          <p>
            This fork adds a local control socket and a tool adapter to the LMMS music workstation.
            Explore a four-track score and hear your edits.
          </p>
          <figure className="native-loop">
            <figcaption>Low Tide Relay / 10 seconds, rendered in LMMS</figcaption>
            <audio controls preload="none" aria-label="Listen to Low Tide Relay, rendered in LMMS">
              <source src="/studies/low-tide-relay.m4a" type="audio/mp4" />
              <source src="/labs/lmms-session/low-tide-relay.ogg" type="audio/ogg" />
            </audio>
          </figure>
        </div>
        <a className="lab-link" href="/labs/lmms-session/">
          Open audio lab
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
      <div className="small-works">
        <div>
          <h3>Minnen</h3>
          <p>
            My Haxe game projects a flat map onto a cylinder. The camera makes the ground appear to roll
            away from the player.
          </p>
          <a href="https://github.com/NaxeCode/Minnen/blob/34f8c86dc4ec04ed8d2ba5d721a35e7ba97c77c3/source/logworld/LogCamera.hx">
            Read the camera math
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
        <div>
          <h3>ActivityMux</h3>
          <p>
            A Rust desktop utility picks a Discord presence from running processes. A manual pin takes
            precedence over automatic rules.
          </p>
          <a href="https://github.com/NaxeCode/activitymux/releases">
            Browse releases
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
        <div>
          <h3>Kruu</h3>
          <p>
            I integrated work-order extraction and scheduling for a Miami hackathon team. Faye’s demo
            follows a fictional outdoor shift.
          </p>
          <a href="https://github.com/NaxeCode/heatshift/releases/tag/hackathon-demo-2026-10-10">
            Watch the team demo
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function Background() {
  return (
    <section id="about" className="background-section" aria-labelledby="background-title">
      <h2 className="group-title" id="background-title">
        Engineering background
      </h2>
      <div id="experience" className="background-columns">
        <h3 id="journey">From rendering engines to regulated systems.</h3>
        <div>
          <p>
            I started making games in 2015. Graphics work taught me to capture a bad frame and isolate
            the change. I carried that habit into C# diagnostics, simulation tooling and the backend
            systems behind regulated games.
          </p>
          <Link className="text-action" href="/about/">
            Read my background
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ProjectArchive() {
  const catalog = loadProjects().filter(
    (project) => !studies.some((study) => study.slug === project.slug),
  );
  return (
    <section className="catalog-section">
      <h2 className="group-title">Project archive</h2>
      {catalog.map((project) => (
        <Link key={project.slug} href={`/projects/${project.slug}/`} className="catalog-row">
          <span>{project.title}</span>
          <span>{project.tags.slice(0, 2).join(' / ')}</span>
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      ))}
    </section>
  );
}
