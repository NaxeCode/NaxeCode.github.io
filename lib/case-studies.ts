export type CaseStudy = {
  slug: string;
  name: string;
  discipline: string;
  summary: string;
  action: string;
  lab: string;
  caption: string;
  image?: string;
  alt?: string;
  sections: { title: string; body: string; link?: { href: string; label: string } }[];
  sources: { title: string; href: string; detail: string }[];
};

export const studies: CaseStudy[] = [
  {
    slug: 'frame-triage',
    name: 'Frame Triage',
    discipline: 'Graphics / machine learning',
    summary:
      'A ceramic ring vanishes between two renders. Slide across the frame, then inspect where a trained detector flags a defect and where it mistakes camera drift for damage.',
    action: 'Compare frames',
    lab: '/labs/frame-triage/',
    caption:
      'Drag the divider across the amber ring. The candidate skipped that component when drawing the frame.',
    sections: [
      {
        title: 'Which changes deserve a closer look?',
        body: 'A pixel difference can tell you where two frames differ. Lighting changes and rendering defects can both light up that difference. The lab lets a developer inspect each pair and decide whether the suggested regions explain the problem.',
      },
      {
        title: 'From a game camera to a test fixture',
        body: 'The separate Minnen example executes the game’s existing Haxe camera at two curvature settings. An illustration draws the resulting points. The November 2026 lab, built with Codex assistance, adds the mechanical scene generator, detector and evaluation alongside that earlier game work.',
      },
      {
        title: 'Keep the experiment inspectable',
        body: 'The held-out set contains 156 procedural frame pairs from 26 unseen scene seeds. The learned detector flagged all 78 defect pairs and falsely flagged two benign pairs. The tuned baseline found 74 defects with zero false alarms. The lab retains the error cases so you can inspect the cost of finding four more defects.',
      },
    ],
    sources: [
      {
        title: 'Rebuild the benchmark',
        href: 'https://github.com/NaxeCode/Minnen/tree/1f1b75e70b8cfedd6195cc4465a2993c59df33dc/tools/frame-triage',
        detail: 'Renderer, training procedure, CLI and test commands',
      },
      {
        title: 'Held-out frame decisions',
        href: 'https://github.com/NaxeCode/Minnen/blob/1f1b75e70b8cfedd6195cc4465a2993c59df33dc/tools/frame-triage/web/assets/test-cases.json',
        detail: 'Inspect the two jitter alarms and the four baseline misses',
      },
      {
        title: 'Minnen camera projection',
        href: 'https://github.com/NaxeCode/Minnen/blob/34f8c86dc4ec04ed8d2ba5d721a35e7ba97c77c3/source/logworld/LogCamera.hx',
        detail: 'Original Haxe implementation exercised by the separate camera fixture',
      },
    ],
  },
  {
    slug: 'photon-trail',
    name: 'Photon Trail',
    discipline: 'Financial systems / TypeScript',
    summary:
      'A bank feed says a payment changed. Does it still match the statement? Replay an interrupted sync, compare possible matches and keep an operator’s correction.',
    action: 'Reconcile a statement',
    lab: '/labs/photon-trail/',
    caption: 'A fictional operating statement in the Photon Trail reconciliation studio.',
    image: '/studies/photon.webp',
    alt: 'Photon Trail reconciliation studio with a synthetic statement, incoming changes and the transaction ledger',
    sections: [
      {
        title: 'A moving ledger',
        body: 'A bank feed can add, amend or remove transactions between syncs. A statement is a separate record. The studio makes the operator inspect what changed before deciding which two records describe the same purchase.',
      },
      {
        title: 'When the ranker picks the wrong receipt',
        body: 'Two Counterform charges settle for the same amount. The weighted ranker favors the later bank entry. The proof-run receipt identifies the earlier one. The evaluation keeps this miss visible, and the operator can record the correct match.',
      },
      {
        title: 'Keep the operator’s decision',
        body: 'The demo uses a fictional print shop’s statement. Apply a category override, interrupt a sync and replay it. Follow a candidate match through review and inspect the recorded decision. The production-facing repository also contains a separate Plaid integration and database-backed routes.',
      },
    ],
    sources: [
      {
        title: 'Compare the matchers',
        href: 'https://github.com/NaxeCode/Photon-Trail/blob/4eb9b1c063f7f6e3b913bfe4896b8e7e649d7596/lib/reconciliation/matching.ts',
        detail: 'Exact matching, weighted ranking and abstention',
      },
      {
        title: 'Database-backed sync tests',
        href: 'https://github.com/NaxeCode/Photon-Trail/blob/4eb9b1c063f7f6e3b913bfe4896b8e7e649d7596/__tests__/sync-postgres.test.ts',
        detail: 'Run production SQL writes against embedded PostgreSQL (PGlite)',
      },
      {
        title: 'Photon Trail repository',
        href: 'https://github.com/NaxeCode/Photon-Trail',
        detail: 'Application, sample data, and setup',
      },
      {
        title: 'Plaid sync implementation',
        href: 'https://github.com/NaxeCode/Photon-Trail/blob/fbeddb3920d1626469b0377711f83773eebb1402/lib/plaid-sync.ts',
        detail: 'How the application applies incremental bank updates',
      },
    ],
  },
  {
    slug: 'cosmic-digest',
    name: 'Cosmic Digest',
    discipline: 'Applied AI / C# and .NET',
    summary:
      'Can a model quote the right words and still draw the wrong conclusion? This C# briefing service exposes the source, the raw response and the validator’s decision. A local model experiment shows where those checks fall short.',
    action: 'Inspect model outputs',
    lab: '/labs/cosmic-digest/#model/north-hold/reversed',
    caption: 'Recorded Qwen2.5 outputs on 12 synthetic source packets, each presented in both orders.',
    image: '/studies/digest.webp',
    alt: 'Cosmic Digest local model study comparing the C# guard and source-and-scope rubric',
    sections: [
      {
        title: 'Reverse the same two sources',
        body: 'A release says calibration files are available. A later operations report puts the north camera on hold. In the reversed ordering, the local model chose the release. Its quotation passed the production C# guard, but it missed the hold that the frozen rubric required.',
        link: {
          href: '/labs/cosmic-digest/#model/north-hold/reversed',
          label: 'Inspect the raw response',
        },
      },
      {
        title: 'Try a correction-aware policy',
        body: 'A later-notice check referred three stale instructions in a new sixteen-response experiment. It also flagged a still-valid approval and accepted a suspension after the job reopened. Compare both policies on the same raw responses before deciding which ones a human should review.',
        link: { href: '/labs/cosmic-digest/#corrections', label: 'Inspect the correction trial' },
      },
      {
        title: 'What the guard catches',
        body: 'The experiment used a four-bit Qwen2.5-1.5B-Instruct model on an Apple M4. Twelve fictional packets, shown twice in opposite orders, gave 24 responses. Thirteen passed the guard and six passed both the guard and the frozen source-and-scope rubric. Source selections agreed across orders in just one of the 12 pairs. A retrospective rule requiring agreement and two guard passes referred all 12 for review. It accepted none.',
      },
      {
        title: 'A quotation can belong to a different report',
        body: 'Six synthetic dispatches form three ranked events. The C# run rejects a quotation borrowed from the wrong report. In another fixture it accepts a conclusion broader than its source. Inspect both outcomes to see where an exact quote helps and where semantic judgment is still needed.',
        link: { href: '/labs/cosmic-digest/#case/borrowed-quote', label: 'Replay the fixed case' },
      },
      {
        title: 'Replay the prepared message',
        body: 'The job writes the prepared email before sending. After an ambiguous response it retrieves the same subject, body and idempotency key, even if more news has arrived. At 24 hours from preparation it stops automatic replay and leaves the pending entry available for inspection.',
      },
    ],
    sources: [
      {
        title: 'Raw local model run',
        href: 'https://github.com/NaxeCode/Cosmic-Digest/blob/c8faaee8f4ab70c26eed8aaf26e74b1aa2956759/tools/BriefingLab/model-eval/run.json',
        detail: 'All 24 recorded model responses and the generation settings',
      },
      {
        title: 'Frozen protocol',
        href: 'https://github.com/NaxeCode/Cosmic-Digest/blob/86494f41819498ab173edbdd73c119c51cb4eb57/tools/BriefingLab/model-eval/PROTOCOL.md',
        detail: 'Order comparison, withheld labels and the pre-inference scoring rule',
      },
      {
        title: 'Quote verification in C#',
        href: 'https://github.com/NaxeCode/Cosmic-Digest/blob/efe2b474703935106d06a3eff9e808c5f52f1e4b/Selection/SourceExcerpt.cs',
        detail: 'The exact check on quoted source text',
      },
      {
        title: 'Offline briefing fixtures',
        href: 'https://github.com/NaxeCode/Cosmic-Digest/tree/efe2b474703935106d06a3eff9e808c5f52f1e4b/tools/BriefingLab',
        detail: 'Regenerate the report from the nine fixed responses',
      },
      {
        title: 'Source validation tests',
        href: 'https://github.com/NaxeCode/Cosmic-Digest/blob/1a9afe2d27220256699ecd9c348109b49c1f77de/tests/CosmicDigest.Tests/NewsAiTests.cs',
        detail: 'Missing references and contradictory reports',
      },
      {
        title: 'Outbox replay tests',
        href: 'https://github.com/NaxeCode/Cosmic-Digest/blob/1a9afe2d27220256699ecd9c348109b49c1f77de/tests/CosmicDigest.Tests/DigestIdempotencyTests.cs',
        detail: 'Verify the original payload and delivery key',
      },
      {
        title: 'Cosmic Digest repository',
        href: 'https://github.com/NaxeCode/Cosmic-Digest',
        detail: 'C# service, fixtures and offline newsletter preview',
      },
    ],
  },
  {
    slug: 'lmms-nebula',
    name: 'LMMS-Nebula',
    discipline: 'Audio / creative tools',
    summary:
      'I wanted to program music for a game. The LMMS-Nebula fork extends the open-source workstation with a local control socket and a tool adapter. This browser session lets you hear a score and inspect the edits that produce it.',
    action: 'Open audio lab',
    lab: '/labs/lmms-session/',
    caption: 'A four-track session in the browser score editor.',
    image: '/studies/audio.webp',
    alt: 'LMMS-Nebula session editor with four tracks and an editable note grid',
    sections: [
      {
        title: 'Give a program a way to edit music',
        body: 'LMMS supplies the workstation, sequencer and project format. The fork adds a local socket, a client and an MCP adapter so another program can inspect or edit a session. The fork keeps edit validation close to the workstation.',
      },
      {
        title: 'Hear the edit',
        body: 'Play the original score, edit a note and listen again. The browser synthesizes the editable preview. A separate ten-second clip comes from rendering the exported project in LMMS itself. A native socket check exercised all four tracks and 74 notes, rejected an invalid batch and preserved a velocity edit through save and reopen.',
      },
    ],
    sources: [
      {
        title: 'Score editor and native checks',
        href: 'https://github.com/NaxeCode/lmms-nebula/tree/f9436fecfb986afb7a9414261cfcea31dfbbd9d3/nebula/session',
        detail: 'Source for the original cue, MMP exporter and bridge round-trip test',
      },
      {
        title: 'Local control socket',
        href: 'https://github.com/NaxeCode/lmms-nebula/commit/8803a37dcdf61ea659f9a4339635a918f2583728',
        detail: 'The fork’s C++ additions to the LMMS workstation',
      },
      {
        title: 'Client and MCP adapter',
        href: 'https://github.com/NaxeCode/lmms-nebula/commit/d25444466179171e10b1f1a90e5fe0c66553b3e6',
        detail: 'Socket client, tool adapter and macOS build details',
      },
      {
        title: 'Upstream LMMS',
        href: 'https://github.com/LMMS/lmms',
        detail: 'Open-source workstation on which the fork is based',
      },
    ],
  },
  {
    slug: 'shallow-water',
    name: 'Shallow Water Lab',
    discipline: 'Fluid dynamics / numerical methods',
    summary: 'Lift a gate between two water levels. Watch the upstream water fan out and measure the shock moving downstream.',
    action: 'Open the flume',
    lab: '/labs/shallow-water/',
    image: '/studies/shallow-water.webp',
    alt: 'Water depth down the channel and a space-time diagram of the gate release',
    caption: 'Water depth and velocity in a straight, level flume. The analytical solution gives a reference for the numerical result.',
    sections: [
      { title: 'Follow the front', body: 'Change the initial water depths, move the time cursor and sample the velocity at a gauge. The model evolves depth and discharge in one spatial dimension.' },
      { title: 'Measure the error', body: 'With 2.4 metres of water upstream and 0.6 metres downstream, the exact shock travels about 4.56 m/s. At four seconds the mean absolute depth error fell from 28.1 mm with 120 cells to 6.24 mm with 960 cells. The comparison covers this idealized wet-bed problem.' },
    ],
    sources: [{ title: 'Solver and benchmark', href: 'https://github.com/NaxeCode/shallow-water-lab/tree/b0cb930a4d99f7f3a805e91e4bf0ff81a821ea09', detail: 'Run the finite-volume solver and reproduce the resolution comparison' }],
  },
  {
    slug: 'rigid-body',
    name: 'Tumble Bench',
    discipline: '3D simulation / rotational dynamics',
    summary: 'Spin the same rotor around each of its three axes. A small nudge makes one launch turn end over end.',
    action: 'Spin the rotor',
    lab: '/labs/rigid-body/',
    image: '/studies/rigid-body.webp',
    alt: 'A perspective view of the rotor alongside its launch controls',
    caption: 'The body-axis marker rotates with the object. The launch angular momentum provides a fixed reference in space.',
    sections: [
      { title: 'Perturb a steady spin', body: 'Set the spin rate and off-axis nudge. Switch the visible launch while all three rotors advance together. Orbit the camera or step through the flip to compare the three trajectories.' },
      { title: 'Check the physics', body: 'Euler’s torque-free equations evolve the angular velocity in the body frame. A quaternion carries the orientation into the world frame. For a 6 rad/s launch with a 4% nudge, the middle axis crossed 90 degrees at about 1.33 seconds. The peak relative world angular momentum error over 24 simulated seconds was 3.84 × 10⁻⁹ or less at a 1/240-second step.' },
    ],
    sources: [{ title: 'Integrator and validation', href: 'https://github.com/NaxeCode/rigid-body-lab/tree/340ed9df1cdfa05e18f95c77960d4b575cd06a0e', detail: 'Inspect the step size, conservation checks and assumptions behind the rotor' }],
  },
  {
    slug: 'schedule-rehearsal',
    name: 'Schedule Rehearsal',
    discipline: 'C# / durable scheduling',
    summary: 'A clock-rule change moves Havana’s 9 a.m. briefing by an hour. Decide which jobs should move, interrupt the update and inspect the persisted result.',
    action: 'Review the schedule',
    lab: '/labs/schedule-rehearsal/',
    image: '/studies/schedule-rehearsal.webp',
    alt: 'Reviewing old and new UTC times for scheduled jobs in Havana',
    caption: 'A browser replay of a local Quartz.NET run. Each firing comes from a persisted trigger and a controlled clock.',
    sections: [
      { title: 'Preserve the promise', body: 'One job promises a local wall time. Another promises a fixed UTC instant. Migrating them with the same rule can silently change the hour someone receives a result. Compare the old and new IANA data against both intents.' },
      { title: 'Restart after a committed change', body: 'The runner interrupts an approved migration after a trigger change is persisted. A fresh process reopens the store, checks what has already happened and continues. Already-fired work and later edits are checked separately.' },
    ],
    sources: [{ title: 'Scheduler, manifests and measured runs', href: 'https://github.com/NaxeCode/schedule-rehearsal/tree/6c68571e1e48670403a3624817ad46f13616b07b', detail: 'Reproduce the migration against a local persistent Quartz job store' }],
  },
];

export function getStudy(slug: string) {
  return studies.find((study) => study.slug === slug);
}
