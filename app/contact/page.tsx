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
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-2xl text-center space-y-4">
        <p className="eyebrow">{stub.eyebrow}</p>
        <h1 className="h2">{stub.title}</h1>
        <p className="body">{stub.body}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="mailto:siraj.n.lee@gmail.com"
            className="btn btn-primary"
          >
            {stub.ctaEmail}
          </a>
          <Link
            href="/#about"
            className="btn btn-secondary"
          >
            {stub.ctaAbout}
          </Link>
        </div>
      </div>
    </div>
  );
}
