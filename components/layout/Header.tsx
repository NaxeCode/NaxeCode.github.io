"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/60 backdrop-blur-xl shadow-lg shadow-primary/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-foreground flex items-center gap-2 transition-colors hover:text-primary">
              <span className="text-2xl">✦</span>
              NaxeCode
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2">
            <Link
              href="/projects"
              className="px-4 py-2 rounded-lg text-foreground hover:text-primary hover:bg-surface-muted transition-all duration-200"
            >
              Projects
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 rounded-lg text-foreground hover:text-primary hover:bg-surface-muted transition-all duration-200"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-lg text-foreground hover:text-primary hover:bg-surface-muted transition-all duration-200"
            >
              Contact
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
                  className="px-4 py-2 text-foreground hover:text-primary hover:bg-surface-muted rounded-lg transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Projects
                </Link>
                <Link
                  href="/about"
                  className="px-4 py-2 text-foreground hover:text-primary hover:bg-surface-muted rounded-lg transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="px-4 py-2 text-foreground hover:text-primary hover:bg-surface-muted rounded-lg transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
