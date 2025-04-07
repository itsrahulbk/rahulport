"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Linkedin, Send, CheckCircle, Github } from "lucide-react"

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <section id="contact" className="py-20">
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
              Get In Touch
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Let's Connect</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">Let's build something together!</p>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a
                        href="mailto:rahulbabuk05@gmail.com"
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        rahulbabuk@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <Linkedin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <a
                        href="https://linkedin.com/in/rahulbabuk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        linkedin.com/in/rahulbabuk
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <Github className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">GitHub</p>
                      <a
                        href="https://github.com/itsrahulbk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        github.com/itsrahulbk
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-medium mb-2">Available For</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Freelance Projects</Badge>
                    <Badge variant="outline">Internships</Badge>
                    <Badge variant="outline">Collaborations</Badge>
                    <Badge variant="outline">Startup Ideas</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSubmitted ? (
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg flex items-center gap-3 text-green-600 dark:text-green-400">
                  <CheckCircle className="h-5 w-5" />
                  <p>Thank you for your message! I'll get back to you soon.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your message"
                      required
                      className="min-h-[150px]"
                      value={formState.message}
                      onChange={handleChange}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="mr-2">Sending</span>
                        <span className="animate-spin">
                          <Send className="h-4 w-4" />
                        </span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

