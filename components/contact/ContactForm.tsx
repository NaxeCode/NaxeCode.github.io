'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@stargazers-stella/cosmic-ui';

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    // For now, just simulate submission since FormSpree ID isn't set up yet
    // In production, you'd use: fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`, ...)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <Card className="cosmic-card surface border-border backdrop-blur-xl">
        <CardHeader className="p-6 sm:p-8 lg:p-10">
          <CardTitle className="text-primary text-2xl">Message Sent!</CardTitle>
          <CardDescription className="text-base mt-2">Thanks for reaching out. I&apos;ll get back to you soon.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="cosmic-card surface border-border backdrop-blur-xl">
      <CardHeader className="p-6 sm:p-8 lg:p-10">
        <CardTitle className="text-2xl">Get in Touch</CardTitle>
        <CardDescription className="text-base mt-2">
          Send me a message about projects, collaborations, or just to say hi.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 sm:px-8 lg:px-10 pb-6 sm:pb-8 lg:pb-10">
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
