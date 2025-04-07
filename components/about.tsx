"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <div className="space-y-2">
            <Badge variant="outline" className="px-3 py-1 text-sm">
              About Me
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Who I Am</h2>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-lg overflow-hidden"
          >
            <Image src="/images/rahul-profile.png" alt="Rahul Babu" fill className="object-contain" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold">My Journey</h3>
            <p className="text-muted-foreground">
              I'm currently pursuing my B.Tech at VIT University Chennai. I'm deeply interested in the intersection of
              technology, business, and design. Whether it's building a startup project, designing a clean UI, or
              leading a student initiative—I love solving problems that matter.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="space-y-2">
                <h4 className="font-medium">Education</h4>
                <p className="text-sm text-muted-foreground">B.Tech, VIT University Chennai</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Location</h4>
                <p className="text-sm text-muted-foreground">Chennai, India</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Interests</h4>
                <p className="text-sm text-muted-foreground">Web Development, Entrepreneurship, UI/UX Design</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Year</h4>
                <p className="text-sm text-muted-foreground">Second Year</p>
              </div>
            </div>

            <div className="pt-4">
              <h4 className="font-medium mb-2">What I Do</h4>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Build responsive web applications with React</li>
                <li>Design intuitive user interfaces</li>
                <li>Develop business solutions through technology</li>
                <li>Collaborate with cross-functional teams</li>
                <li>Continuously learn new technologies and frameworks</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

