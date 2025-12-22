"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Menu, X, FolderGit, User, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const stars = useMemo(
    () => [
      { x: 12, y: 8, d: 6, delay: 0 },
      { x: 28, y: 18, d: 5, delay: 0.25 },
      { x: 46, y: 10, d: 5, delay: 0.15 },
      { x: 62, y: 22, d: 6, delay: 0.4 },
      { x: 78, y: 14, d: 5, delay: 0.3 },
      { x: 92, y: 6, d: 7, delay: 0.5 },
    ],
    []
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/60 backdrop-blur-xl shadow-lg shadow-primary/5">
      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="pointer-events-none absolute inset-0 overflow-hidden z-0 mix-blend-screen"
          initial={{ x: 0 }}
          animate={{ x: [0, 6, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative h-full w-full">
            {stars.map((star, idx) => (
              <motion.span
                key={idx}
                className="absolute rounded-full bg-primary/60"
                style={{
                  width: star.d,
                  height: star.d,
                  top: star.y,
                  left: `${star.x}%`,
                  boxShadow: "0 0 10px rgba(139, 92, 246, 0.35)",
                  opacity: 0.28,
                }}
                initial={{ opacity: 0.2, scale: 0.9, y: 0, x: 0 }}
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  scale: [0.9, 1.05, 0.9],
                  y: [0, -4, 0],
                  x: [0, 2, 0],
                }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: star.delay,
                }}
              />
            ))}
          </div>
        </motion.div>
        <div className="relative z-10 flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-xl font-bold text-foreground flex items-center gap-2 transition-colors hover:text-primary"
            >
              <span className="text-2xl">✦</span>
              NaxeCode
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2">
            <Link
              href="/projects"
              className="px-4 py-2 rounded-lg text-foreground hover:text-primary hover:bg-surface-muted transition-all duration-200 inline-flex items-center gap-2"
            >
              <FolderGit className="h-4 w-4" />
              <span>Projects</span>
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 rounded-lg text-foreground hover:text-primary hover:bg-surface-muted transition-all duration-200 inline-flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              <span>About</span>
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-lg text-foreground hover:text-primary hover:bg-surface-muted transition-all duration-200 inline-flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              <span>Contact</span>
            </Link>
          </div>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-foreground hover:text-primary hover:bg-surface-muted transition-all duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden pb-4 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: {
                  height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                  opacity: { duration: 0.2, delay: 0.05 }
                }
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: { duration: 0.2, ease: [0.4, 0, 1, 1] },
                  opacity: { duration: 0.15 }
                }
              }}
            >
              <motion.div
                className="flex flex-col space-y-2"
                initial={{ y: -8, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.2,
                    ease: [0.4, 0, 0.2, 1]
                  }
                }}
              >
                <Link
                  href="/projects"
                  className="pl-1 pr-4 py-2 text-foreground hover:text-primary hover:bg-surface-muted rounded-lg transition-all duration-200 inline-flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <FolderGit className="h-4 w-4" />
                  <span>&nbsp;Projects</span>
                </Link>
                <Link
                  href="/about"
                  className="pl-1 pr-4 py-2 text-foreground hover:text-primary hover:bg-surface-muted rounded-lg transition-all duration-200 inline-flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-4 w-4" />
                  <span>&nbsp;About</span>
                </Link>
                <Link
                  href="/contact"
                  className="pl-1 pr-4 py-2 text-foreground hover:text-primary hover:bg-surface-muted rounded-lg transition-all duration-200 inline-flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Phone className="h-4 w-4" />
                  <span>&nbsp;Contact</span>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
