// @ts-nocheck
import { ArrowRight, ExternalLink, Github, Linkedin, Mail, Sparkles, Waypoints } from 'lucide-react';
import {
	Badge,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	buttonVariants,
} from '@stargazers-stella/cosmic-ui';

const projects = [
	{
		title: 'Stargazers Cosmic Watchlist',
		summary: 'Premium watchlist with stats, server actions, Drizzle + Postgres, Tailwind/shadcn.',
		tags: ['Next.js', 'TypeScript', 'Drizzle', 'Postgres', 'Tailwind'],
		github: 'https://github.com/NaxeCode/Stargazers-Cosmic-Watchlist',
	},
	{
		title: 'Photon Trail',
		summary: 'Plaid-powered personal finance with AI categorization, Neon, and Cosmic UI.',
		tags: ['Next.js', 'Plaid', 'AI', 'Neon', 'Cosmic UI'],
		github: 'https://github.com/NaxeCode/Photon-Trail',
	},
	{
		title: 'Cosmic Digest',
		summary: 'Automated AI newsletter—RSS ingestion, trend scoring, and Mailgun delivery.',
		tags: ['.NET 10', 'OpenAI', 'Mailgun', 'RSS', 'Docker'],
		github: 'https://github.com/NaxeCode/Cosmic-Digest',
	},
	{
		title: 'cosmic-ui',
		summary: 'My lightweight React primitive kit used across projects. CSS variable themed.',
		tags: ['React', 'CSS Vars', 'Radix', 'CmdK'],
		github: 'https://github.com/stargazers-stella/cosmic-ui',
	},
];

export default function Landing() {
	return (
		<main className="min-h-screen px-4 pb-16">
			<section className="max-w-5xl mx-auto pt-16 sm:pt-24 flex flex-col gap-10">
				<div className="inline-flex items-center gap-2 w-fit rounded-full surface-muted px-3 py-1 text-sm text-muted-foreground ring-1 ring-border">
					<Badge variant="outline" className="border-primary/40 text-primary">
						<Sparkles className="h-3.5 w-3.5 mr-1" />
						cosmic-ui powered
					</Badge>
					<span className="text-xs text-muted-foreground">naxe.dev · portfolio + playground</span>
				</div>

				<div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
					<Card className="surface border-border shadow-2xl">
						<CardHeader className="flex flex-row items-start gap-4">
							<img
								src="https://github.com/naxecode.png"
								alt="NaxeCode avatar"
								className="h-16 w-16 rounded-full border-2 border-border shadow-lg"
							/>
							<div className="space-y-2">
								<CardTitle className="text-3xl text-foreground">Aladdin · NaxeCode</CardTitle>
								<CardDescription className="text-base text-muted-foreground">
									Shipping thoughtful web products with TypeScript, Next.js, and a little bit of space dust.
									Also tinkering in .NET, finance APIs, and reusable UI.
								</CardDescription>
								<div className="flex flex-wrap gap-2 pt-1">
									<Badge className="bg-primary/20 text-primary border-primary/30">Full-stack</Badge>
									<Badge className="surface-muted text-foreground border-border">Finance APIs</Badge>
									<Badge className="surface-muted text-foreground border-border">AI-assisted UX</Badge>
									<Badge className="surface-muted text-foreground border-border">Design systems</Badge>
								</div>
								<div className="flex flex-wrap gap-3 pt-2">
									<a
										className={buttonVariants({
											className: 'bg-primary text-primary-foreground hover:bg-primary/90',
										})}
										href="mailto:naxecode@proton.me"
									>
										<Mail className="h-4 w-4 mr-2" />
										Let's work together
									</a>
									<a
										className={buttonVariants({
											variant: 'outline',
											className: 'border-border text-foreground hover:surface-muted',
										})}
										href="https://github.com/naxecode"
									>
										<Github className="h-4 w-4 mr-2" />
										GitHub
									</a>
									<a
										className={buttonVariants({
											variant: 'ghost',
											className: 'text-foreground hover:surface-muted',
										})}
										href="https://linkedin.com/in/aladdin-ali01"
									>
										<Linkedin className="h-4 w-4 mr-2" />
										LinkedIn
									</a>
								</div>
							</div>
						</CardHeader>
					</Card>

					<Card className="surface-strong border-border bg-gradient-to-br from-surface via-surface-strong to-primary/10">
						<CardHeader>
							<CardTitle className="text-foreground flex items-center gap-2">
								<Waypoints className="h-5 w-5 text-primary" />
								What I build
							</CardTitle>
							<CardDescription className="text-muted-foreground">
								Fintech dashboards, AI-assisted flows, and reusable UI that travels across products.
							</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-4">
							<div className="flex items-center gap-3 text-muted-foreground">
								<div className="h-9 w-9 rounded-full surface-muted flex items-center justify-center">💳</div>
								<div>
									<p className="font-semibold text-foreground">Plaid + Neon</p>
									<p className="text-sm text-muted-foreground">Secure linking, encrypted tokens, server actions.</p>
								</div>
							</div>
							<div className="flex items-center gap-3 text-muted-foreground">
								<div className="h-9 w-9 rounded-full surface-muted flex items-center justify-center">🤖</div>
								<div>
									<p className="font-semibold text-foreground">AI categorization</p>
									<p className="text-sm text-muted-foreground">OpenAI-powered tagging with validation + backoff.</p>
								</div>
							</div>
							<div className="flex items-center gap-3 text-muted-foreground">
								<div className="h-9 w-9 rounded-full surface-muted flex items-center justify-center">🪐</div>
								<div>
									<p className="font-semibold text-foreground">Design systems</p>
									<p className="text-sm text-muted-foreground">cosmic-ui primitives themed via CSS variables.</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="flex items-center justify-between gap-4 flex-wrap">
					<div>
						<h2 className="text-2xl font-semibold text-foreground">Featured projects</h2>
						<p className="text-muted-foreground">Select builds that show my recent work across web, AI, and UI.</p>
					</div>
					<a
						className={buttonVariants({
							variant: 'secondary',
							className: 'surface-muted text-foreground border border-border',
						})}
						href="https://github.com/naxecode?tab=repositories"
					>
						View GitHub <ArrowRight className="h-4 w-4 ml-2" />
					</a>
				</div>

				<div className="grid gap-6 md:grid-cols-2">
					{projects.map((project) => (
						<Card key={project.title} className="border-border surface hover:border-primary/50 transition">
							<CardHeader className="pb-4">
								<CardTitle className="text-foreground flex items-start justify-between gap-3">
									<span>{project.title}</span>
									<Badge className="bg-primary/20 text-primary border-primary/30">2024–2025</Badge>
								</CardTitle>
								<CardDescription className="text-muted-foreground">{project.summary}</CardDescription>
							</CardHeader>
							<CardContent className="pt-0">
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
									<a
										className={buttonVariants({
											variant: 'outline',
											size: 'sm',
											className: 'border-border text-foreground',
										})}
										href={project.github}
									>
										<Github className="h-4 w-4 mr-2" />
										Code
									</a>
									<Button
										disabled
										size="sm"
										variant="ghost"
										className="text-muted-foreground hover:text-foreground hover:surface-muted"
									>
										<ExternalLink className="h-4 w-4 mr-2" />
										Live coming soon
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				<Card className="border-border surface mt-12 md:mt-16 lg:mt-20 mb-12 md:mb-16 lg:mb-20">
					<CardHeader>
						<CardTitle className="text-foreground">cosmic-ui → shared design DNA</CardTitle>
						<CardDescription className="text-muted-foreground">
							The UI kit I built powers Photon Trail and future builds. Token-driven, Radix under the hood,
							CSS variable theming so it drops into Tailwind projects.
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-wrap gap-3">
						<Badge className="bg-primary/20 text-primary border-primary/30">Buttons</Badge>
						<Badge className="surface-muted text-foreground border-border">Cards</Badge>
						<Badge className="surface-muted text-foreground border-border">Command palette</Badge>
						<Badge className="surface-muted text-foreground border-border">Selects</Badge>
						<Badge className="surface-muted text-foreground border-border">Tables</Badge>
						<a
							className={buttonVariants({
								variant: 'outline',
								className: 'border-border text-foreground mt-1 inline-flex w-fit',
							})}
							href="https://github.com/stargazers-stella/cosmic-ui"
						>
							View library <ArrowRight className="h-4 w-4 ml-2" />
						</a>
					</CardContent>
				</Card>
			</section>
		</main>
	);
}
