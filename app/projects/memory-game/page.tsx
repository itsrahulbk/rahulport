"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, RotateCcw } from "lucide-react"
import { motion } from "framer-motion"

// Card types
type CardType = {
  id: number
  emoji: string
  flipped: boolean
  matched: boolean
}

export default function MemoryGame() {
  const [cards, setCards] = useState<CardType[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [endTime, setEndTime] = useState<Date | null>(null)
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy")

  // Emojis for cards
  const emojis = {
    easy: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊"],
    medium: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"],
    hard: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮"],
  }

  // Initialize game
  useEffect(() => {
    initializeGame()
  }, [difficulty])

  const initializeGame = () => {
    const selectedEmojis = emojis[difficulty]

    // Create pairs of cards
    let initialCards: CardType[] = []
    selectedEmojis.forEach((emoji, index) => {
      initialCards.push({ id: index * 2, emoji, flipped: false, matched: false })
      initialCards.push({ id: index * 2 + 1, emoji, flipped: false, matched: false })
    })

    // Shuffle cards
    initialCards = shuffleArray(initialCards)

    setCards(initialCards)
    setFlippedCards([])
    setMoves(0)
    setGameOver(false)
    setStartTime(null)
    setEndTime(null)
  }

  // Shuffle array (Fisher-Yates algorithm)
  const shuffleArray = (array: CardType[]) => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  // Handle card click
  const handleCardClick = (id: number) => {
    // Start timer on first move
    if (!startTime) {
      setStartTime(new Date())
    }

    // Don't allow more than 2 cards flipped at once
    if (flippedCards.length === 2) return

    // Don't allow clicking on already matched or flipped cards
    const clickedCard = cards.find((card) => card.id === id)
    if (!clickedCard || clickedCard.matched || flippedCards.includes(id)) return

    // Flip the card
    const newFlippedCards = [...flippedCards, id]
    setFlippedCards(newFlippedCards)

    // If two cards are flipped, check for a match
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1)

      const [firstId, secondId] = newFlippedCards
      const firstCard = cards.find((card) => card.id === firstId)
      const secondCard = cards.find((card) => card.id === secondId)

      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        // Match found
        const newCards = cards.map((card) =>
          card.id === firstId || card.id === secondId ? { ...card, matched: true } : card,
        )
        setCards(newCards)
        setFlippedCards([])

        // Check if game is over
        const allMatched = newCards.every((card) => card.matched)
        if (allMatched) {
          setGameOver(true)
          setEndTime(new Date())
        }
      } else {
        // No match, flip cards back after a delay
        setTimeout(() => {
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  // Calculate time taken
  const getTimeTaken = () => {
    if (!startTime || !endTime) return "0"
    const seconds = Math.floor((endTime.getTime() - startTime.getTime()) / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  // Change difficulty
  const changeDifficulty = (newDifficulty: "easy" | "medium" | "hard") => {
    setDifficulty(newDifficulty)
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
          <h1 className="text-2xl font-bold">Memory Game</h1>
        </div>

        {gameOver ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
            <p className="text-lg mb-2">You completed the game in:</p>
            <p className="text-3xl font-bold mb-4">{getTimeTaken()}</p>
            <p className="text-lg mb-6">Total moves: {moves}</p>
            <Button onClick={initializeGame} className="w-full">
              <RotateCcw className="mr-2 h-4 w-4" />
              Play Again
            </Button>
          </motion.div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Moves: {moves}</span>
              </div>
              <Button variant="outline" size="sm" onClick={initializeGame}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>

            <div className="mb-4 flex gap-2">
              <Button
                variant={difficulty === "easy" ? "default" : "outline"}
                size="sm"
                onClick={() => changeDifficulty("easy")}
                className="flex-1"
              >
                Easy
              </Button>
              <Button
                variant={difficulty === "medium" ? "default" : "outline"}
                size="sm"
                onClick={() => changeDifficulty("medium")}
                className="flex-1"
              >
                Medium
              </Button>
              <Button
                variant={difficulty === "hard" ? "default" : "outline"}
                size="sm"
                onClick={() => changeDifficulty("hard")}
                className="flex-1"
              >
                Hard
              </Button>
            </div>

            <div
              className={`grid gap-2 ${
                difficulty === "easy"
                  ? "grid-cols-3"
                  : difficulty === "medium"
                    ? "grid-cols-4"
                    : "grid-cols-4 sm:grid-cols-6"
              }`}
            >
              {cards.map((card) => (
                <motion.div
                  key={card.id}
                  className={`aspect-square cursor-pointer rounded-lg ${
                    card.matched
                      ? "bg-green-100 dark:bg-green-900/30"
                      : flippedCards.includes(card.id)
                        ? "bg-blue-100 dark:bg-blue-900/30"
                        : "bg-gray-200 dark:bg-gray-700"
                  }`}
                  onClick={() => handleCardClick(card.id)}
                  animate={{ rotateY: flippedCards.includes(card.id) || card.matched ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full h-full flex items-center justify-center text-2xl">
                    {flippedCards.includes(card.id) || card.matched ? card.emoji : ""}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

