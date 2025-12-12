'use client';

import Link from 'next/link';
import { Button } from '@stargazers-stella/cosmic-ui';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-32 text-center">
      <div className="space-y-6">
        <h1 className="text-8xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-semibold text-foreground">Lost in space?</h2>
        <p className="text-lg text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist in this universe.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Link href="/">
            <Button className="bg-primary text-primary-foreground">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/projects">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              View Projects
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
