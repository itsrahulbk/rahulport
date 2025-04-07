"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Gamepad2, Dice5, Brain, Layout, Clock } from "lucide-react"
import Link from "next/link"

export default function Projects() {
  const [activeProject, setActiveProject] = useState(0)

  const projects = [
    {
      id: 1,
      title: "Tic Tac Toe Game",
      description: "Classic two-player game using a 3x3 grid.",
      icon: <Gamepad2 className="h-6 w-6" />,
      features: [
        "Player X and O turn-based system",
        "Win/draw detection",
        "Reset button",
        "Clean UI with Tailwind",
        "Play vs CPU with random moves",
      ],
      tech: ["React", "Tailwind CSS", "JavaScript"],
      demoUrl: "/projects/tic-tac-toe",
    },
    {
      id: 2,
      title: "Dice Roller Simulator",
      description: "A virtual dice roller. Click a button, and it rolls one or two dice with animations.",
      icon: <Dice5 className="h-6 w-6" />,
      features: [
        "Random number generation (1-6)",
        "Dice images update on roll",
        "Sound effect on click",
        "Option to roll 1 or 2 dice",
        "Simple dice game like 'Higher Wins'",
      ],
      tech: ["React", "CSS", "JavaScript"],
      demoUrl: "/projects/dice-roller",
    },
    {
      id: 3,
      title: "Quiz App",
      description: "A mini quiz with 5-10 questions on tech, general knowledge, or your favorite topic.",
      icon: <Brain className="h-6 w-6" />,
      features: [
        "Multiple choice questions",
        "Instant feedback after each answer",
        "Final score at the end",
        "Restart quiz button",
        "Timer per question",
      ],
      tech: ["React", "Firebase", "CSS"],
      demoUrl: "/projects/quiz-app",
    },
    {
      id: 4,
      title: "Memory Card Matching Game",
      description: "Flip cards to find matching pairs.",
      icon: <Layout className="h-6 w-6" />,
      features: [
        "Grid of face-down cards",
        "Track flips and matched pairs",
        "Move counter and time taken",
        "Victory screen when all matched",
        "Different difficulty levels",
      ],
      tech: ["React", "Framer Motion", "CSS"],
      demoUrl: "/projects/memory-game",
    },
    {
      id: 5,
      title: "Pomodoro Timer",
      description: "A productivity timer with 25-minute work sessions and 5-minute breaks.",
      icon: <Clock className="h-6 w-6" />,
      features: [
        "Start/stop/reset buttons",
        "Countdown animation",
        "Switch between 'Work' and 'Break' mode",
        "Alarm sound when time's up",
        "Task list + completed session counter",
      ],
      tech: ["React", "JavaScript", "CSS"],
      demoUrl: "/projects/pomodoro-timer",
    },
  ]

  return (
    <section id="projects" className="py-20 bg-muted/50">
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
              My Work
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Projects</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Check out some of my recent web development projects built with React
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Button
                  variant={activeProject === index ? "default" : "ghost"}
                  className={`w-full justify-start gap-2 text-left ${
                    activeProject === index ? "bg-primary text-primary-foreground" : ""
                  }`}
                  onClick={() => setActiveProject(index)}
                >
                  {project.icon}
                  {project.title}
                </Button>
              </motion.div>
            ))}
          </div>

          <motion.div
            key={activeProject}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2"
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  {projects[activeProject].icon}
                  <CardTitle>{projects[activeProject].title}</CardTitle>
                </div>
                <CardDescription>{projects[activeProject].description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Features:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {projects[activeProject].features.map((feature, i) => (
                        <li key={i} className="text-muted-foreground">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {projects[activeProject].tech.map((tech, i) => (
                      <Badge key={i} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button asChild>
                  <Link href={projects[activeProject].demoUrl}>Live Demo</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

