"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Palette, GitBranch, Database, Flame, Layers } from "lucide-react"

export default function Skills() {
  const skills = [
    {
      category: "Frontend",
      icon: <Code className="h-6 w-6" />,
      items: ["React.js", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS"],
    },
    {
      category: "UI/UX",
      icon: <Palette className="h-6 w-6" />,
      items: ["Responsive Design", "UI/UX Prototyping", "Framer Motion", "Animation"],
    },
    {
      category: "Version Control",
      icon: <GitBranch className="h-6 w-6" />,
      items: ["Git", "GitHub", "Collaborative Development"],
    },
    {
      category: "Backend & Database",
      icon: <Database className="h-6 w-6" />,
      items: ["Firebase", "RESTful APIs", "Basic Node.js"],
    },
    {
      category: "Tools",
      icon: <Flame className="h-6 w-6" />,
      items: ["VS Code", "npm/yarn", "Chrome DevTools", "Figma"],
    },
    {
      category: "Soft Skills",
      icon: <Layers className="h-6 w-6" />,
      items: ["Problem Solving", "Team Collaboration", "Project Management", "Communication"],
    },
  ]

  return (
    <section id="skills" className="py-20 bg-muted/50">
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
              My Expertise
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Skills & Technologies</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              The tools and technologies I use to bring ideas to life
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">{skill.icon}</div>
                    <h3 className="text-xl font-bold">{skill.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <Badge key={item} variant="secondary" className="px-3 py-1">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground">
            Always learning and expanding my skillset with new technologies and frameworks.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

