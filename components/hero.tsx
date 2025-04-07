"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

export default function Hero() {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Function to handle smooth scrolling to any section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center space-y-4"
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Rahul Babu</h1>
              <p className="text-primary font-medium md:text-xl">
                React Developer | Business Enthusiast | Student at VIT Chennai
              </p>
              <p className="max-w-[600px] text-muted-foreground md:text-xl mt-4">
                Hi! I'm Rahul, a second-year student at VIT University Chennai with a passion for web development,
                entrepreneurship, and building impactful digital products. I'm constantly learning and creating tools
                that solve real-world problems.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("contact")}
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Get in Touch
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("projects")}
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                View Projects
              </motion.button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto lg:ml-auto relative"
          >
            <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] overflow-hidden rounded-full border-4 border-primary/20 shadow-xl">
              <Image
                src="@/public/images/rahul-profile.png"
                alt="Rahul Babu"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={() => scrollToSection("projects")}
        >
          <ArrowDown className="h-8 w-8 animate-bounce" />
        </motion.div>
      </div>
    </section>
  )
}

