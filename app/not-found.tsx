import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { loadCopy } from "@/lib/data-loader";

export default function NotFound() {
  const copy = loadCopy();

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <div className="space-y-6">
        <h1 className="display text-aura inline-block">404</h1>
        <h2 className="h2">{copy.notFound.title}</h2>
        <p className="lead">
          {copy.notFound.description}
        </p>
        <div className="flex gap-3 justify-center pt-4">
          <Link
            href="/"
            className="btn btn-primary"
          >
            <Home className="h-4 w-4" />
            {copy.notFound.primaryCta}
          </Link>
          <Link
            href="/#projects"
            className="btn btn-secondary"
          >
            <ArrowLeft className="h-4 w-4" />
            {copy.notFound.secondaryCta}
          </Link>
        </div>
      </div>
    </div>
  );
}
