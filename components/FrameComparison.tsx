'use client';

import { useId, useState } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

export function FrameComparison() {
  const [split, setSplit] = useState(35);
  const id = useId();
  return (
    <div className="frame-compare">
      {/* eslint-disable @next/next/no-img-element -- two lossless images share a single comparison viewport */}
      <img
        src="/labs/frame-triage/assets/lead-candidate.png"
        alt="Synthetic machine assembly. Sliding the divider reveals a ceramic ring missing from the candidate."
      />
      <img
        src="/labs/frame-triage/assets/lead-reference.png"
        alt=""
        style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
      />
      <div className="frame-overlay-labels" aria-hidden="true">
        <span>Reference</span>
        <span>Candidate</span>
      </div>
      <span className="frame-divider" aria-hidden="true" style={{ left: `${split}%` }}>
        <i>
          <ChevronsLeftRight size={17} />
        </i>
      </span>
      <input
        id={id}
        type="range"
        min="0"
        max="100"
        value={split}
        onChange={(event) => setSplit(Number(event.target.value))}
        aria-label="Compare reference and candidate frames"
        aria-valuetext={`${split}% of the reference visible`}
      />
    </div>
  );
}
