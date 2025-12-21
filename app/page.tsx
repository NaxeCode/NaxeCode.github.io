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
    <main className="min-h-screen px-4 pb-28 md:pb-32">
      <section className="max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-28 flex flex-col gap-12 md:gap-16 lg:gap-20">
        {/* Hero Badge */}
        <div className="inline-flex items-center gap-2 w-fit rounded-full surface-muted px-3 py-1 text-sm text-muted-foreground ring-1 ring-border">
          <Badge variant="outline" className="border-primary/40 text-primary">
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            cosmic-ui powered
          </Badge>
          <span className="text-xs text-muted-foreground">
            naxe.dev · portfolio + playground
          </span>
        </div>

        {/* Hero Section */}
        <div className="grid gap-8 md:gap-10 md:grid-cols-[1.2fr_0.8fr] items-start">
          {/* Main Profile Card */}
          <Card className="cosmic-card surface border-border backdrop-blur-xl">
            <CardHeader className="flex flex-row items-start gap-4 p-6 sm:p-8 lg:p-10">
              <img
                src="https://github.com/naxecode.png"
                alt="NaxeCode avatar"
                className="h-16 w-16 rounded-full border-2 border-border shadow-lg"
              />
              <div className="space-y-2">
                <CardTitle className="text-3xl text-foreground">
                  Aladdin · NaxeCode
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                  Shipping thoughtful web products with TypeScript, Next.js, and
                  a little bit of space dust. Also tinkering in .NET, finance
                  APIs, and reusable UI.
                </CardDescription>
                <div className="flex flex-wrap gap-2 pt-1">
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    Full-stack
                  </Badge>
                  <Badge className="surface-muted text-foreground border-border">
                    Finance APIs
                  </Badge>
                  <Badge className="surface-muted text-foreground border-border">
                    AI-assisted UX
                  </Badge>
                  <Badge className="surface-muted text-foreground border-border">
                    Design systems
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    className={buttonVariants({
                      className:
                        "bg-primary text-primary-foreground hover:bg-primary/90",
                    })}
                    href="mailto:naxecode@proton.me"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Let&apos;s work together
                  </a>
                  <a
                    className={buttonVariants({
                      variant: "outline",
                      className:
                        "border-border text-foreground hover:surface-muted",
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
                      className: "text-foreground hover:surface-muted",
                    })}
                    href="https://linkedin.com/in/aladdin-ali01"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* What I Build Card */}
          <Card className="cosmic-card surface-strong border-border bg-gradient-to-br from-surface via-surface-strong to-primary/10 backdrop-blur-xl mb-4">
            <CardHeader className="p-6 sm:p-8 lg:p-10 pb-4">
              <CardTitle className="text-foreground flex items-center gap-2">
                <Waypoints className="h-5 w-5 text-primary" />
                What I build
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground leading-snug">
                Fintech dashboards, AI-assisted flows, and reusable UI that
                travels across products.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 px-6 sm:px-8 lg:px-10 pb-6 sm:pb-8 lg:pb-10">
              <div className="inline-flex items-center gap-2 rounded-full surface-muted px-3 py-1.5 text-sm text-foreground ring-1 ring-border">
                <span className="text-base leading-none">💳</span>
                <span className="font-medium">Plaid + Neon</span>
                <span className="text-muted-foreground">
                  Secure linking + tokens
                </span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full surface-muted px-3 py-1.5 text-sm text-foreground ring-1 ring-border">
                <span className="text-base leading-none">🤖</span>
                <span className="font-medium">AI categorization</span>
                <span className="text-muted-foreground">
                  Validation + backoff
                </span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full surface-muted px-3 py-1.5 text-sm text-foreground ring-1 ring-border">
                <span className="text-base leading-none">🪐</span>
                <span className="font-medium">Design systems</span>
                <span className="text-muted-foreground">
                  cosmic-ui primitives
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Projects */}
        <div className="flex items-center justify-between gap-4 flex-wrap pt-6">
          <div>
            <h2 className="text-3xl font-semibold text-foreground">
              Featured projects
            </h2>
            <p className="text-base text-muted-foreground mt-2">
              Select builds that show my recent work across web, AI, and UI.
            </p>
          </div>
          <Link
            href="/projects"
            className={buttonVariants({
              variant: "secondary",
              className: "surface-muted text-foreground border border-border",
            })}
          >
            View All Projects <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
          {featuredProjects.map((project) => (
            <Card
              key={project.slug}
              className="cosmic-card border-border surface backdrop-blur-xl"
            >
              <CardHeader className="pb-4 p-6 sm:p-8 lg:p-10">
                <CardTitle className="text-foreground flex items-start justify-between gap-3">
                  <span>{project.title}</span>
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    {project.year}
                  </Badge>
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {project.summary}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 px-6 sm:px-8 lg:px-10 pb-6 sm:pb-8 lg:pb-10">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-border text-muted-foreground surface-muted"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonVariants({
                        variant: "outline",
                        size: "sm",
                        className: "border-border text-foreground",
                      })}
                    >
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  )}
                  <Link
                    href={`/projects/${project.slug}`}
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                      className: "text-foreground",
                    })}
                  >
                    View Details <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* cosmic-ui Showcase */}
        <Card className="cosmic-card border-border surface backdrop-blur-xl mt-12 md:mt-16 lg:mt-20 mb-12 md:mb-16 lg:mb-20">
          <CardHeader className="p-6 sm:p-8 lg:p-10">
            <CardTitle className="text-foreground text-2xl">
              cosmic-ui → shared design DNA
            </CardTitle>
            <CardDescription className="text-muted-foreground text-base mt-2">
              The UI kit I built powers my projects. Token-driven, Radix under
              the hood, CSS variable theming so it drops into Tailwind projects.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3 px-6 sm:px-8 lg:px-10 pb-6 sm:pb-8 lg:pb-10">
            <Badge className="bg-primary/20 text-primary border-primary/30">
              Buttons
            </Badge>
            <Badge className="surface-muted text-foreground border-border">
              Cards
            </Badge>
            <Badge className="surface-muted text-foreground border-border">
              Command palette
            </Badge>
            <Badge className="surface-muted text-foreground border-border">
              Selects
            </Badge>
            <Badge className="surface-muted text-foreground border-border">
              Tables
            </Badge>
            <a
              className={buttonVariants({
                variant: "outline",
                className:
                  "border-border text-foreground mt-1 inline-flex w-fit",
              })}
              href="https://github.com/stargazers-stella/cosmic-ui"
              target="_blank"
              rel="noopener noreferrer"
            >
              View library <ArrowRight className="h-4 w-4 ml-2" />
            </a>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
