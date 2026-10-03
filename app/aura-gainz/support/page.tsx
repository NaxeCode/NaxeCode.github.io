import Link from "next/link";

const TITLE = "Aura Gainz - Support";
const DESCRIPTION = "Get help with Aura Gainz for iPhone and Apple Watch.";
const PAGE_URL = "https://naxe.dev/aura-gainz/support/";

// Route metadata merges shallowly, so restate openGraph/twitter or the
// portfolio's homepage card is shared for this page.
export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, type: "website" },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION },
};

const FAQ = [
  {
    q: "My workouts are not showing on my other device.",
    a: "Make sure both devices are signed in to the same Apple Account and that iCloud is on for Aura Gainz in Settings. Sync can take a few minutes on a slow connection.",
  },
  {
    q: "Heart rate is missing from a workout.",
    a: "Open the Health app, go to your profile, then Apps > Aura Gainz, and allow heart rate access. Heart rate is recorded by Apple Watch during a workout started from the watch.",
  },
  {
    q: "How do I back up or move my data?",
    a: "Use Export in the app to save a JSON or CSV copy. Your data also stays in your private iCloud account while sync is on.",
  },
  {
    q: "How do I delete my data?",
    a: "Delete the app to remove data on that device. Remove synced data from iCloud in Settings > your name > iCloud > Manage Storage.",
  },
];

export default function AuraGainzSupportPage() {
  return (
    <section className="min-h-screen px-4 py-24">
      <article className="mx-auto max-w-2xl space-y-6 text-muted-foreground">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.12em]">Aura Gainz</p>
          <h1 className="text-3xl font-semibold text-foreground">Support</h1>
        </header>

        <p>
          Something not working, or have an idea? Email{" "}
          <a className="text-foreground underline" href="mailto:aladdin@naxe.dev?subject=Aura%20Gainz">
            aladdin@naxe.dev
          </a>{" "}
          with your device, iOS or watchOS version, and what happened.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-foreground">Common questions</h2>
        <dl className="space-y-5">
          {FAQ.map(({ q, a }) => (
            <div key={q} className="space-y-1">
              <dt className="font-medium text-foreground">{q}</dt>
              <dd>{a}</dd>
            </div>
          ))}
        </dl>

        <p className="pt-4">
          <Link className="text-foreground underline" href="/aura-gainz/privacy/">
            Privacy Policy
          </Link>
        </p>
      </article>
    </section>
  );
}
