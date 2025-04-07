"use client"

import { useEffect } from "react"
import Hero from "@/components/hero"
import Projects from "@/components/projects"
import About from "@/components/about"
import Skills from "@/components/skills"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { useTheme } from "next-themes"

export default function Home() {
  // Force theme to be applied immediately on page load
  const { setTheme } = useTheme()

  useEffect(() => {
    // Check if there's a saved theme preference in localStorage
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [setTheme])

  return (
    <main className="min-h-screen">
      <Hero />
      <Projects />
      <About />
      <Skills />
      <Contact />
      <Footer />
    </main>
  )
}

