import Link from "next/link";
import { loadCopy } from "@/lib/data-loader";
import copyData from "@/data/copy.json";

export const metadata = {
  title: `${copyData.site.title} - About`,
  description: copyData.site.description,
};

// Server component - no client interactivity needed
export default function AboutPage() {
  const copy = loadCopy();
  const stub = copy.stubs.about;

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl text-center space-y-4">
        <p className="text-sm uppercase tracking-[0.12em] text-muted-foreground">{stub.eyebrow}</p>
        <h1 className="text-3xl font-semibold text-foreground">{stub.title}</h1>
        <p className="text-muted-foreground">{stub.body}</p>
        <Link
          href="/#about"
          className="btn-press inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-md"
        >
          {stub.cta}
        </Link>
      </div>
    </main>
  );
}
