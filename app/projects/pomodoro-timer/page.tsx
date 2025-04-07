"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Play, Pause, RotateCcw, Check, Plus, X } from "lucide-react"
import { motion } from "framer-motion"

type Task = {
  id: number
  text: string
  completed: boolean
}

export default function PomodoroTimer() {
  const [mode, setMode] = useState<"work" | "break">("work")
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false)
  const [sessions, setSessions] = useState(0)
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio("/alarm.mp3")
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (isActive && timeLeft === 0) {
      if (audioRef.current) {
        audioRef.current.play().catch((e) => console.log("Audio play failed:", e))
      }

      if (mode === "work") {
        setSessions(sessions + 1)
        setMode("break")
        setTimeLeft(5 * 60) // 5 minute break
      } else {
        setMode("work")
        setTimeLeft(25 * 60) // Back to work
      }
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, mode, sessions])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setMode("work")
    setTimeLeft(25 * 60)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
      setNewTask("")
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const progressPercentage =
    mode === "work" ? ((25 * 60 - timeLeft) / (25 * 60)) * 100 : ((5 * 60 - timeLeft) / (5 * 60)) * 100

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/#projects">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Pomodoro Timer</h1>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{mode === "work" ? "Work Time" : "Break Time"}</CardTitle>
              <div className="text-sm text-muted-foreground">Sessions: {sessions}</div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative w-48 h-48 mb-6">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-gray-200 dark:text-gray-700 stroke-current"
                  strokeWidth="4"
                  cx="50"
                  cy="50"
                  r="46"
                  fill="transparent"
                />
                <circle
                  className={`${mode === "work" ? "text-primary" : "text-green-500"} stroke-current`}
                  strokeWidth="4"
                  strokeLinecap="round"
                  cx="50"
                  cy="50"
                  r="46"
                  fill="transparent"
                  strokeDasharray="289.03"
                  strokeDashoffset={289.03 - (289.03 * progressPercentage) / 100}
                  transform="rotate(-90 50 50)"
                />
                <text
                  x="50"
                  y="50"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-3xl font-bold"
                  fill="currentColor"
                >
                  {formatTime(timeLeft)}
                </text>
              </svg>
            </div>

            <div className="flex gap-3">
              <Button onClick={toggleTimer}>
                {isActive ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                {isActive ? "Pause" : "Start"}
              </Button>
              <Button variant="outline" onClick={resetTimer}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full flex justify-center gap-4">
              <Button
                variant={mode === "work" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setMode("work")
                  setTimeLeft(25 * 60)
                  setIsActive(false)
                }}
                className="flex-1"
              >
                Work
              </Button>
              <Button
                variant={mode === "break" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setMode("break")
                  setTimeLeft(5 * 60)
                  setIsActive(false)
                }}
                className="flex-1"
              >
                Break
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={addTask} className="flex gap-2 mb-4">
              <Input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a task..."
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </form>

            <div className="space-y-2">
              {tasks.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No tasks yet. Add one to get started!</p>
              ) : (
                tasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-6 w-6 rounded-full ${
                          task.completed ? "bg-green-500 text-white hover:bg-green-600" : "bg-muted"
                        }`}
                        onClick={() => toggleTask(task.id)}
                      >
                        {task.completed && <Check className="h-3 w-3" />}
                      </Button>
                      <span className={task.completed ? "line-through text-muted-foreground" : ""}>{task.text}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-muted-foreground hover:text-destructive"
                      onClick={() => deleteTask(task.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </motion.div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

