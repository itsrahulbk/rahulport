"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react"
import { motion } from "framer-motion"

export default function DiceRoller() {
  const [dice1, setDice1] = useState(1)
  const [dice2, setDice2] = useState(1)
  const [isRolling, setIsRolling] = useState(false)
  const [numDice, setNumDice] = useState(1)
  const [gameMode, setGameMode] = useState(false)
  const [targetNumber, setTargetNumber] = useState(7)
  const [result, setResult] = useState<string | null>(null)

  const diceIcons = [
    <Dice1 key={1} className="h-12 w-12" />,
    <Dice2 key={2} className="h-12 w-12" />,
    <Dice3 key={3} className="h-12 w-12" />,
    <Dice4 key={4} className="h-12 w-12" />,
    <Dice5 key={5} className="h-12 w-12" />,
    <Dice6 key={6} className="h-12 w-12" />,
  ]

  const rollDice = () => {
    setIsRolling(true)
    setResult(null)

    // Play sound effect
    const audio = new Audio("/dice-sound.mp3")
    audio.volume = 0.5
    audio.play().catch((e) => console.log("Audio play failed:", e))

    // Animate dice roll
    let rollCount = 0
    const maxRolls = 10
    const rollInterval = setInterval(() => {
      setDice1(Math.floor(Math.random() * 6) + 1)
      setDice2(Math.floor(Math.random() * 6) + 1)

      rollCount++
      if (rollCount >= maxRolls) {
        clearInterval(rollInterval)
        const finalDice1 = Math.floor(Math.random() * 6) + 1
        const finalDice2 = Math.floor(Math.random() * 6) + 1

        setDice1(finalDice1)
        setDice2(finalDice2)
        setIsRolling(false)

        // Check game result
        if (gameMode) {
          const sum = finalDice1 + (numDice === 2 ? finalDice2 : 0)
          if (sum > targetNumber) {
            setResult("You win! 🎉")
          } else {
            setResult("You lose! 😢")
          }
        }
      }
    }, 100)
  }

  const toggleNumDice = () => {
    setNumDice(numDice === 1 ? 2 : 1)
  }

  const toggleGameMode = () => {
    setGameMode(!gameMode)
    setResult(null)
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
          <h1 className="text-2xl font-bold">Dice Roller</h1>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-center gap-8 mb-8">
            <motion.div
              animate={{
                rotate: isRolling ? [0, 360, 0, 360] : 0,
                scale: isRolling ? [1, 1.2, 1, 1.2, 1] : 1,
              }}
              transition={{ duration: 1 }}
              className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
            >
              {diceIcons[dice1 - 1]}
            </motion.div>

            {numDice === 2 && (
              <motion.div
                animate={{
                  rotate: isRolling ? [0, -360, 0, -360] : 0,
                  scale: isRolling ? [1, 1.2, 1, 1.2, 1] : 1,
                }}
                transition={{ duration: 1 }}
                className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
              >
                {diceIcons[dice2 - 1]}
              </motion.div>
            )}
          </div>

          {numDice === 2 && <div className="text-center mb-4 text-lg font-medium">Sum: {dice1 + dice2}</div>}

          {gameMode && result && (
            <div
              className={`text-center mb-4 text-lg font-bold ${result.includes("win") ? "text-green-500" : "text-red-500"}`}
            >
              {result}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <Button onClick={rollDice} disabled={isRolling} className="w-full">
              {isRolling ? "Rolling..." : "Roll Dice"}
            </Button>

            <Button variant="outline" onClick={toggleNumDice} className="w-full">
              {numDice === 1 ? "Use Two Dice" : "Use One Die"}
            </Button>

            {numDice === 2 && (
              <Button variant={gameMode ? "default" : "outline"} onClick={toggleGameMode} className="w-full">
                {gameMode ? "Game Mode: ON" : "Game Mode: OFF"}
              </Button>
            )}

            {gameMode && (
              <div className="text-center text-sm text-muted-foreground mt-2">
                Roll higher than {targetNumber} to win!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

