import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { loadCopy } from "@/lib/data-loader";

export default function NotFound() {
  const copy = loadCopy();

  return (
    <div className="container mx-auto max-w-2xl px-4 py-24 text-center">
      <div className="space-y-6">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold text-foreground">{copy.notFound.title}</h2>
        <p className="text-lg text-muted-foreground">
          {copy.notFound.description}
        </p>
        <div className="flex gap-3 justify-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            <Home className="h-4 w-4" />
            {copy.notFound.primaryCta}
          </Link>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {copy.notFound.secondaryCta}
          </Link>
        </div>
      </div>
    </div>
  );
}
