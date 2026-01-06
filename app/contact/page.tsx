import Link from "next/link";
import { loadCopy } from "@/lib/data-loader";
import copyData from "@/data/copy.json";

export const metadata = {
  title: `${copyData.site.title} - Contact`,
  description: copyData.site.description,
};

export default function ContactPage() {
  const copy = loadCopy();
  const stub = copy.stubs.contact;

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl text-center space-y-4">
        <p className="text-sm uppercase tracking-[0.12em] text-muted-foreground">{stub.eyebrow}</p>
        <h1 className="text-3xl font-semibold text-foreground">{stub.title}</h1>
        <p className="text-muted-foreground">{stub.body}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="mailto:siraj.n.lee@gmail.com"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-md"
          >
            {stub.ctaEmail}
          </a>
          <Link
            href="/#about"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-semibold text-foreground"
          >
            {stub.ctaAbout}
          </Link>
        </div>
      </div>
    </main>
  );
}
