"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Clock, RotateCcw } from "lucide-react"
import { motion } from "framer-motion"

export default function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15)
  const [timerActive, setTimerActive] = useState(true)

  const questions = [
    {
      questionText: "What is React?",
      answerOptions: [
        { answerText: "A JavaScript library for building user interfaces", isCorrect: true },
        { answerText: "A programming language", isCorrect: false },
        { answerText: "A database management system", isCorrect: false },
        { answerText: "An operating system", isCorrect: false },
      ],
    },
    {
      questionText: "Which company developed React?",
      answerOptions: [
        { answerText: "Google", isCorrect: false },
        { answerText: "Facebook", isCorrect: true },
        { answerText: "Microsoft", isCorrect: false },
        { answerText: "Amazon", isCorrect: false },
      ],
    },
    {
      questionText: "What is JSX?",
      answerOptions: [
        { answerText: "A database query language", isCorrect: false },
        { answerText: "A JavaScript extension for writing HTML in React", isCorrect: true },
        { answerText: "A styling framework", isCorrect: false },
        { answerText: "A testing library", isCorrect: false },
      ],
    },
    {
      questionText: "What is the virtual DOM?",
      answerOptions: [
        { answerText: "A physical component in computers", isCorrect: false },
        { answerText: "A browser feature", isCorrect: false },
        { answerText: "A lightweight copy of the actual DOM", isCorrect: true },
        { answerText: "A programming language", isCorrect: false },
      ],
    },
    {
      questionText: "Which hook is used for side effects in React?",
      answerOptions: [
        { answerText: "useState", isCorrect: false },
        { answerText: "useContext", isCorrect: false },
        { answerText: "useReducer", isCorrect: false },
        { answerText: "useEffect", isCorrect: true },
      ],
    },
  ]

  useEffect(() => {
    if (timerActive && !isAnswered && !showScore) {
      if (timeLeft > 0) {
        const timerId = setTimeout(() => {
          setTimeLeft(timeLeft - 1)
        }, 1000)
        return () => clearTimeout(timerId)
      } else {
        handleAnswerClick(null, false)
      }
    }
  }, [timeLeft, timerActive, isAnswered, showScore])

  const handleAnswerClick = (answerIndex: number | null, isCorrect: boolean) => {
    setSelectedAnswer(answerIndex)
    setIsAnswered(true)
    setTimerActive(false)

    if (isCorrect) {
      setScore(score + 1)
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion)
        setSelectedAnswer(null)
        setIsAnswered(false)
        setTimeLeft(15)
        setTimerActive(true)
      } else {
        setShowScore(true)
      }
    }, 1500)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(false)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setTimeLeft(15)
    setTimerActive(true)
  }

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
          <h1 className="text-2xl font-bold">Quiz App</h1>
        </div>

        <Card className="w-full">
          {showScore ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="p-8 text-center"
            >
              <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
              <p className="text-4xl font-bold mb-6">
                {score} / {questions.length}
              </p>
              <p className="mb-6 text-muted-foreground">
                {score === questions.length
                  ? "Perfect score! You're a React expert!"
                  : score >= questions.length / 2
                    ? "Good job! You know React well."
                    : "Keep learning! You'll get better at React."}
              </p>
              <Button onClick={resetQuiz} className="w-full">
                <RotateCcw className="mr-2 h-4 w-4" />
                Restart Quiz
              </Button>
            </motion.div>
          ) : (
            <>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>
                    Question {currentQuestion + 1}/{questions.length}
                  </CardTitle>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span className={`${timeLeft <= 5 ? "text-red-500 font-bold" : ""}`}>{timeLeft}s</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h2 className="text-xl font-medium mb-6">{questions[currentQuestion].questionText}</h2>
                <div className="space-y-3">
                  {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`w-full justify-start text-left h-auto py-3 px-4 ${
                        isAnswered && selectedAnswer === index && answerOption.isCorrect
                          ? "bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-500"
                          : isAnswered && selectedAnswer === index
                            ? "bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-500"
                            : isAnswered && answerOption.isCorrect
                              ? "bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-500"
                              : ""
                      }`}
                      disabled={isAnswered}
                      onClick={() => handleAnswerClick(index, answerOption.isCorrect)}
                    >
                      {answerOption.answerText}
                    </Button>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-300"
                    style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
                  ></div>
                </div>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}

