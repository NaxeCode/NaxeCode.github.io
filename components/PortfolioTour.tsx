import Link from 'next/link';
import { Download } from 'lucide-react';
import chapters from '@/data/portfolio-tour.json';

export function PortfolioTour() {
  return (
    <section id="tour" className="tour-section" aria-labelledby="tour-title">
      <h2 id="tour-title">A 40-second tour of the labs</h2>
      <p>
        Watch a render comparison, a ledger replay, a model’s missed correction and an edit to a
        four-track score.
      </p>
      <video
        controls
        playsInline
        preload="none"
        poster="/tour/engineering-labs.webp"
        width={1280}
        height={720}
        aria-labelledby="tour-title"
      >
        <source src="/tour/engineering-labs.mp4" type="video/mp4" />
        <track kind="captions" src="/tour/engineering-labs.vtt" srcLang="en" label="English" />
        <a href="/tour/engineering-labs.mp4">Download the walkthrough</a>
      </video>
      <div className="tour-downloads">
        <a href="/tour/engineering-labs.mp4" download>
          <Download size={14} aria-hidden="true" />
          Download MP4
        </a>
        <a href="/tour/engineering-labs.vtt" download>
          English captions
        </a>
        <a href="/tour/transcript.txt" download>
          Text transcript
        </a>
      </div>
      <details className="tour-transcript">
        <summary>Read the transcript and source credits</summary>
        {chapters.map((chapter) => (
          <div className="transcript-row" key={chapter.slug}>
            <h3>
              <span>0:{String(chapter.start).padStart(2, '0')}</span>
              <Link href={`/projects/${chapter.slug}/`}>{chapter.project}</Link>
            </h3>
            <p>{chapter.cues.map((cue) => cue[2]).join(' ')}</p>
          </div>
        ))}
        <p>
          Recorded from the four portfolio labs. The music comes from the LMMS Session browser
          synthesizer playing the edited score <i>Low Tide Relay</i>. LMMS is the upstream workstation.
          Each project’s case study links its implementation and contributors.
        </p>
      </details>
    </section>
  );
}
