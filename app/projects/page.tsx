import Link from "next/link";
import { loadCopy } from "@/lib/data-loader";
import copyData from "@/data/copy.json";

export const metadata = {
  title: `${copyData.site.title} - Projects`,
  description: copyData.site.description,
};

export default function ProjectsPage() {
  const copy = loadCopy();
  const stub = copy.stubs.projects;

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-2xl text-center space-y-4">
        <p className="eyebrow">{stub.eyebrow}</p>
        <h1 className="h2">{stub.title}</h1>
        <p className="body">{stub.body}</p>
        <Link
          href="/#projects"
          className="btn btn-primary"
        >
          {stub.cta}
        </Link>
      </div>
    </div>
  );
}
