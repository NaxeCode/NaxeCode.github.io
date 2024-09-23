'use client';

import { Github, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function LandingPage() {
	const username = 'naxecode';
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-4">
			<div className="text-center">
				<img
					src={`https://github.com/${username}.png`} // Use template literals here
					alt="GitHub Profile Picture"
					width={150}
					height={150}
					className="rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
				/>

				<h1 className="text-4xl font-bold mb-2">{username}</h1>
				<p className="text-xl text-gray-600 mb-6">Web Developer & Designer</p>

				<div className="flex justify-center space-x-4 mb-8">
					<a
						href={`https://github.com/{username}`}
						className="text-gray-600 hover:text-gray-900"
					>
						{/*<Github className="w-6 h-6" /> */}
						<span className="sr-only">GitHub</span>
					</a>
					<a
						href={`https://twitter.com/{username}`}
						className="text-gray-600 hover:text-gray-900"
					>
						{/*<Twitter className="w-6 h-6" /> */}
						<span className="sr-only">Twitter</span>
					</a>
					<a
						href={`https://linkedin.com/in/{username}`}
						className="text-gray-600 hover:text-gray-900"
					>
						{/*<Linkedin className="w-6 h-6" />*/}
						<span className="sr-only">LinkedIn</span>
					</a>
				</div>

				<nav className="space-x-4">
					<a
						href="/projects"
						className="text-blue-600 hover:text-blue-800 font-medium"
					>
						Projects
					</a>
					<a
						href="/about"
						className="text-blue-600 hover:text-blue-800 font-medium"
					>
						About Me
					</a>
					<a
						href="/blog"
						className="text-blue-600 hover:text-blue-800 font-medium"
					>
						Blog
					</a>
				</nav>
			</div>
		</div>
	);
}
