'use client';

import type React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@stargazers-stella/cosmic-ui';
import { trackFormSubmit } from '@/lib/analytics';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInteractiveHover = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -2;
    const rotateY = ((x - centerX) / centerX) * 2;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    const spotlight = card.querySelector('.cosmic-spotlight') as HTMLElement;
    const spotlightGreen = card.querySelector('.cosmic-spotlight-green') as HTMLElement;
    if (spotlight) {
      spotlight.style.background = `radial-gradient(circle 400px at ${percentX}% ${percentY}%, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.12) 30%, rgba(6, 182, 212, 0.08) 50%, transparent 70%)`;
    }
    if (spotlightGreen) {
      spotlightGreen.style.background = `radial-gradient(circle 400px at ${percentX}% ${percentY}%, rgba(16, 185, 129, 0.18), rgba(34, 197, 94, 0.14) 30%, rgba(20, 184, 166, 0.1) 50%, transparent 70%)`;
      spotlightGreen.style.opacity = '1';
    }
  };

  const handleInteractiveLeave = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    const spotlightGreen = card.querySelector('.cosmic-spotlight-green') as HTMLElement;
    if (spotlightGreen) {
      spotlightGreen.style.opacity = '0';
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // For now, just simulate submission since FormSpree ID isn't set up yet
      // In production, you'd use: fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`, ...)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitted(true);
      trackFormSubmit('Contact Form', true);
    } catch (error) {
      trackFormSubmit('Contact Form', false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Card
        className="group relative tilt-card cosmic-card border border-border/50 bg-gradient-to-br from-surface/95 via-surface-strong/98 to-surface/95 backdrop-blur-2xl overflow-hidden"
        onMouseMove={handleInteractiveHover}
        onMouseLeave={handleInteractiveLeave}
      >
        <div className="cosmic-spotlight absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none" />
        <div className="cosmic-spotlight-green absolute inset-0 pointer-events-none transition-opacity duration-300" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                'repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(139, 92, 246, 0.03) 80px, rgba(139, 92, 246, 0.03) 160px, transparent 160px, transparent 240px, rgba(236, 72, 153, 0.03) 240px, rgba(236, 72, 153, 0.03) 320px)',
              transform: 'translateX(-50%)',
              width: '200%',
              animation: 'prismShift 20s linear infinite',
            }}
          />
        </div>
        <div className="absolute top-0 left-0 w-10 h-10 border-l border-t border-primary/30 rounded-tl-2xl" />
        <div className="absolute bottom-0 right-0 w-10 h-10 border-r border-b border-primary/30 rounded-br-2xl" />
        <CardHeader className="relative p-6 sm:p-8 lg:p-10">
          <CardTitle className="text-primary text-2xl">Message Sent!</CardTitle>
          <CardDescription className="text-base mt-2">Thanks for reaching out. I&apos;ll get back to you soon.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card
      className="group relative tilt-card cosmic-card border border-border/50 bg-gradient-to-br from-surface/95 via-surface-strong/98 to-surface/95 backdrop-blur-2xl overflow-hidden"
      onMouseMove={handleInteractiveHover}
      onMouseLeave={handleInteractiveLeave}
    >
      <div className="cosmic-spotlight absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none" />
      <div className="cosmic-spotlight-green absolute inset-0 pointer-events-none transition-opacity duration-300" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              'repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(139, 92, 246, 0.03) 80px, rgba(139, 92, 246, 0.03) 160px, transparent 160px, transparent 240px, rgba(236, 72, 153, 0.03) 240px, rgba(236, 72, 153, 0.03) 320px)',
            transform: 'translateX(-50%)',
            width: '200%',
            animation: 'prismShift 20s linear infinite',
          }}
        />
      </div>
      <div className="absolute top-0 left-0 w-10 h-10 border-l border-t border-primary/30 rounded-tl-2xl" />
      <div className="absolute bottom-0 right-0 w-10 h-10 border-r border-b border-primary/30 rounded-br-2xl" />
      <CardHeader className="relative p-6 sm:p-8 lg:p-10">
        <CardTitle className="text-2xl">Get in Touch</CardTitle>
        <CardDescription className="text-base mt-2">
          Send me a message about projects, collaborations, or just to say hi.
        </CardDescription>
      </CardHeader>
      <CardContent className="relative px-6 sm:px-8 lg:px-10 pb-6 sm:pb-8 lg:pb-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Name</label>
            <input
              {...register('name')}
              className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="Your name"
            />
            {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Email</label>
            <input
              {...register('email')}
              type="email"
              className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Subject</label>
            <input
              {...register('subject')}
              className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="What's this about?"
            />
            {errors.subject && <p className="text-destructive text-sm mt-1">{errors.subject.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Message</label>
            <textarea
              {...register('message')}
              rows={6}
              className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-all"
              placeholder="Your message..."
            />
            {errors.message && <p className="text-destructive text-sm mt-1">{errors.message.message}</p>}
          </div>

          <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
