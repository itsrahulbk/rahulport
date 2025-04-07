"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Update the navLinks array to use proper anchor links without the leading slash
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ]

  // Update the Link components to use smooth scrolling
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md dark:bg-gray-900/80 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/#home" className="text-xl font-bold tracking-tighter transition-colors hover:text-primary">
          RB
        </Link>

        {/* Mobile menu button */}
        <button className="block md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.name}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 shadow-md md:hidden">
            <nav className="flex flex-col items-center py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="w-full py-3 text-center text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="py-3">
                <ThemeToggle />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

