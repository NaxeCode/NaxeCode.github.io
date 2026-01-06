import { PageTransition } from '@/components/PageTransition';

/**
 * App Router Template
 *
 * This template wraps all pages and enables View Transitions API
 * for smooth client-side navigation.
 *
 * Unlike layout.tsx, template.tsx creates a new instance on each navigation,
 * which is necessary for View Transitions to work properly.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
