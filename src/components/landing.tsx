import { BiLogoGithub } from 'react-icons/bi';
import { FaBeer } from 'react-icons/fa';
import { GiPoliceBadge } from 'react-icons/gi';

import { Linkedin, X } from 'lucide-react';

export default function Landing() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-4">
			<GiPoliceBadge />
			<div className="text-center p-7 border-solid border-4 rounded-xl border-white bg-background shadow-lg">
				<img
					src={`https://github.com/naxecode.png`}
					alt="GitHub Profile Picture"
					width="150"
					height="150"
					className="rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
				/>
				<h1 className="text-4xl font-bold mb-2">NaxeCode</h1>
				<p className="text-xl text-gray-600 mb-6">Web Developer & Designer</p>

				<div className="flex justify-center space-x-4 mb-8">
					<a
						href={`https://github.com/naxecode`}
						className="text-gray-600 hover:text-gray-900 transition-colors"
					>
						<div className="w-6 h-6"></div>

						<span className="sr-only">GitHub</span>
					</a>
					<a
						href={`https://twitter.com/naxecode`}
						className="text-gray-600 hover:text-gray-900 transition-colors"
					>
						<span className="sr-only">Twitter</span>
					</a>
					<a
						href={`https://linkedin.com/in/aladdin-ali01`}
						className="text-gray-600 hover:text-gray-900 transition-colors"
					>
						<span className="sr-only">LinkedIn</span>
					</a>
				</div>

				<nav className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
					<a
						href="/projects"
						className="w-40 py-2 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-all duration-300 ease-in-out transform hover:scale-105"
					>
						Projects
					</a>
					<a
						href="/about"
						className="w-40 py-2 px-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-all duration-300 ease-in-out transform hover:scale-105"
					>
						About Me
					</a>
					<a
						href="/blog"
						className="w-40 py-2 px-4 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold rounded-lg shadow-md hover:from-pink-600 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-75 transition-all duration-300 ease-in-out transform hover:scale-105"
					>
						Blog
					</a>
				</nav>
			</div>
		</div>
	);
}
