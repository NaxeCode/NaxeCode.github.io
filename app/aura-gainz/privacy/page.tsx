import Link from "next/link";

const TITLE = "Aura Gainz - Privacy Policy";
const DESCRIPTION = "How Aura Gainz handles your workout and health data.";
const PAGE_URL = "https://naxe.dev/aura-gainz/privacy/";

// Route metadata merges shallowly, so restate openGraph/twitter or the
// portfolio's homepage card is shared for this page.
export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, type: "website" },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION },
};

const EFFECTIVE = "October 3, 2026";

export default function AuraGainzPrivacyPage() {
  return (
    <section className="min-h-screen px-4 py-24">
      <article className="mx-auto max-w-2xl space-y-6 text-muted-foreground">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.12em]">Aura Gainz</p>
          <h1 className="text-3xl font-semibold text-foreground">Privacy Policy</h1>
          <p className="text-sm">Effective {EFFECTIVE}</p>
        </header>

        <p>
          Aura Gainz is a workout app for iPhone and Apple Watch. It is built to keep your data on
          your devices and in your own iCloud account. The developer does not collect, receive, or
          sell any of it.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-foreground">What the app stores</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Your plans, workouts, and history are stored on your device.</li>
          <li>
            If iCloud is on, a copy syncs through your private iCloud account so your other devices
            stay current. Apple holds that data under your Apple Account; the developer cannot read
            it.
          </li>
          <li>
            With your permission, completed workouts and heart rate are saved to and read from
            Apple Health. You can change this at any time in the Health app. Saying no does not stop
            you from logging workouts.
          </li>
          <li>
            Conversations with the in-app coach are processed on your device by Apple&apos;s
            on-device models and stored only on that device.
          </li>
        </ul>

        <h2 className="pt-4 text-xl font-semibold text-foreground">What the app does not do</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>No account or sign-up.</li>
          <li>No advertising, tracking, or advertising identifier.</li>
          <li>No analytics or third-party SDKs that collect data.</li>
          <li>No developer-run server or database. Nothing you enter is sent to the developer.</li>
        </ul>

        <h2 className="pt-4 text-xl font-semibold text-foreground">Exports</h2>
        <p>
          You can export your data as JSON or CSV. Exports contain your training and any health
          notes you entered, and go only where you choose to send them.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-foreground">Deleting your data</h2>
        <p>
          Deleting the app removes the data stored on that device, apart from your normal device
          backups. Synced data stays in your iCloud account until you delete it from the app or
          from iCloud settings (Settings &gt; your name &gt; iCloud &gt; Manage Storage). Health
          records are managed in the Health app.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-foreground">Children</h2>
        <p>The app is not directed to children under 13 and collects no data from anyone.</p>

        <h2 className="pt-4 text-xl font-semibold text-foreground">Changes and contact</h2>
        <p>
          If this policy changes, the new version will be posted here with a new effective date.
          Questions go to{" "}
          <a className="text-foreground underline" href="mailto:aladdin@naxe.dev">
            aladdin@naxe.dev
          </a>
          .
        </p>

        <p className="pt-4">
          <Link className="text-foreground underline" href="/aura-gainz/support/">
            Aura Gainz support
          </Link>
        </p>
      </article>
    </section>
  );
}
