"use client";

import {
  ArrowRight,
  Mail,
  Github,
  Linkedin,
  Sparkles,
  Waypoints,
} from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  buttonVariants,
} from "@stargazers-stella/cosmic-ui";
import { getFeaturedProjects } from "@/lib/data-loader";
import Link from "next/link";

export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <main className="min-h-screen pb-4">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-3 sm:pt-4 lg:pt-6 flex flex-col gap-0">
        {/* Hero Section - Full Width Statement */}
        <div className="grid gap-6 md:gap-8 items-start pb-4">
          {/* Main Profile Card */}
          <div
            className="group relative perspective-1000"
            onMouseMove={(e) => {
              const card = e.currentTarget;
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const rotateX = ((y - centerY) / centerY) * -2;
              const rotateY = ((x - centerX) / centerX) * 2;

              const cardElement = card.querySelector('.tilt-card') as HTMLElement;
              if (cardElement) {
                cardElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
              }

              const percentX = (x / rect.width) * 100;
              const percentY = (y / rect.height) * 100;

              // Update both spotlight layers' positions
              const spotlight = card.querySelector('.cosmic-spotlight') as HTMLElement;
              const spotlightGreen = card.querySelector('.cosmic-spotlight-green') as HTMLElement;

              if (spotlight) {
                spotlight.style.background = `radial-gradient(circle 400px at ${percentX}% ${percentY}%, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.12) 30%, rgba(6, 182, 212, 0.08) 50%, transparent 70%)`;
              }

              if (spotlightGreen) {
                spotlightGreen.style.background = `radial-gradient(circle 400px at ${percentX}% ${percentY}%, rgba(16, 185, 129, 0.18), rgba(34, 197, 94, 0.14) 30%, rgba(20, 184, 166, 0.1) 50%, transparent 70%)`;

                // Check if hovering over a clickable element
                const target = e.target as HTMLElement;
                const isClickable = target.closest('a, button, [role="button"]');

                // Smoothly transition opacity instead of background
                spotlightGreen.style.opacity = isClickable ? '1' : '0';
              }
            }}
            onMouseLeave={(e) => {
              const cardElement = e.currentTarget.querySelector('.tilt-card') as HTMLElement;
              if (cardElement) {
                cardElement.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
              }
            }}
          >
          <Card className="tilt-card cosmic-card relative border border-border/50 bg-gradient-to-br from-surface/95 via-surface-strong/98 to-surface/95 backdrop-blur-2xl overflow-hidden transition-all duration-300 ease-out">
            {/* Purple/Pink spotlight layer */}
            <div className="cosmic-spotlight absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none" />
            {/* Green spotlight layer */}
            <div className="cosmic-spotlight-green absolute inset-0 pointer-events-none" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
              <div className="absolute inset-0 opacity-40" style={{
                background: 'repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(139, 92, 246, 0.03) 80px, rgba(139, 92, 246, 0.03) 160px, transparent 160px, transparent 240px, rgba(236, 72, 153, 0.03) 240px, rgba(236, 72, 153, 0.03) 320px)',
                transform: 'translateX(-50%)',
                width: '200%',
                animation: 'prismShift 20s linear infinite'
              }} />
            </div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-pink-500/5" />
            </div>

            {/* Integrated Hero Badge */}
            <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-10">
              <div className="inline-flex items-center gap-2 rounded-full surface-muted px-3 sm:px-4 py-1.5 sm:py-2 text-sm ring-1 ring-border backdrop-blur-md">
                <Badge variant="outline" className="border-primary/40 text-primary text-xs">
                  <Sparkles className="h-3 w-3 mr-1" />
                  cosmic-ui
                </Badge>
              </div>
            </div>

            <CardHeader className="p-8 sm:p-10 lg:p-12 pb-6 sm:pb-8 relative">
              <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
                <img
                  src="https://github.com/naxecode.png"
                  alt="NaxeCode avatar"
                  className="h-20 w-20 sm:h-24 sm:w-24 rounded-full border-2 border-primary/30 shadow-2xl shadow-primary/20 ring-4 ring-primary/10"
                />
                <div className="space-y-4 flex-1">
                  <div className="space-y-2">
                    <CardTitle className="text-3xl sm:text-4xl lg:text-5xl text-foreground font-bold">
                      Aladdin · NaxeCode
                    </CardTitle>
                    <p className="text-xs sm:text-sm text-primary/80 font-medium">
                      naxe.dev · portfolio + playground
                    </p>
                  </div>
                  <CardDescription className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                    Shipping thoughtful web products with TypeScript, Next.js, and
                    a little bit of space dust. Also tinkering in .NET, finance
                    APIs, and reusable UI.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-8 sm:px-10 lg:px-12 pb-8 sm:pb-10 lg:pb-12 space-y-6">
              {/* Specialty Badges */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <Badge className="bg-primary/20 text-primary border-primary/30 text-sm px-4 py-1.5">
                  Full-stack
                </Badge>
                <Badge className="surface-muted text-foreground border-border text-sm px-4 py-1.5">
                  Finance APIs
                </Badge>
                <Badge className="surface-muted text-foreground border-border text-sm px-4 py-1.5">
                  AI-assisted UX
                </Badge>
                <Badge className="surface-muted text-foreground border-border text-sm px-4 py-1.5">
                  Design systems
                </Badge>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  className={buttonVariants({
                    size: "lg",
                    className:
                      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 w-full sm:w-auto",
                  })}
                  href="mailto:naxecode@proton.me"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Let&apos;s work together
                </a>
                <a
                  className={buttonVariants({
                    variant: "outline",
                    size: "lg",
                    className:
                      "border-border text-foreground hover:bg-surface-muted w-full sm:w-auto",
                  })}
                  href="https://github.com/naxecode"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </a>
                <a
                  className={buttonVariants({
                    variant: "ghost",
                    size: "lg",
                    className:
                      "text-foreground hover:bg-surface-muted w-full sm:w-auto",
                  })}
                  href="https://linkedin.com/in/aladdin-ali01"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </a>
              </div>
            </CardContent>
          </Card>
          </div>

          {/* Cosmic Tech Stack Constellation */}
          <div
            className="group relative perspective-1000"
            onMouseMove={(e) => {
              const card = e.currentTarget;
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const rotateX = ((y - centerY) / centerY) * -2;
              const rotateY = ((x - centerX) / centerX) * 2;

              const cardElement = card.querySelector('.tilt-card') as HTMLElement;
              if (cardElement) {
                cardElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
              }

              const percentX = (x / rect.width) * 100;
              const percentY = (y / rect.height) * 100;
              const spotlight = card.querySelector('.cosmic-spotlight') as HTMLElement;
              const spotlightGreen = card.querySelector('.cosmic-spotlight-green') as HTMLElement;

              if (spotlight) {
                spotlight.style.background = `radial-gradient(circle 400px at ${percentX}% ${percentY}%, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.12) 30%, rgba(6, 182, 212, 0.08) 50%, transparent 70%)`;
              }

              if (spotlightGreen) {
                spotlightGreen.style.background = `radial-gradient(circle 400px at ${percentX}% ${percentY}%, rgba(16, 185, 129, 0.18), rgba(34, 197, 94, 0.14) 30%, rgba(20, 184, 166, 0.1) 50%, transparent 70%)`;
              }
            }}
            onMouseLeave={(e) => {
              const cardElement = e.currentTarget.querySelector('.tilt-card') as HTMLElement;
              if (cardElement) {
                cardElement.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
              }
              const spotlightGreen = e.currentTarget.querySelector('.cosmic-spotlight-green') as HTMLElement;
              if (spotlightGreen) {
                spotlightGreen.style.opacity = '0';
              }
            }}
          >
            <div className="tilt-card relative py-8 sm:py-10 px-6 sm:px-8 lg:px-10 rounded-2xl border border-border/50 bg-gradient-to-br from-surface/90 via-surface-strong/95 to-surface/90 backdrop-blur-2xl overflow-hidden shadow-2xl shadow-primary/10">
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
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-pink-500/5" />
              </div>
              <div className="absolute top-0 left-0 w-12 h-12 border-l border-t border-primary/30 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-r border-b border-primary/30 rounded-br-2xl" />

              {/* Subtle background stars */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-[20%] left-[15%] w-1 h-1 bg-primary rounded-full animate-pulse" />
                <div className="absolute top-[60%] right-[25%] w-1 h-1 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-[30%] left-[70%] w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
              </div>

              <div className="relative space-y-6">
                {/* Header */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <Waypoints className="h-5 w-5 text-primary" />
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                      Tech Stack
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Fintech dashboards, AI flows, and design systems
                    </p>
                  </div>
                </div>

                {/* Flowing constellation of compact badges */}
                <div className="flex flex-wrap gap-2 sm:gap-2.5 justify-center sm:justify-start">
                  {[
                    { emoji: "💳", label: "Plaid", category: "fintech" },
                    { emoji: "🐘", label: "Neon", category: "db" },
                    { emoji: "⚡", label: "Vercel", category: "infra" },
                    { emoji: "🪐", label: "cosmic-ui", category: "featured" },
                    { emoji: "⭐", label: "Stargazers", category: "product" },
                    { emoji: "📋", label: "Watchlist", category: "product" },
                    { emoji: "🤖", label: "AI flows", category: "ai" },
                    { emoji: "🔐", label: "Auth", category: "security" },
                    { emoji: "🎨", label: "Radix", category: "ui" },
                    { emoji: "⚛️", label: "React 19", category: "featured" },
                    { emoji: "📘", label: "TypeScript", category: "featured" },
                    { emoji: "🎯", label: "Next.js", category: "featured" },
                    { emoji: "💨", label: "Tailwind", category: "ui" },
                    { emoji: "🚀", label: ".NET APIs", category: "backend" },
                  ].map((item, index) => (
                    <div
                      key={item.label}
                      className="group relative"
                      style={{
                        animation: `fadeIn 0.4s ease-out ${index * 0.03}s both`
                      }}
                    >
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-all duration-200 ${
                        item.category === 'featured'
                          ? 'bg-gradient-to-r from-primary/20 to-pink-500/20 border-primary/40 text-primary hover:border-primary/60 hover:shadow-lg hover:shadow-primary/20'
                          : 'bg-surface-muted/80 border-border/50 text-foreground/90 hover:border-primary/30 hover:text-foreground hover:bg-surface-muted'
                      } backdrop-blur-sm cursor-default group-hover:scale-105`}>
                        <span className="text-sm leading-none">{item.emoji}</span>
                        <span className="font-medium">{item.label}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtle separator line */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
                  <span className="text-xs text-muted-foreground/60 font-mono">14 technologies</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
                </div>
              </div>
            </div>
          </div>
          </div>

          <div className="h-6 md:h-8" />

        {/* Featured Projects */}
        <div className="space-y-6 sm:space-y-8">
          <div className="flex flex-col items-start justify-between gap-4 flex-wrap sm:flex-row sm:items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Featured projects
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-2">
                Select builds showcasing my work across web, AI, and UI
              </p>
            </div>
            <Link
              href="/projects"
              className={buttonVariants({
                variant: "secondary",
                className:
                  "surface-muted text-foreground border border-border w-full justify-center sm:w-auto hover:border-primary/50 transition-colors",
              })}
            >
              View All Projects <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>

        <div className="grid gap-10 md:grid-cols-2 lg:gap-12">
          {featuredProjects.map((project, index) => (
            <div
              key={project.slug}
              className="group relative perspective-1000"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
              onMouseMove={(e) => {
                const card = e.currentTarget;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -2;
                const rotateY = ((x - centerX) / centerX) * 2;

                // Update card tilt
                const cardElement = card.querySelector('.tilt-card') as HTMLElement;
                if (cardElement) {
                  cardElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
                }

                const percentX = (x / rect.width) * 100;
                const percentY = (y / rect.height) * 100;

                // Update both spotlight layers' positions
                const spotlight = card.querySelector('.cosmic-spotlight') as HTMLElement;
                const spotlightGreen = card.querySelector('.cosmic-spotlight-green') as HTMLElement;

                if (spotlight) {
                  spotlight.style.background = `radial-gradient(circle 400px at ${percentX}% ${percentY}%, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.12) 30%, rgba(6, 182, 212, 0.08) 50%, transparent 70%)`;
                }

                if (spotlightGreen) {
                  spotlightGreen.style.background = `radial-gradient(circle 400px at ${percentX}% ${percentY}%, rgba(16, 185, 129, 0.18), rgba(34, 197, 94, 0.14) 30%, rgba(20, 184, 166, 0.1) 50%, transparent 70%)`;

                  // Check if hovering over a clickable element
                  const target = e.target as HTMLElement;
                  const isClickable = target.closest('a, button, [role="button"]');

                  // Smoothly transition opacity instead of background
                  spotlightGreen.style.opacity = isClickable ? '1' : '0';
                }
              }}
              onMouseLeave={(e) => {
                const cardElement = e.currentTarget.querySelector('.tilt-card') as HTMLElement;
                if (cardElement) {
                  cardElement.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                }
              }}
            >
              {/* Main card */}
              <Card className="tilt-card relative border border-border/50 bg-gradient-to-br from-surface/95 via-surface-strong/98 to-surface/95 backdrop-blur-2xl overflow-hidden transition-all duration-300 ease-out h-full flex flex-col">
                {/* Purple/Pink spotlight layer */}
                <div className="cosmic-spotlight absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none" />
                {/* Green spotlight layer */}
                <div className="cosmic-spotlight-green absolute inset-0 pointer-events-none" />

                {/* Prismatic diagonal bands */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      background: 'repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(139, 92, 246, 0.03) 80px, rgba(139, 92, 246, 0.03) 160px, transparent 160px, transparent 240px, rgba(236, 72, 153, 0.03) 240px, rgba(236, 72, 153, 0.03) 320px)',
                      transform: 'translateX(-50%)',
                      width: '200%',
                      animation: 'prismShift 20s linear infinite'
                    }}
                  />
                </div>

                {/* Edge glow accent */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-pink-500/5" />
                </div>

                {/* Animated cosmic background */}
                <div className="absolute inset-0 opacity-30">
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-pink-500/20"
                    style={{
                      animation: 'shimmer 3s ease-in-out infinite alternate'
                    }}
                  />
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />
                </div>

                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-primary/30 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-primary/30 rounded-br-2xl" />

                <CardHeader className="relative p-8 lg:p-10 pb-6">
                  {/* Year badge - stellar timestamp */}
                  <div className="absolute top-6 right-6 lg:top-8 lg:right-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                      <div className="relative px-4 py-2 rounded-full bg-gradient-to-r from-primary/30 to-pink-500/30 border border-primary/40 backdrop-blur-sm">
                        <span className="text-sm font-bold text-primary">
                          {project.year}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Project title */}
                  <CardTitle className="text-2xl lg:text-3xl font-bold mb-4 pr-20 leading-tight text-foreground group-hover:text-primary transition-colors duration-500">
                    {project.title}
                  </CardTitle>

                  {/* Description */}
                  <CardDescription className="text-base text-muted-foreground/90 leading-relaxed">
                    {project.summary}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative px-8 lg:px-10 pb-8 lg:pb-10 flex-1 flex flex-col">
                  {/* Tech constellation - pyramid layout */}
                  <div className="flex flex-col gap-3 mb-6">
                    <div className="flex justify-center flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <div
                          key={tag}
                          className="relative group/tag"
                          style={{
                            animation: `fadeIn 0.4s ease-out ${i * 0.1 + 0.3}s both`
                          }}
                        >
                          <div className="absolute inset-0 bg-primary/20 blur-md opacity-0 group-hover/tag:opacity-100 transition-opacity" />
                          <Badge
                            variant="outline"
                            className="relative border-primary/30 text-foreground/80 bg-surface-muted/50 backdrop-blur-sm hover:border-primary/60 hover:text-primary transition-all cursor-default"
                          >
                            <span className="relative z-10">{tag}</span>
                          </Badge>
                        </div>
                      ))}
                    </div>
                    {project.tags.length > 3 && (
                      <div className="flex justify-center flex-wrap gap-2">
                        {project.tags.slice(3).map((tag, i) => (
                          <div
                            key={tag}
                            className="relative group/tag"
                            style={{
                              animation: `fadeIn 0.4s ease-out ${i * 0.1 + 0.5}s both`
                            }}
                          >
                            <div className="absolute inset-0 bg-primary/20 blur-md opacity-0 group-hover/tag:opacity-100 transition-opacity" />
                            <Badge
                              variant="outline"
                              className="relative border-primary/30 text-foreground/80 bg-surface-muted/50 backdrop-blur-sm hover:border-primary/60 hover:text-primary transition-all cursor-default"
                            >
                              <span className="relative z-10">{tag}</span>
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex justify-center gap-3 pt-2 mt-auto">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold border border-primary/40 text-foreground bg-surface-muted/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                        <Github className="h-4 w-4 relative z-10" />
                        <span className="relative z-10">GitHub</span>
                      </a>
                    )}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group/btn relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-primary/30 to-pink-500/30 border border-primary/50 text-primary backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-pink-500/40 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 font-bold">Explore</span>
                      <ArrowRight className="h-4 w-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* cosmic-ui Showcase - Full Bleed Banner */}
      <section className="relative pt-3 sm:pt-4 lg:pt-6 pb-0 sm:pb-1 lg:pb-2 mt-6 md:mt-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div
            className="group relative perspective-1000"
            onMouseMove={(e) => {
              const card = e.currentTarget;
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const rotateX = ((y - centerY) / centerY) * -1;
              const rotateY = ((x - centerX) / centerX) * 1;

              const cardElement = card.querySelector('.tilt-card') as HTMLElement;
              if (cardElement) {
                cardElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.005, 1.005, 1.005)`;
              }

              const percentX = (x / rect.width) * 100;
              const percentY = (y / rect.height) * 100;

              // Update both spotlight layers' positions
              const spotlight = card.querySelector('.cosmic-spotlight') as HTMLElement;
              const spotlightGreen = card.querySelector('.cosmic-spotlight-green') as HTMLElement;

              if (spotlight) {
                spotlight.style.background = `radial-gradient(circle 500px at ${percentX}% ${percentY}%, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.12) 30%, rgba(6, 182, 212, 0.08) 50%, transparent 70%)`;
              }

              if (spotlightGreen) {
                spotlightGreen.style.background = `radial-gradient(circle 500px at ${percentX}% ${percentY}%, rgba(16, 185, 129, 0.18), rgba(34, 197, 94, 0.14) 30%, rgba(20, 184, 166, 0.1) 50%, transparent 70%)`;

                // Check if hovering over a clickable element
                const target = e.target as HTMLElement;
                const isClickable = target.closest('a, button, [role="button"]');

                // Smoothly transition opacity instead of background
                spotlightGreen.style.opacity = isClickable ? '1' : '0';
              }
            }}
            onMouseLeave={(e) => {
              const cardElement = e.currentTarget.querySelector('.tilt-card') as HTMLElement;
              if (cardElement) {
                cardElement.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
              }
            }}
          >
            <Card className="tilt-card cosmic-card relative border border-primary/30 bg-gradient-to-br from-surface/95 via-surface-strong/98 to-surface/95 backdrop-blur-2xl overflow-hidden transition-all duration-300 ease-out shadow-2xl shadow-primary/10">
              {/* Purple/Pink spotlight layer */}
              <div className="cosmic-spotlight absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none" />
              {/* Green spotlight layer */}
              <div className="cosmic-spotlight-green absolute inset-0 pointer-events-none" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 opacity-40" style={{
                  background: 'repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(139, 92, 246, 0.03) 80px, rgba(139, 92, 246, 0.03) 160px, transparent 160px, transparent 240px, rgba(236, 72, 153, 0.03) 240px, rgba(236, 72, 153, 0.03) 320px)',
                  transform: 'translateX(-50%)',
                  width: '200%',
                  animation: 'prismShift 20s linear infinite'
                }} />
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-pink-500/5" />
              </div>

              <div className="relative p-8 sm:p-10 lg:p-12">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                  <div className="space-y-4 flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span className="text-xs font-medium text-primary">Design System</span>
                    </div>
                    <CardTitle className="text-foreground text-3xl sm:text-4xl lg:text-5xl font-bold">
                      cosmic-ui
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                      The UI kit powering my projects. Token-driven, Radix under the hood,
                      CSS variable theming—drops seamlessly into Tailwind projects.
                    </CardDescription>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Badge className="bg-primary/20 text-primary border-primary/30">Buttons</Badge>
                      <Badge className="surface-muted text-foreground border-border">Cards</Badge>
                      <Badge className="surface-muted text-foreground border-border">Command palette</Badge>
                      <Badge className="surface-muted text-foreground border-border">Selects</Badge>
                      <Badge className="surface-muted text-foreground border-border">Tables</Badge>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <a
                      className={buttonVariants({
                        size: "lg",
                        variant: "outline",
                        className:
                          "border-primary/40 text-primary hover:bg-primary/10 hover:border-primary/60 transition-all shadow-lg shadow-primary/10 w-full sm:w-auto",
                      })}
                      href="https://github.com/stargazers-stella/cosmic-ui"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View library <ArrowRight className="h-4 w-4 ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
