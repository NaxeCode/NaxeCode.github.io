'use client';

import { ContactForm } from '@/components/contact/ContactForm';
import { Card, CardContent } from '@stargazers-stella/cosmic-ui';
import { Mail, Github, Linkedin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-20 lg:py-24">
      <div className="mb-14 lg:mb-16">
        <h1 className="text-5xl font-bold text-foreground mb-8">Contact</h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Let&apos;s connect! Whether you have a project in mind, want to collaborate, or just want to say hi.
        </p>
      </div>

      <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1fr_0.8fr]">
        <ContactForm />

        <div className="space-y-6">
          <Card className="cosmic-card surface border-border backdrop-blur-xl">
            <CardContent className="p-6 sm:p-8 lg:p-10 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Other ways to reach me</h3>
                <div className="space-y-3">
                  <a
                    href="mailto:naxecode@proton.me"
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                    <span>naxecode@proton.me</span>
                  </a>
                  <a
                    href="https://github.com/naxecode"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github className="h-5 w-5" />
                    <span>@naxecode</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/aladdin-ali01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span>Aladdin Ali</span>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cosmic-card surface border-border backdrop-blur-xl">
            <CardContent className="p-6 sm:p-8 lg:p-10">
              <h3 className="text-lg font-semibold text-foreground mb-3">Quick response</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I typically respond within 24-48 hours. For urgent inquiries, feel free to reach out via email directly.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
